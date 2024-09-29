<template>
    <div id="settings-title">계정 관리</div>
    <div id="account-info">
        <div id="account-name">
            최혜령님, 안녕하세요!
        </div>
        <div id="account-email">
            tangkim98@naver.com
        </div>
    </div>
    <div id="setting-container">
        <div id="settings-container">
            <div id="delivery-infos-setting">
                배달지 정보 관리
            </div>
            <div id="account-setting">
                계정 정보 수정
            </div>
            <div id="change-pwd">
                비밀번호 변경
            </div>
            <div id="signout">
                서비스 탈퇴
            </div>
        </div>
        <div id="separating-line"></div>
        <div id="mypets-container">

        </div>
    </div>

</template>

<style scoped>
#settings-container {
    display: flex;
    flex-direction: row; /* 가로로 배치 */
    justify-content: space-between; /* 요소들 간에 균등한 간격 */
    align-items: center;
    border-radius: 10px;
    border: 1px solid white;
    background-color: white;
    width: 100%; /* 전체 너비 차지 */
}
#separating-line {
    border-top: 1px solid #ccc;
    margin: 10px 0;
}
</style>