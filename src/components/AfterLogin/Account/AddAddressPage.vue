<template>
    <div id="add-address-title">배송지 정보 추가</div>

    <div id="info-inputs">
        <div id="address-field" @click="goToSearchPage">
            <img src="@/assets/icon-search-address.svg" alt="Search Location Icon" />

            <input type="text" id="search-result" v-model="address" placeholder="주소 검색" readonly />
        </div>
        <div id="detailed-address-field">
            <img src="@/assets/icon-detail.svg" alt="Detail Icon" hidden="true" />
            <input type="text" id="detailed-address" v-model="detailed_address" placeholder="상세 주소 입력" />
        </div>
        <div id="personal-info" v-if="detailed_address.length > 0">
            <div id="receiptant-name-field">
                <img src="@/assets/icon-person.svg" alt="Person Icon" />
                <input id="receiptant-name" placeholder="받는 사람 이름" />
            </div>
            <div id="receiptant-telNum-field">
                <img src="@/assets/icon-telephone.svg" alt="Telephone Icon" />
                <input id="receiptant-telNum" placeholder="받는 사람 전화번호" />
            </div>
        </div>

        <div id="receiptant-telNum"></div>
        <div id="make-it-primary-address">
            <b-check id="checkbox"> </b-check>
            <p>기본 배송지로 선택</p>
        </div>
    </div>
    <div id="save-btn">저장하기</div>
</template>

<script>
export default {
    name: 'AddAddressPage',
    data() {
        return {
            address: '',
            detailed_address: '',
        };
    },
    mounted() {
        // 만약 주소가 params로 넘어왔다면, 주소 데이터를 셋팅
        if (this.$route.params.selectedAddress) {
            this.address = this.$route.params.selectedAddress;
        }
    },
    methods: {
        goToSearchPage() {
            this.$router.push({ name: 'AddressSearchPage' });
        },
    },
};
</script>

<style>
#add-address-title {
    font-size: 20px;
    margin-bottom: 20px;
}
#receiptant-name-field {
    flex-direction: row;
    width: 100%;
    margin-top: 10px;
}
#receiptant-name-field img {
    width: 30px;
    height: 30px;
    margin-right: 10px;
}
#receiptant-name {
    width: 80%;
}
#address-field {
    flex-direction: row;
    width: 100%;
}
#address-field img {
    width: 30px;
    height: 30px;
    margin-right: 10px;
}
#search-result {
    height: 30px;
    width: 80%;
}
#detailed-address-field {
    flex-direction: row;
    width: 100%;
}

#detailed-address-field img {
    width: 20px;
    height: 20px;
    margin-right: 20px;
}

#detailed-address {
    width: 80%;
    height: 30px; /* Ensure it matches the height of the box */
    margin-left: 40px;
}

#receiptant-telNum-field {
    flex-direction: row;
    width: 100%;
    margin-top: 10px;
}
#receiptant-telNum-field img {
    width: 30px;
    height: 30px;
    margin-right: 10px;
}
#receiptant-telNum {
    width: 80%;
}
</style>
