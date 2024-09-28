<template>
    <TopBar />

    <VueSlider v-model="value5" :min="0" :max="8" marks adsorb />

    <!-- 컨텐츠 -->
    <div style="margin-top:10em;display:flex; flex-direction: column; align-items: center;">
        <div style="font-size:3em">
            장구니의 생일은? 
        </div>
        <div style="font-size:1em">
            나이에 맞는 정보가 제공돼요
        </div>

        <!-- 이름적는 input  -->
        <div style="display:flex;align-items: center; justify-content: center; margin-top:3em; border-radius: 40px; border:1px solid lightgray;height:50px;width:70%">
            <input type="date" style="border-width:0;height:40px;text-align:center;outline: none;font-size:1.5em">
        </div>
    </div>
    
    <div style="color: lightgray;">
        • 생일은 언제든 수정 가능해요
    </div>
    <div style="color: lightgray;">
        • 생일을 모른다면 대략적인 날짜를 선택해주세요
    </div>
    <!-- 컨텐츠 끝 -->

    <div class="button-container">
        <PrevNextButton />
    </div>
</template>

<script>
import PrevNextButton from './PrevNextButton.vue';
import TopBar from './TopBar.vue'
import VueSlider from 'vue-3-slider-component'

export default {
    components:{
        TopBar,
        PrevNextButton,
        VueSlider
    },
    data(){
        return{
            value5:5
        }
    }
}
</script>

<style scoped>
.button-container{
    display:flex;
    justify-content:center;
    align-items: center;
}
</style>