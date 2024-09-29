<template>
    <TopBar />
    
    <VueSlider v-model="value3" :min="0" :max="8" marks adsorb />
    
    
    <!-- 컨텐츠 -->
    <div style="font-size:2em; margin-top:5em;">
        장구니의 성별은?
    </div>
    <div style="display:flex; align-items: center; justify-content: center; margin-top:10px;">
        <div 
            class="maleBox"
            :class="{'active-border': isMale === 'm'}"
            @click="isMale='m'"  
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="250" height="250" fill="currentColor" class="bi bi-gender-male" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M9.5 2a.5.5 0 0 1 0-1h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0V2.707L9.871 6.836a5 5 0 1 1-.707-.707L13.293 2zM6 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8"/>
            </svg>
        </div>
        <div style="flex:0.1;"></div>
        <div 
            class="maleBox"
            :class="{'active-border': isMale==='f'}"
            @click="isMale='f'"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="250" height="250" fill="currentColor" class="bi bi-gender-female" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 1a4 4 0 1 0 0 8 4 4 0 0 0 0-8M3 5a5 5 0 1 1 5.5 4.975V12h2a.5.5 0 0 1 0 1h-2v2.5a.5.5 0 0 1-1 0V13h-2a.5.5 0 0 1 0-1h2V9.975A5 5 0 0 1 3 5"/>
            </svg>
        </div>
    </div>



    <div class="button-container">
        <PrevNextButton />
    </div>
</template>

<script>
import VueSlider from 'vue-3-slider-component'
import TopBar from './TopBar.vue';
import PrevNextButton from './PrevNextButton.vue';

export default {
    components: {
        VueSlider,
        TopBar,
        PrevNextButton,
    },
    data () {
        return {
            value3: 3,
            isMale: 'm',
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
.maleBox{
    flex:1; 
    border:1px solid black;
    padding:20px; 
    border-radius: 20px;
}
.maleBox:hover{
    background-color: #71A9DB ;
}
.active-border{
    border: 2px solid #1860C3;
}
</style>