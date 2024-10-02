<template>
    <div class="product-slider">
        <button @click="scrollLeft" class="scroll-button left" :disabled="isAtStart">&#8249;</button>
        <div class="products-container" ref="container">
            <div v-for="{ id, name, price, img } in products" :key="id" class="product-item">
                <div class="relative">
                    <a href="#" class="block">
                        <img :src="img.src" :alt="img.alt" class="product-image" width="146" height="146" />
                    </a>
                    <button class="wishlist-button" aria-label="Add to wishlist">&#9825;</button>
                </div>
                <div class="product-info">
                    <a href="#" class="product-name">{{ name }}</a>
                    <span class="product-price">{{ price }}</span>
                </div>
            </div>
        </div>
        <button @click="scrollRight" class="scroll-button right" :disabled="isAtEnd">&#8250;</button>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const products = ref(
    Array.from(Array(10), (_, i) => ({
        id: i.toString(),
        name: 'Athletic mens walking sneakers',
        price: '$2,345.99',
        img: {
            src: 'https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/sneakers.png',
            alt: 'White sneaker shoe',
        },
    })),
);

const container = ref(null);
const isAtStart = ref(true);
const isAtEnd = ref(false);

const scrollLeft = () => {
    if (container.value) {
        container.value.scrollLeft -= 200;
        updateScrollState();
    }
};

const scrollRight = () => {
    if (container.value) {
        container.value.scrollLeft += 200;
        updateScrollState();
    }
};

const updateScrollState = () => {
    if (container.value) {
        isAtStart.value = container.value.scrollLeft <= 0;
        isAtEnd.value = container.value.scrollLeft + container.value.clientWidth >= container.value.scrollWidth;
    }
};

onMounted(() => {
    updateScrollState();
    if (container.value) {
        container.value.addEventListener('scroll', updateScrollState);
    }
});
</script>

<style scoped>
.product-slider {
    position: relative;
    width: 100%;
    overflow: hidden;
}

.products-container {
    display: flex;
    overflow-x: auto;
    scroll-behavior: smooth;
    -ms-overflow-style: none;
    scrollbar-width: none;
    padding: 10px 0;
}

.products-container::-webkit-scrollbar {
    display: none;
}

.product-item {
    flex: 0 0 auto;
    width: 148px;
    margin-right: 10px;
    border: 1px solid #e5e5e5;
    border-radius: 8px;
    background-color: #fff;
}

.product-image {
    width: 100%;
    height: 146px;
    object-fit: cover;
    border-radius: 8px 8px 0 0;
}

.product-info {
    padding: 10px;
}

.product-name {
    display: block;
    margin-bottom: 5px;
    color: #333;
    text-decoration: none;
    font-size: 0.9em;
}

.product-price {
    font-weight: bold;
    font-size: 0.9em;
}

.scroll-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(255, 255, 255, 0.7);
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    font-size: 24px;
    z-index: 10;
    cursor: pointer;
}

.scroll-button.left {
    left: 10px;
}

.scroll-button.right {
    right: 10px;
}

.scroll-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.wishlist-button {
    position: absolute;
    bottom: 10px;
    right: 10px;
    background-color: white;
    border: 1px solid #e5e5e5;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    font-size: 18px;
    cursor: pointer;
}
</style>
