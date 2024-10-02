<template>
    <div style="height: inherit">
        <TopBar />

        <div style="display: flex; justify-content: center">
            <VueSlider
                v-model="value4"
                :min="0"
                :max="8"
                marks
                adsorb
                style="position: absolute !important; top: 10%; width: 80%"
            />
        </div>

        <div class="button-container">
            <PrevNextButton />
        </div>
    </div>
</template>

<script>
import PrevNextButton from './PrevNextButton.vue';
import TopBar from './TopBar.vue';
import VueSlider from 'vue-3-slider-component';

export default {
    components: {
        TopBar,
        PrevNextButton,
        VueSlider,
    },
    data() {
        return {
            value5: 5,
        };
    },
};
</script>

<style scoped>
.button-container {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
