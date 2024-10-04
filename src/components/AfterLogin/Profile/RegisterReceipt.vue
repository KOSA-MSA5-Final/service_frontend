<template>
    <div id="main-content">
        <div class="setting-topbar">
            <!-- 상단 바 -->
            <div class="top-bar">
                <!-- 왼쪽에 뒤로가기 버튼 -->
                <button class="back-button" @click="goBack">
                    <svg
                        width="30px"
                        height="30px"
                        fill="#000000"
                        viewBox="0 0 200 200"
                        data-name="Layer 1"
                        id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <title></title>
                            <path
                                d="M160,89.75H56l53-53a9.67,9.67,0,0,0,0-14,9.67,9.67,0,0,0-14,0l-56,56a30.18,30.18,0,0,0-8.5,18.5c0,1-.5,1.5-.5,2.5a6.34,6.34,0,0,0,.5,3,31.47,31.47,0,0,0,8.5,18.5l56,56a9.9,9.9,0,0,0,14-14l-52.5-53.5H160a10,10,0,0,0,0-20Z"
                            ></path>
                        </g>
                    </svg>
                </button>
                <!-- 가운데에 '병원 영수증 추가' 텍스트 -->
                <div class="title">병원 영수증 추가</div>
            </div>
        </div>

        <div id="photo-upload-camera" v-if="uploadStep">
            <div id="upload-receipt-title">영수증 업로드</div>
            <input type="file" accept="image/*" @change="onFileChange" style="background-color: white" />

            <div v-if="isCameraActive">
                <video ref="video" autoplay playsinline></video>
                <button class="button" @click="capturePhoto">사진 촬영</button>
            </div>

            <button class="button" @click="toggleCamera">
                {{ isCameraActive ? '카메라 끄기' : '카메라 켜기' }}
            </button>

            <!-- <canvas v-if="photo" ref="canvas"></canvas>
            <img v-if="photo" :src="photo" alt="Captured Photo" class="ocr-image" /> -->
            <div class="image-preview-container">
                <div class="image-preview">
                    <img v-if="photo" :src="photo" alt="Captured Photo" class="preview-image" />
                </div>
            </div>
            <div id="submit-receipt-btn">
                <button class="button" @click="submitReceipt">영수증 접수</button>
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
            <button class="button" @click="resetForm">새 영수증 등록</button>
        </div>
    </div>
</template>

<script>
import { useFileUploadStore } from '@/post_datas/receiptOCR';

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
        goBack() {
            this.$router.go(-1);
        },
        toggleCamera() {
            if (this.isCameraActive) {
                this.stopCamera();
            } else {
                this.startCamera();
            }
        },
        startCamera() {
            navigator.mediaDevices
                .getUserMedia({ video: true })
                .then((stream) => {
                    this.mediaStream = stream;
                    this.$refs.video.srcObject = stream;
                    this.isCameraActive = true;
                })
                .catch((err) => {
                    console.error('Error accessing camera: ', err);
                });
        },
        stopCamera() {
            this.mediaStream.getTracks().forEach((track) => track.stop());
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
                this.file = new File([blob], 'camera_capture.png', { type: 'image/png' });
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
        },
    },
    beforeUnmount() {
        if (this.isCameraActive) {
            this.stopCamera();
        }
    },
};
</script>

<style scoped>
#main-content {
    width: 100%;
    height: 100%;
    background-color: #f9f9f9;
}

#upload-receipt-title {
    font-size: 24px;
    font-weight: bold;
    margin-top: 10px;
    margin-bottom: 20px;
}

#photo-upload-camera {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #cee2f5;
    padding: 10px 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.setting-topbar {
    display: flex;
    flex-direction: column;
    align-items: center;
}

/* 상단 바 스타일 */
.top-bar {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background-color: white;
    padding: 15px 10px;
    font-size: 18px;
    font-weight: bold;
    border-bottom: 1px solid #ddd;
}

/* 뒤로가기 버튼 스타일 */
.back-button {
    position: absolute;
    left: 10px;
    background: none;
    border: none;
    cursor: pointer;
}

/* 검색 제목 스타일 */
.title {
    font-size: 20px;
}

input[type='file'] {
    padding: 20px 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
}

.camera-container {
    position: relative;
    width: 100%;
    max-width: 400px;
    margin-bottom: 20px;
}

video {
    width: 100%;
    border-radius: 10px;
    border: 1px solid #ddd;
}

.image-preview-container {
    display: flex; /* 부모 컨테이너를 flex로 설정 */
    justify-content: center; /* 가로 가운데 정렬 */
    align-items: center; /* 세로 가운데 정렬 */
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: white;
}

/* 이미지 미리보기 영역 스타일 */
.image-preview {
    width: 98%;
    height: 540px;
    border: 2px dashed #ddd; /* 이미지 업로드 전 영역 표시를 위해 점선 추가 */
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 10px;
    background-color: #f7f7f7;
    border-radius: 10px;
}

.image-preview img {
    max-width: 100%;
    max-height: 100%;
    border-radius: 10px;
}

.button {
    padding: 12px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin: 10px 0;
}

.action-btn {
    background-color: #4caf50;
    color: white;
}

.action-btn:hover {
    background-color: #45a049;
}

.toggle-btn {
    background-color: #008cba;
    color: white;
}

.toggle-btn:hover {
    background-color: #007bb5;
}

.submit-btn {
    background-color: #f44336;
    color: white;
}

.submit-btn:hover {
    background-color: #e53935;
}

.reset-btn {
    background-color: #ff9800;
    color: white;
}

.reset-btn:hover {
    background-color: #fb8c00;
}

#show-ocr-gpt-result {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 600px;
}

#hospital-infos p {
    margin: 5px 0;
}

#medical-list ul {
    list-style: none;
    padding: 0;
}

#medical-list ul li {
    background: #f1f1f1;
    padding: 10px;
    margin-bottom: 5px;
    border-radius: 5px;
}
</style>
