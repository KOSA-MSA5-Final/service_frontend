<template>
    <div style="display: flex; justify-content: center">
        <VueSlider
            v-model="value2"
            :min="0"
            :max="8"
            marks
            adsorb
            style="position: absolute !important; top: 10%; width: 80%"
        />
    </div>
</template>

<script>
import VueSlider from 'vue-3-slider-component';

export default {
    components: {
        VueSlider,
    },
};
</script>

<style scoped></style>
