<template>
    <div id="main-content">
        <div id="photo-upload-camera" v-if="uploadStep">
            <div id="upload-receipt-title">영수증 업로드</div>
            <input type="file" accept="image/*" @change="onFileChange" />
            
            <div v-if="isCameraActive">
                <video ref="video" autoplay playsinline></video>
                <button @click="capturePhoto">사진 촬영</button>
            </div>
            
            <button @click="toggleCamera">
                {{ isCameraActive ? '카메라 끄기' : '카메라 켜기' }}
            </button>
    
            <canvas v-if="photo" ref="canvas"></canvas>
            <img v-if="photo" :src="photo" alt="Captured Photo" />
            
            <div id="submit-receipt-btn">
                <button @click="submitReceipt">영수증 접수</button>
            </div>
        </div>
        <div id="show-ocr-gpt-result" v-if="showStep">
            <div v-if="result">
                <div id="hospital-infos">
                    <p><strong>병원 이름:</strong> {{ result.hospital_name }}</p>
                    <p><strong>주소:</strong> {{ result.hospital_address }}</p>
                    <p><strong>전화번호:</strong> {{ result.hospital_phoneNum }}</p>
                    <p><strong>방문 날짜:</strong> {{ result.visitDate }}</p>
                    <p><strong>총 비용:</strong> {{ formatCurrency(result.totalCost) }}</p>
                </div>
                <div id="medical-list">
                    <h3>진료 내역:</h3>
                    <ul>
                        <li v-for="(medicalDTO, index) in result.medicalDTOs" :key="index">
                            {{ medicalDTO.medical_name }}: {{ formatCurrency(medicalDTO.medical_price) }}
                        </li>
                    </ul>
                </div>
            </div>
            <div v-else>
                <p>결과를 불러오는 중에 문제가 발생했습니다. 다시 시도해 주세요.</p>
            </div>
            <button @click="resetForm">새 영수증 등록</button>
        </div>
    </div>
</template>

<script>
import { useFileUploadStore  } from '@/post_datas/receiptOCR';

export default {
    name: 'RegisterReceiptPage',
    data() {
        return {
            isCameraActive: false,
            photo: null,
            mediaStream: null,
            file: null,
            uploadStep: true,
            showStep: false,
            result: null,
            isLoading: false,
            error: null,
        };
    },
    methods: {
        toggleCamera() {
            if (this.isCameraActive) {
                this.stopCamera();
            } else {
                this.startCamera();
            }
        },
        startCamera() {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then((stream) => {
                    this.mediaStream = stream;
                    this.$refs.video.srcObject = stream;
                    this.isCameraActive = true;
                })
                .catch((err) => {
                    console.error("Error accessing camera: ", err);
                });
        },
        stopCamera() {
            this.mediaStream.getTracks().forEach(track => track.stop());
            this.isCameraActive = false;
        },
        onFileChange(event) {
            this.file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                this.photo = e.target.result;
            };
            reader.readAsDataURL(this.file);
        },
        capturePhoto() {
            const canvas = this.$refs.canvas;
            const video = this.$refs.video;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext('2d');
            context.drawImage(video, 0, 0);
            this.photo = canvas.toDataURL('image/png');
            canvas.toBlob((blob) => {
                this.file = new File([blob], "camera_capture.png", { type: "image/png" });
            }, 'image/png');
        },
        async submitReceipt() {
            const fileUploadStore = useFileUploadStore();
            
            if (!this.file) {
                this.error = '파일을 선택해주세요.';
                return;
            }

            const formData = new FormData();
            formData.append('qimage', this.file);

            this.isLoading = true;
            this.error = null;

            try {
                const response = await fileUploadStore.uploadFile(formData);
                this.result = response;
                this.uploadStep = false;
                this.showStep = true;
            } catch (error) {
                console.error('Error submitting receipt:', error);
                this.error = '영수증 제출 중 오류가 발생했습니다. 다시 시도해 주세요.';
            } finally {
                this.isLoading = false;
            }
        },

        formatCurrency(value) {
            return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(value);
        },

        resetForm() {
            this.uploadStep = true;
            this.showStep = false;
            this.result = null;
            this.file = null;
            this.photo = null;
            this.error = null;
        }
    },
    beforeUnmount() {
        if (this.isCameraActive) {
            this.stopCamera();
        }
    },
};
</script>

<style scoped>
#photo-upload-camera {
    display: flex;
    flex-direction: column;
    align-items: center;
}
video {
    width: 100%;
    max-width: 400px;
}
canvas {
    display: none;
}
img {
    margin-top: 20px;
    max-width: 100%;
}
#show-ocr-gpt-result {
    margin-top: 20px;
}
#hospital-infos, #medical-list {
    margin-bottom: 20px;
}
ul {
    list-style-type: none;
    padding-left: 0;
}
</style>