<template>
    <div id="profile-page">
        <div id="profile-page-title">현재 반려동물 프로필</div>
        <div id="profile-info">
            <div id="profile-img">
                <div id="profile-img-container">
                    <img src="https://elliebucket1.s3.ap-northeast-2.amazonaws.com/%ED%86%A0%EB%81%BC%EA%B6%81%EB%94%94.jpg" alt="Profile Image"/>
                </div>
            </div>
            <div id="profile-name">
                <p>토깽이</p>
            </div>
            <div id="edit-button">
                <img src="@/assets/icon-edit.svg" alt="Edit Icon"/>
            </div>
            <div id="custom-info-reg-button">
                <p>맞춤 정보 등록</p>
            </div>
        </div>
        <div id="services">
            <div id="main-services">
                <div id="check-delivery">
                    <img src="@/assets/icon-delivery.svg" alt="Delivery Icon"/>
                    <p class="title">주문배송</p>
                    <p class="subtitle">확인하기</p>
                </div>
                <div id="reg-receipt">
                    <img src="@/assets/icon-scan.svg" alt="Register Receipt Icon"/>
                    <p class="title">진료영수증</p>
                    <p class="subtitle">등록하기</p>
                </div>
                <div id="find-facilities">
                    <img src="@/assets/icon-building.svg" alt="Facilities Icon"/>
                    <p class="title">맞춤형</p>
                    <p class="subtitle">시설찾기</p>
                </div>
                <div id="shopping-cart">
                    <img src="@/assets/icon-shopping-cart.svg" alt="Shopping Cart Icon"/>
                    <p class="title">장바구니</p>
                    <p class="subtitle">확인하기</p>
                </div>
            </div>

            <div id="separating-line"></div>
            <div id="sub-services">
                <div id="medical-history">
                    <img src="@/assets/icon-receipt.svg" alt="Medical Receipt Icon">
                    <div class="title">전체 진료 내역 확인하기</div>
                </div>
                <div id="health-history">
                    <img src="@/assets/icon-health.svg" alt="Medical Receipt Icon">
                    <div class="title">현재 건강 상태 보기/내보내기</div>
                </div>

            </div>
        </div>
        <div id="supplying-products">
            <div id="supplying-products-title">현재 급여중인 상품들</div>
        </div>
        <div id="latest-bought-items"></div>
    </div>
</template>

<script></script>

<style scoped>
#profile-page {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    /* padding: 20px; */
    box-sizing: border-box;
}

#profile-page-title {
    font-size: 20px;
    margin-bottom: 20px;
}

#profile-info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #f8f8f8;
    padding: 10px;
    height: 100px;
    margin-bottom: 20px;
    text-align: left;
}

#profile-img-container img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 50%;
}

#profile-name {
    flex-grow: 1;
    margin-left: 20px;
}

#edit-button {
    margin: 0 10px;
}

#edit-button img {
    width: 20px;
    height: 20px;
}

#custom-info-reg-button {
    border-radius: 10px;
    border: 1px solid white;
    background-color: #71A9DB;
    padding: 5px 10px;
    color: white;
    white-space: nowrap;
}

#profile-name p, #custom-info-reg-button p {
    margin: 0;
}

#services, #supplying-products, #latest-bought-items {
    margin-bottom: 20px;
    /* Add more styles for these sections as needed */
}

#separating-line {
    border-top: 1px solid #ccc;
    margin: 10px 0;
}

#services {
    border-radius: 10px;
    border: 2px solid white;
    max-width: 450px;
    background-color: white; 
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

#main-services {
    display: flex;
    flex-direction: row; /* 가로로 배치 */
    justify-content: space-between; /* 요소들 간에 균등한 간격 */
    align-items: center;
    border-radius: 10px;
    border: 1px solid white;
    background-color: white;
    width: 100%; /* 전체 너비 차지 */
}

#check-delivery, #reg-receipt, #find-facilities, #shopping-cart {
    flex: 1; /* 각 요소가 동일한 너비를 가짐 */
    margin: 0 10px; /* 요소 간의 간격 */
    text-align: center; /* 요소 안의 내용 중앙 정렬 */
}

#check-delivery img, #reg-receipt img, #find-facilities img, #shopping-cart img {
    width: 50px; /* 이미지 너비 */
    height: 50px; /* 이미지 높이 */
    object-fit: cover; /* 이미지를 잘라내지 않고 비율에 맞춰 표시 */
}

p {
    margin: 5px 0;
}

.title {
    font-size: 14px;
    font-weight: bold;
    color: #333;
}

.subtitle {
    font-size: 14px;
    color: #555;
}

/* 가운데 구분선 */
#separating-line {
    border-top: 1px solid #ccc;
    width: 100%;
    margin: 20px 0;
}

#sub-services {
    border-radius: 10px;
    border: 2px solid white;
    background-color: #f9f9f9;
    width: 100%;
    padding: 15px;
    /* height: 1000px; */
}

#medical-history, #health-history {
    display: flex;
    align-items: center;
    flex-direction: row;
    padding: 10px;
    margin-bottom: 10px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

#medical-history img, #health-history img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
}

</style>