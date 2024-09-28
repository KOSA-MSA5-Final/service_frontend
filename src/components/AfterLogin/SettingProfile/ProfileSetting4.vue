<template>
    <TopBar />

    <VueSlider v-model="value4" :min="0" :max="8" marks adsorb />

    <!-- 컨텐츠 -->
    <div style="font-size:2em; margin-top:5em;">
        장구니는 중성화를?
    </div>
    <div style="display:flex; align-items: center; justify-content: center; margin-top:10px;">
        <div 
            class="neutered"
            :class="{'active-border': isneutered === 'y'}"
            @click="isneutered='y'"  
        >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
        </svg>
            했어요
        </div>
        <div style="flex:0.1;"></div>
        <div 
            class="neutered"
            :class="{'active-border': isneutered === 'n'}"
            @click="isneutered='n'"
        >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
        </svg>
            안했어요
        </div>
    </div>

    <div v-if="isneutered==='n'" >
        <div style="font-size:2em; margin-top:2em;">
            할 예정이?
        </div>
        <div style="display:flex; align-items: center; justify-content: center; margin-top:10px;">
            <div 
                class="neutered"
                :class="{'active-border': willneutered === 'y'}"
                @click="willneutered='y'"  
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                </svg>
                있어요
            </div>
            <div style="flex:0.1;"></div>
            <div 
                class="neutered"
                :class="{'active-border': willneutered === 'n'}"
                @click="willneutered='n'"
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
            </svg>
                없어요
            </div>
        </div>

    </div>


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
            value4:4,
            isneutered: 'y',
            willneutered: 'y',
        }
    },
    methods:{

    }
}
</script>

<style scoped>
.button-container{
    display:flex;
    justify-content:center;
    align-items: center;
    
}
.neutered{
    flex: 1;
    border: 1px solid black;
    padding: 10px;
    border-radius: 20px;
    text-align: center; 
    align-content: center;
    color: gray;
}
.neutered:hover{
    background-color: #71A9DB ;
    color: white
}
.active-border{
    border: 2px solid #1860C3;
    color: black;
}
</style>