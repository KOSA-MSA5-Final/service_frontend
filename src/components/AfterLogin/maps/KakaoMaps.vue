<template>
    <div class="map-wrapper">
        <!-- 지도 컨테이너 -->
        <div class="map-container" ref="mapContainer"></div>

        <!-- 현재 위치 정보 표시 -->
        <div class="current-location-info">
            <div class="location-header">
                <span>📍 현재위치 : {{ currentAddress }}</span>
                <button class="refresh-btn" @click="refreshUserLocation">
                    <!-- SVG 아이콘 대신 사용 -->
                    <svg
                        height="25px"
                        width="25px"
                        viewBox="-2.4 -2.4 28.80 28.80"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g id="SVGRepo_bgCarrier" stroke-width="0">
                            <rect
                                x="-2.4"
                                y="-2.4"
                                width="28.80"
                                height="28.80"
                                rx="14.4"
                                fill="#e1f0fc"
                                strokewidth="0"
                            ></rect>
                        </g>
                        <g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke="#CCCCCC"
                            stroke-width="0.144"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                            <path
                                d="M4.06189 13C4.02104 12.6724 4 12.3387 4 12C4 7.58172 7.58172 4 12 4C14.5006 4 16.7332 5.14727 18.2002 6.94416M19.9381 11C19.979 11.3276 20 11.6613 20 12C20 16.4183 16.4183 20 12 20C9.61061 20 7.46589 18.9525 6 17.2916M9 17H6V17.2916M18.2002 4V6.94416M18.2002 6.94416V6.99993L15.2002 7M6 20V17.2916"
                                stroke="#000000"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            ></path>
                        </g>
                    </svg>
                </button>
            </div>
        </div>

        <!-- 병원 정보 리스트 -->
        <div class="hospital-list">
            <div class="hospital-item" v-for="(hospital, index) in hospitalList" :key="index">
                <div class="hospital-info">
                    <div class="hospital-name">{{ hospital.name }}</div>
                    <div class="hospital-address">{{ hospital.address }}</div>
                </div>
                <div class="hospital-action">
                    <button class="reservation-btn">예약</button>
                    <button class="consultation-btn">상담</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const mapContainer = ref(null);
const mapInstance = ref(null);
const userLocation = ref(null);
const userMarker = ref(null);
const isMapReady = ref(false);
const currentAddress = ref('위치 정보를 불러오는 중...'); // 현재 위치 주소를 저장할 상태 변수

// 병원 리스트 예시 데이터
const hospitalList = ref([
    { name: '우리 동물 병원', address: '서울시 종로구 혜화동 516번길' },
    { name: '우리 동물 병원', address: '서울시 종로구 혜화동 516번길' },
    { name: '우리 동물 병원', address: '서울시 종로구 혜화동 516번길' },
]);

