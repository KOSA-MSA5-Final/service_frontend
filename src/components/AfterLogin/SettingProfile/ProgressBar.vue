<template>
    <div style="display: flex">
        <img src="https://img.icons8.com/ios-filled/50/cat-footprint.png" alt="" style="margin-left: 21%" />
    </div>
    <div class="progress-container" style="padding-left: 15%; padding-right: 15%">
        <div class="progress-bar step-1"></div>
        <div class="progress-bar step-3"></div>
        <div class="progress-bar step-3"></div>
        <div class="progress-bar step-3"></div>
        <div class="progress-bar step-3"></div>
        <div class="progress-bar step-3"></div>
        <div class="progress-bar step-3"></div>
    </div>
</template>

<script>
export default {};
</script>

<style scoped>
.progress-container {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
}

.progress-bar {
    width: 30%;
    height: 7px;
    background-color: lightgray;
    position: relative;
    border-radius: 10px;
}

.step-1::before,
.step-2::before,
.step-3::before {
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
}

.step-1 {
    background-color: blue;
}

.step-2 {
    background-color: blue;
}

.step-3 {
    background-color: gray;
}
</style>
