<template>
    <TopBar />

    <VueSlider v-model="value5" :min="0" :max="8" marks adsorb />

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