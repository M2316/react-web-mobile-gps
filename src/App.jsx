import dayjs from 'dayjs';
import './App.css'
import useGpsWorker from './hooks/useGpsWorker'
import { CustomOverlayMap, Map, Polyline, useKakaoLoader } from 'react-kakao-maps-sdk';
import { useState } from 'react';

// .env 파일에 저장된 Kakao Maps API 키를 가져옵니다 [발급 받으신 키로 변경하세요]
const appKey = import.meta.env.VITE_KAKAO_MAPS_API_KEY;

function App() {

  const [ loading, error ] = useKakaoLoader({
    appkey: appKey, 
    libraries: ["clusterer", "drawing", "services"]
  });

  const [mapOpenFlag,setMapOpenFlag] = useState(false);

  const [gpsLocation,gpsPostMessage] = useGpsWorker();

  const gpsSensorStartHandler = ()=>{
    gpsPostMessage("start");
    setMapOpenFlag(false);
  }

  const gpsSensorStopHandler = ()=>{
    gpsPostMessage("stop");
    setMapOpenFlag(true);
  }

  const gpsSensorResetHandler = ()=>{
    gpsPostMessage("reset");
    setMapOpenFlag(false);
  }

  return (
    <div className='main-dom'>
      <h1>GPS 기록하기</h1>
      <div>
          <h2>현재 위도 : {gpsLocation.length >= 1 && gpsLocation[0].lat}</h2>
          <h2>현재 경도 : {gpsLocation.length >= 1 && gpsLocation[0].lng}</h2>
      </div>
      <div>
        <button onClick={gpsSensorStartHandler}>GPS기록 시작</button>
        <button onClick={gpsSensorStopHandler}>GPS기록 중지</button>
        <button onClick={gpsSensorResetHandler}>GPS기록 초기화</button>
      </div>
      
      <hr></hr>
      {mapOpenFlag && <Map // 지도를 표시할 Container
        center={{
          // 지도의 중심좌표
          lat: gpsLocation[gpsLocation.length-1].lat,
          lng: gpsLocation[gpsLocation.length-1].lng,
        }}
        style={{
          // 지도의 크기
          width: "450px",
          height: "450px",
        }}
        level={3} // 지도의 확대 레벨
      >
        <Polyline
          path={[
            gpsLocation,
          ]}
          strokeWeight={10} // 선의 두께 입니다
          strokeColor={"black"} // 선의 색깔입니다
          strokeOpacity={0.7} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
          strokeStyle={"solid"} // 선의 스타일입니다
        />
        <CustomOverlayMap
          // 커스텀 오버레이가 표시될 위치입니다
          position={{
            lat: gpsLocation[gpsLocation.length-1].lat,
            lng: gpsLocation[gpsLocation.length-1].lng,
          }}
        >
          {/* 커스텀 오버레이에 표시할 내용입니다 */}
          <div className="label" style={{color: "white",fontWeight:"800",position:"relative"}}>
              <span className="center" style={{background:"#000",position:"absolute",top:"-32px",left:"-40px",padding:"2px 10px",borderRadius:"15px",width:"60px",textAlign:"center"}}>START!!</span>
          </div>
        </CustomOverlayMap>
        <CustomOverlayMap
          // 커스텀 오버레이가 표시될 위치입니다
          position={{
            lat: gpsLocation[0].lat,
            lng: gpsLocation[0].lng,
          }}
        >
          {/* 커스텀 오버레이에 표시할 내용입니다 */}
          <div className="label" style={{color: "white",fontWeight:"800",position:"relative"}}>
              <span className="center" style={{background:"#000",position:"absolute",bottom:"-30px",left:"-30px",padding:"2px 10px",width:"40px",borderRadius:"15px",textAlign:"center"}}>END</span>
          </div>
        </CustomOverlayMap>
      </Map>}
      <hr></hr>

      <div className='log-list'>
        {
          gpsLocation.length > 0 && gpsLocation.map((location,index)=>{
            if(index >= 300)return
            return (
              <div key={index}>
                <h3>{gpsLocation.length - index}</h3>
                <p> 시간 : {dayjs(location.timestamp).format("YYYY-MM-DD hh:mm ss SSS")} </p>
                <p> 위도 : {location.lat} </p>
                <p> 경도 : {location.lng} </p>
              </div>
            )
          })
        }
      </div>
      
    </div>
  )
}

export default App
