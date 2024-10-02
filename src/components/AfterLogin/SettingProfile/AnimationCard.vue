<template>
    <div>
        <div
            ref="toggleHeader"
            @click="toggleContent"
            style="
                margin-top: 10px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px;
                border-bottom: 1px solid lightgray;
                border-top: 1px solid lightgray;
                background-color: lightgray;
            "
        >
            <span>&nbsp;등록</span>
            <span :class="{ 'toggle-arrow': true, open: isOpen }">▼</span>
        </div>
        <div v-if="isOpen" class="content">
            <p style="text-align: left; margin-bottom: 5px !important">&nbsp;이름</p>
            <input
                type="text"
                style="outline: none; border: none; border-bottom: 1px solid gray"
                placeholder="&nbsp;반려동물의 이름을 알려주세요"
            />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isOpen: true,
        };
    },
    methods: {
        toggleContent() {
            this.isOpen = !this.isOpen;

            // 콘텐츠를 접으면 스크롤 원래 위치로 이동
            if (!this.isOpen) {
                this.$refs.toggleHeader.scrollIntoView({ behavior: 'smooth' });
            }
        },
    },
};
</script>

<style scoped>
.content {
    background-color: white;
    padding: 10px;
    display: flex;
    justify-content: left;
    flex-direction: column;
}

.toggle-arrow {
    transition: transform 0.3s ease;
}

.open {
    transform: rotate(180deg);
}
</style>
