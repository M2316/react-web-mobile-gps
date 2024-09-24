# React + Vite [ 모바일 GPS + Kakao Maps ]

GPS로 받아온 위도,경도를 기반으로 기록된 GPS경로를 지도에 표시하는 예제

## ★react에서 kakao maps 를 사용하기 간편하게 라이브러리를 배포해 주신 JaeSeoKim님 감사합니다.★
[react kakao maps](https://react-kakao-maps-sdk.jaeseokim.dev/,"document")


## 목표 : 모바일 기기가 잠금상태로 변경되어도 서비스가 이어지길 바람

### 시도
WORKER.js를 통해 worker 스레드로 동작시킴
- 문제점1 : worker로 동작시 worker에서 geolocation 개체를 사용할 수 없음
- 문제점2 : worker에 setInterval로 0.1초마다 Background에서 요청이 발생될 수 있도록 했지만 모바일 GPS 센서가 꺼지는 문제가 해결되지 않음
- 문제점3 : 모바일 기기가 유휴상태에 빠지면 CPU 자원 할당 순위가 낮아져 setInterval의 딜레이가 지연됨
>  setInterval의 자원 할당 순위를 보장받기 위해 Dummy Audio를 Background에서 실행될 수 있도록 해보았지만 오디오가 동작하지 않음...


### 정리
- 간략히. 아직까진 Background에서 GPS 센서와 모바일에서 setInterval의 딜레이를 교정하는 방법을 찾지 못했다.
- Background에서의 GPS 센서와 작업들을 올바르게 사용하기 위해선 React Native를 통한 앱 개발이 필요해 보인다.

## 프리뷰

![example](https://private-user-images.githubusercontent.com/71809974/370207146-ee1114c5-1d22-4e1b-84c1-c1b2a19221d1.gif?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjcxNjgwNTEsIm5iZiI6MTcyNzE2Nzc1MSwicGF0aCI6Ii83MTgwOTk3NC8zNzAyMDcxNDYtZWUxMTE0YzUtMWQyMi00ZTFiLTg0YzEtYzFiMmExOTIyMWQxLmdpZj9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA5MjQlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwOTI0VDA4NDkxMVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTRjMWIzNjFmN2VjOGFkNjM2ODM2ZjgyNDZjNGE4MmU0MzZiY2QwYmJlMDk0NGE3ZmVlODQ4OWViYzUzMGNjOTkmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.KFA_zOVi-AHWUcN08iALIefTxgQgZvIE-13aEgz3bPk)