// 지도 초기화 함수
const loadKakaoMap = (container) => {
    if (!window.kakao || !window.kakao.maps) {
        const script = document.createElement('script');
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=174a4fe81b5616acf152b93b71c0b41d&libraries=services,clusterer,drawing&autoload=false`;
        document.head.appendChild(script);

        script.onload = () => {
            window.kakao.maps.load(() => {
                initializeMap(container);
            });
        };
    } else {
        initializeMap(container);
    }
};

// 지도 설정 및 사용자 위치 마커 초기화 함수
const initializeMap = (container) => {
    const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 초기 지도 위치 설정
        level: 1, // 지도 확대 수준
    };
    mapInstance.value = new window.kakao.maps.Map(container, options);

    const zoomControl = new window.kakao.maps.ZoomControl();
    mapInstance.value.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

    isMapReady.value = true;
    refreshUserLocation(); // 지도 초기화 후 사용자 위치로 이동
};

// 사용자 위치 마커 업데이트 함수
const updateUserMarker = (lat, lng) => {
    if (!isMapReady.value || !window.kakao || !window.kakao.maps) return;

    const position = new window.kakao.maps.LatLng(lat, lng);

    // 기존 마커 제거
    if (userMarker.value) {
        userMarker.value.setMap(null);
    }

    // 새로운 사용자 위치 마커 생성 및 추가
    userMarker.value = new window.kakao.maps.Marker({
        position: position,
        map: mapInstance.value,
        title: '현재 위치',
        draggable: false,
        image: new window.kakao.maps.MarkerImage(
            `data:image/svg+xml;base64,${btoa(` 
            <svg height="200px" width="200px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 293.334 293.334" xml:space="preserve" fill="#007AFF">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier"> 
                    <g> 
                        <g> 
                            <path style="fill:#007AFF;" d="M146.667,0C94.903,0,52.946,41.957,52.946,93.721c0,22.322,7.849,42.789,20.891,58.878 c4.204,5.178,11.237,13.331,14.903,18.906c21.109,32.069,48.19,78.643,56.082,116.864c1.354,6.527,2.986,6.641,4.743,0.212 c5.629-20.609,20.228-65.639,50.377-112.757c3.595-5.619,10.884-13.483,15.409-18.379c6.554-7.098,12.009-15.224,16.154-24.084 c5.651-12.086,8.882-25.466,8.882-39.629C240.387,41.962,198.43,0,146.667,0z M146.667,144.358 c-28.892,0-52.313-23.421-52.313-52.313c0-28.887,23.421-52.307,52.313-52.307s52.313,23.421,52.313,52.307 C198.98,120.938,175.559,144.358,146.667,144.358z"></path> 
                            <circle style="fill:#007AFF;" cx="146.667" cy="90.196" r="21.756"></circle> 
                        </g> 
                    </g> 
                </g>
            </svg>
        `)}`,
            new window.kakao.maps.Size(25, 25),
            {
                offset: new window.kakao.maps.Point(25, 25),
            },
        ),
    });
};

// 좌표를 주소로 변환하는 함수
const getAddressFromCoords = (lat, lng) => {
    const geocoder = new window.kakao.maps.services.Geocoder();
    const coord = new window.kakao.maps.LatLng(lat, lng);

    geocoder.coord2Address(coord.getLng(), coord.getLat(), (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
            currentAddress.value = result[0].address.address_name;
        } else {
            currentAddress.value = '주소 변환 실패';
        }
    });
};

// 사용자 위치로 지도 이동 함수
const moveToLocation = (lat, lng) => {
    if (!isMapReady.value || !window.kakao || !window.kakao.maps) return;

    const location = new window.kakao.maps.LatLng(lat, lng);
    userLocation.value = location;

    mapInstance.value.setCenter(location);
    mapInstance.value.setLevel(1);

    // 사용자 위치 마커 업데이트
    updateUserMarker(lat, lng);
    // 주소 업데이트
    getAddressFromCoords(lat, lng);
};

// 사용자 위치 새로고침 함수
const refreshUserLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                moveToLocation(position.coords.latitude, position.coords.longitude);
            },
            (error) => {
                console.error('사용자 위치를 가져오는 중 오류 발생: ', error);
            },
        );
    } else {
        console.error('이 브라우저는 Geolocation을 지원하지 않습니다.');
    }
};

// 지도 초기화 및 이벤트 등록
onMounted(() => {
    loadKakaoMap(mapContainer.value);
});

// 컴포넌트 언마운트 시 이벤트 제거
onBeforeUnmount(() => {
    if (userMarker.value) {
        userMarker.value.setMap(null);
    }
});
</script>

<style scoped>
.map-wrapper {
    position: relative;
    width: 100%;
    height: 40vh;
}

.map-container {
    width: 100%;
    height: 100%;
}

/* .refresh-location-btn {
    position: absolute;
    top: 200px;
    right: 3px;
    z-index: 10;
    padding: 5px;
    font-size: 16px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    cursor: pointer;
} */

.refresh-location-btn:hover {
    background-color: #f1f1f1;
}

/* 현재 위치 정보 스타일 */
.current-location-info {
    width: 100%;
    padding: 15px;
    background-color: #8ec6f5;
    border-radius: 5px;
    margin-top: 10px;
}

.location-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.refresh-btn {
    background-color: #e1f0fc;
    color: #fff;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
}

/* 병원 리스트 스타일 */
.hospital-list {
    width: 100%;
    margin-top: 10px;
}

.hospital-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-bottom: 10px;
}

.hospital-info {
    display: flex;
    flex-direction: column;
}

.hospital-name {
    font-size: 18px;
    font-weight: bold;
}

.hospital-address {
    color: #666;
}

/* 병원 예약 및 상담 버튼 스타일 */
.hospital-action button {
    margin-left: 5px;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.reservation-btn {
    background-color: #007aff;
    color: #fff;
}

.consultation-btn {
    background-color: #ff6f61;
    color: #fff;
}
</style>
