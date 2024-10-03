# React + Vite [ 모바일 GPS + Kakao Maps ]

GPS로 받아온 위도,경도를 기반으로 기록된 GPS경로를 지도에 표시하는 예제

### 😊★react에서 kakao maps 를 사용하기 간편하게 라이브러리를 배포해 주신 JaeSeoKim님 감사합니다.😊★
[react kakao maps](https://react-kakao-maps-sdk.jaeseokim.dev/,"document")


## 🚩 목표 : 모바일 기기가 잠금상태로 변경되어도 서비스가 이어지길 바람

### 👊 시도
WORKER.js를 통해 worker 스레드로 동작시킴
- 문제점1 : worker로 동작시 worker에서 geolocation 개체를 사용할 수 없음
- 문제점2 : worker에 setInterval로 0.1초마다 Background에서 요청이 발생될 수 있도록 했지만 모바일 GPS 센서가 꺼지는 문제가 해결되지 않음
- 문제점3 : 모바일 기기가 유휴상태에 빠지면 CPU 자원 할당 순위가 낮아져 setInterval의 딜레이가 지연됨
>  setInterval의 자원 할당 순위를 보장받기 위해 Dummy Audio를 Background에서 실행될 수 있도록 해보았지만 오디오가 동작하지 않음...


### 📌 정리
- 간략히. 아직까진 Background에서 GPS 센서와 모바일에서 setInterval의 딜레이를 교정하는 방법을 찾지 못했다.
- Background에서의 GPS 센서와 작업들을 올바르게 사용하기 위해선 React Native를 통한 앱 개발이 필요해 보인다.

## 🖥️ 프리뷰
![ezgif-1-6b90a32738](https://github.com/user-attachments/assets/ee1114c5-1d22-4e1b-84c1-c1b2a19221d1)
