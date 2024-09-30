<template>
    <div class="fullDiv">
        <TopBar />
        <ProgressBar />

        <!-- 글 -->
        <div style="margin-top: 8em; display: flex; flex-direction: column; align-items: center">
            <div style="font-size: 3em">반려견의 이름을</div>
            <div style="font-size: 3em">알려주세요</div>

            <!-- 이름적는 input  -->
            <div
                style="
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-top: 3em;
                    border-radius: 40px;
                    border: 1px solid lightgray;
                    height: 50px;
                    width: 70%;
                "
            >
                <input
                    type="text"
                    style="
                        border-width: 0;
                        height: 40px;
                        width: 30%;
                        text-align: center;
                        outline: none;
                        font-size: 1.5em;
                    "
                />
            </div>

            <NextButton />
        </div>
    </div>
</template>

<script>
import TopBar from './TopBar.vue';
import ProgressBar from './ProgressBar.vue';
import NextButton from './NextButton.vue';

export default {
    name: 'setProfilePage1',
    components: {
        TopBar,
        ProgressBar,
        NextButton,
    },
    data() {
        return {};
    },
    methods: {
        goToBeforeLogin() {
            this.$router.push('/');
        },
    },
};
</script>

<style>
@import '~bootstrap/dist/css/bootstrap.min.css';

html,
body {
    height: 100%;
}
.container {
    height: 100%;
}
.fullDiv {
    height: inherit;
}
.njsCustom {
    width: auto;
    margin-bottom: 20px;
}
</style>
