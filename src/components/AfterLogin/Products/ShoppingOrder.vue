<template>
    <div>
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
                const memberId = 1; // 예시: 로그인한 사용자의 ID를 대입
                const response = await axios.get(`https://localhost:8081/api/orders/${memberId}`, {
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
.order-card {
    border: 1px solid #ccc;
    padding: 1rem;
    margin-bottom: 1rem;
}
</style>
