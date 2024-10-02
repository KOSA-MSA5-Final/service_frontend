<template>
    <div id="addresses-container">
        <div id="addresses" v-for="address in addresses" :key="address.id">
            <div id="contents">
                <div id="infos">
                    <div id="address">주소 : {{ address.address }}</div>

                    <div id="receiptant_name">수령자 이름 : {{ address.receiptant_name }}</div>
                    <div id="receiptant_addess">
                        수령자 연락처 :
                        {{ address.receiptant_telNum }}
                    </div>
                </div>
                <div id="buttonsAndTag">
                    <div id="primary-tag" v-if="address.isPrimary">대표 배송지</div>
                    <div id="change-to-primary-btn" v-if="!address.isPrimary" @click="changePrimaryAddress(address.id)">
                        대표 배송지 <br />설정
                    </div>
                    <div id="delete-btn" v-if="!address.isPrimary">삭제</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';
export default {
    name: 'AddressSettingPage',
    setup() {
        const router = useRouter();

        return { router };
    },
    data() {
        return {
            addresses: [
                {
                    id: 1,
                    address: '서울시 강남구 광평로10길 15, 상록수 아파트 108동',
                    isPrimary: false,
                    receiptant_name: '최혜령',
                    receiptant_telNum: '010-4586-5811',
                },
                {
                    id: 2,
                    address: '서울시 강남구 광평로 10길',
                    isPrimary: true,
                    receiptant_name: '나선주',
                    receiptant_telNum: '010-9999-1111',
                },
            ],
        };
    },
    methods: {
        changePrimaryAddress(newPrimaryId) {
            // 기존의 대표 배송지를 찾아 isPrimary를 false로 변경
            const oldPrimary = this.addresses.find((addr) => addr.isPrimary);
            if (oldPrimary) {
                oldPrimary.isPrimary = false;
            }

            // 선택한 배송지의 isPrimary를 true로 변경
            const newPrimary = this.addresses.find((addr) => addr.id === newPrimaryId);
            if (newPrimary) {
                newPrimary.isPrimary = true;
            }

            console.log('대표 배송지가 변경되었습니다.');
        },
    },
};
</script>

<style>
#addresses-container {
    padding: 10px;
}
#address-setting-title {
    font-size: 20px;
    margin-bottom: 20px;
}
#add-new-address img {
    width: 50px;
    height: 50px;
}
#addresses {
    text-align: left;
    border-style: solid;
    border-radius: 10px;
    padding: 10px;
    margin-bottom: 10px;
    background-color: white;
    font-size: 14px;
    border-color: white;
}
#primary-tag {
    border-style: double;
    border-radius: 10px;
    border-color: #71a9db;
    text-align: center;
    position: unset;
    padding: 5px;
    background-color: #71a9db;
    color: white;
}
#change-to-primary-btn,
#delete-btn {
    display: flex;
    border-style: double;
    border-radius: 10px;
    border-color: #71a9db;
    text-align: center;
    position: unset;
    padding: 5px;
    background-color: #71a9db;
    color: white;
}
#contents {
    display: flex;
    justify-content: space-between; /* 좌우로 배치 */
    align-items: flex-start; /* 위쪽에 정렬 */
    padding: 10px; /* 여백 추가 */
}
#infos {
    flex: 1; /* 왼쪽이 더 넓어지게 설정 (필요시) */
    text-align: left; /* 왼쪽 정렬 */
}

#buttonsAndTag {
    display: flex;
    flex-direction: column; /* 버튼과 태그를 위아래로 배치 */
    align-items: flex-end; /* 오른쪽 정렬 */
}
</style>
