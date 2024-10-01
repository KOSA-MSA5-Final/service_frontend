<template>
    <div id="address-setting-title">주소관리</div>
    <div id="addresses-container">
        <div id="add-new-address">
            <img src="@/assets/icon-add.svg" alt="Add Icon" />
            <p>새로운 배송지 추가</p>
        </div>
        <div id="addresses" v-for="address in addresses" :key="address.id">
            <div id="primary-tag" v-if="address.isPrimary">대표 배송지</div>
            <div id="change-to-primary-btn" v-if="!address.isPrimary" @click="changePrimaryAddress(address.id)">
                대표 배송지로 변경
            </div>
            <div id="address">주소 : {{ address.address }}</div>
            <div id="receiptant_name">수령자 이름 : {{ address.receiptant_name }}</div>
            <div id="receiptant_addess">
                수령자 연락처 :
                {{ address.receiptant_telNum }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AddressSettingPage',
    data() {
        return {
            addresses: [
                {
                    id: 1,
                    address: '서울시 강남구 광평로',
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
    border-radius: 20px;
    padding: 10px;
    margin-bottom: 10px;
}
#primary-tag {
    border-style: double;
    border-radius: 20px;
    text-align: center;
    position: unset;
}
#change-to-primary-btn {
    border-style: double;
    border-radius: 20px;
    text-align: center;
    position: unset;
}
</style>
