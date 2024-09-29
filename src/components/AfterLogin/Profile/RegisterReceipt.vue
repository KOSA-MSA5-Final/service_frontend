<template>
    <div id="photo-upload-camera">
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
                console.error('No file selected');
                return;
            }

            const formData = new FormData();
            formData.append('qimage', this.file); // Match the key to your backend's @RequestParam

            try {
                const response = await fileUploadStore.uploadFile(formData);
                console.log(response);
            } catch (error) {
                console.error('Error submitting receipt:', error);
            }
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
</style>