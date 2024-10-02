<template>
    <div id="settings-title">계정 관리</div>
    <div id="setting-container">
        <div id="settings-container">
            <div id="delivery-info-setting" @click="addressSettingsPage">
                <img class="icon" src="@/assets/icon-home2.svg" alt="Address Icon" />
                <p class="title">배달지 정보</p>
                <p class="sstitle">관리하기</p>
            </div>

            <div id="account-setting">
                <img class="icon" src="@/assets/icon-account.svg" alt="Account Icon" />
                <p class="title">개인 정보</p>
                <p class="sstitle">관리하기</p>
            </div>
            <div id="change-pwd">
                <img class="icon" src="@/assets/icon-password.svg" alt="Password Icon" />
                <p class="title">비밀번호</p>
                <p class="sstitle">변경하기</p>
            </div>
            <div id="logout" @click="logout">
                <img class="icon" src="@/assets/icon-logout.svg" alt="Logout Icon" />
                <p class="title">로그아웃</p>
                <p class="sstitle">하기</p>
            </div>
        </div>
        <div id="separating-line"></div>
        <p class="ttitle">우리집 아이들</p>
        <p class="subtitle">반려동물 프로필을 클릭하면</p>
        <p class="subtitle">현재 계정 프로필이 선택한 프로필로 변경됩니다.</p>
        <div id="mypets-container">
            <div id="mypet-profiles">
                <div id="profiles" v-if="profiles.length > 0">
                    <div class="profile" v-for="profile in profiles" :key="profile.profile_id">
                        <img :src="profile.profile_picture_url" :alt="profile.profile_name" />
                        <p>{{ profile.profile_name }}</p>
                    </div>
                </div>
                <div id="add-profile">
                    <div class="add-profile" @click="addProfile">
                        <!-- <img src="@/assets/icon-add.svg" alt="Add Icon" /> -->
                        <img src="@/assets/jangoon.gif" alt="Strong Jangoon" />
                        <p>반려동물 추가</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useAuthStore } from '@/post_datas/loginStore';
import { useRouter } from 'vue-router';

export default {
    name: 'SettingsMainPage',
    setup() {
        const authStore = useAuthStore();
        const router = useRouter();

        return { authStore, router };
    },
    data() {
        return {
            profiles: [
                {
                    profile_id: 1,
                    profile_picture_url:
                        'https://elliebucket1.s3.ap-northeast-2.amazonaws.com/%ED%86%A0%EB%81%BC%EA%B6%81%EB%94%94.jpg',
                    profile_name: '토깽이',
                },
                {
                    profile_id: 2,
                    profile_picture_url:
                        'https://elliebucket1.s3.ap-northeast-2.amazonaws.com/%ED%86%A0%EB%81%BC%EA%B6%81%EB%94%94.jpg',
                    profile_name: '장구니',
                },
                {
                    profile_id: 3,
                    profile_picture_url:
                        'https://elliebucket1.s3.ap-northeast-2.amazonaws.com/%ED%86%A0%EB%81%BC%EA%B6%81%EB%94%94.jpg',
                    profile_name: '멍멍이',
                },
            ],
        };
    },
    methods: {
        async logout() {
            try {
                this.authStore.logout();

                console.log('로그아웃 성공');

                // 로그아웃 후 로그인 페이지로 리디렉션
                this.$router.push('/');
            } catch (error) {
                console.error('로그아웃 중 오류 발생:', error);
                // 오류 처리 로직을 추가할 수 있습니다.
            }
        },
        addressSettingsPage() {
            this.router.push({ name: 'AddressSettingMain' });
        },
        addProfile() {
            this.router.push({ name: 'setProfilePage1' });
        },
    },
};
</script>

<style scoped>
#settings-title {
    font-size: 20px;
    margin-bottom: 15px;
    margin-top: 15px;
}
#setting-container {
    border-radius: 10px;
    border: 1px solid #71a9db;
    background-color: white;
    margin-left: 10px;
    margin-right: 10px;
    width: 95%;
    padding: 10px;
}
#settings-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
    border: 1px solid white;
    background-color: white;
    width: 100%;
}
#separating-line {
    border-top: 1px solid #71a9db;
    margin: 10px 0;
}

#delivery-info-setting,
#account-setting,
#change-pwd,
#logout {
    flex: 1; /* 각 요소가 동일한 너비를 가짐 */
    margin: 0 10px; /* 요소 간의 간격 */
    text-align: center; /* 요소 안의 내용 중앙 정렬 */
}

#delivery-info-setting img,
#account-setting img,
#change-pwd img,
#logout img {
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

.ttitle {
    font-size: 16px;
    font-weight: bold;
    color: #333;
}
.sstitle {
    font-size: 14px;
    color: #555;
}
.subtitle {
    font-size: 11px;
    color: #555;
}

#mypets-container {
    padding: 20px;
}

#mypet-profiles {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
}

.profile,
#add-profile {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.profile img,
#add-profile img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid #71a9db;
}

#profiles {
    display: contents;
}

#add-profile {
    cursor: pointer;
}

/* 프로필 개수가 홀수일 때 추가 버튼을 오른쪽으로 밀기 */
#profiles:has(~ #add-profile:nth-child(even)) {
    grid-column: 1;
}

#add-profile:nth-child(even) {
    grid-column: 2;
}

.icon {
    filter: invert(77%) sepia(8%) saturate(5399%) hue-rotate(179deg) brightness(90%) contrast(90%);
}
</style>
