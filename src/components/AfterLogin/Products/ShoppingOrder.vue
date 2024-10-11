<template>
    <div class="order-page">
        <h2>주문 내역</h2>
        <div v-if="orders.length > 0">
            <div v-for="order in orders" :key="order.id" class="order-card">
                <h3>주문번호: {{ order.id }}</h3>
                <p>총 금액: {{ order.totalPrice }}원</p>
                <p>구매 날짜: {{ formatDate(order.buyingDate) }}</p>
                <p>수취인: {{ order.receipient_name }}</p>
                <p>전화번호: {{ order.receipient_telNum }}</p>
                <p>배송 상태: {{ order.isAllShipping }}</p>
                <h4>주문 상품 목록</h4>
                <ul>
                    <li v-for="product in order.orderProductList" :key="product.id">
                        {{ product.productName }} - 상태: {{ product.shippingStatus }}
                    </li>
                </ul>
                <p>메모: {{ order.memo }}</p>
            </div>
        </div>
        <div v-else>
            <p>주문 내역이 없습니다.</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            orders: [],
        };
    },
    mounted() {
        this.fetchOrders();
    },
    methods: {
        async fetchOrders() {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`https://localhost:8081/api/products/order`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                this.orders = response.data;
            } catch (error) {
                console.error('주문 내역을 가져오는 중 오류가 발생했습니다.', error);
            }
        },
        formatDate(dateString) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateString).toLocaleDateString(undefined, options);
        },
    },
};
</script>

<style scoped>
.order-page {
    padding: 20px;
    background-color: #f9f9f9; /* 페이지 배경 색상 */
}

.order-card {
    border: 1px solid #ccc;
    padding: 1rem;
    margin-bottom: 1rem;
    background-color: #fff; /* 카드 배경 색상 */
    border-radius: 8px; /* 카드 모서리 둥글게 */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
}

.order-card h3 {
    margin: 0;
    font-size: 18px; /* 주문 번호 제목 크기 */
}

.order-card p {
    margin: 5px 0; /* 각 단락의 간격 */
}

.order-card ul {
    padding-left: 20px; /* 리스트의 왼쪽 여백 */
}

.order-card li {
    margin-bottom: 5px; /* 리스트 항목의 하단 여백 */
}
</style>
