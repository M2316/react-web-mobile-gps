import React, { useCallback, useEffect, useRef, useState } from 'react'

const useGpsWorker = () => {

    
    const workerRef = useRef(null);
    const gpsSensorRef = useRef(null);
    const gpsSensorValue = useRef(null);

    const [gpsLocation, setGpsLocation] = useState([]);




    useEffect(()=>{
        workerRef.current = new Worker("src/workers/gpsWorker.js");
        //worker가 던지는 메세지를 받아 처리하는 부분
        workerRef.current.onmessage = (e) => {
            console.log("worker 에서 받은 요청임~! => "+e.data);

            switch(e.data){
                case "logging":

                    setGpsLocation((prevGpsLocation)=>{
                        //초기값 저장        
                        if(prevGpsLocation.length === 0){
                            return [
                            {
                                lat: gpsSensorValue.current?.lat,
                                lng: gpsSensorValue.current?.lng,
                            },
                            ...prevGpsLocation,
                            ];
                        }


                        if(gpsSensorValue.current){

                            const firstPosition = prevGpsLocation[0];

                            const latitude = gpsSensorValue.current?.lat;
                            const longitude = gpsSensorValue.current?.lng;
                    
                    
                            let latitudeChangeValue;
                            let longitudeChangeValue;
                            if(latitude){
                              latitudeChangeValue = latitude - firstPosition.lat;
                            }
                            if(longitude){
                              longitudeChangeValue = longitude - firstPosition.lng;
                            }


                            //경도, 위도 1.5미터 차이 날때마다 log로 기록
                            
                            if(
                                (latitude && Math.abs(latitudeChangeValue) > 0.00001) ||
                                (longitude && Math.abs(longitudeChangeValue) > 0.00001)
                            ){
                                return [
                                {
                                    lat: latitude,
                                    lng: longitude,
                                },
                                ...prevGpsLocation,
                                ];
                            }else{
                                return prevGpsLocation;
                            }

                            
                            
                        }
                        return [...prevGpsLocation]
                    })
                    break;
                case "stop":
                    console.log("stop");
                    break;
                case "reset":
                    console.log("reset");
                    setGpsLocation([]);
                    break;
            }

        }

        return ()=>{
            //worker가 사용한 리소스를 해제하는 부분
            if (workerRef.current)workerRef.current.terminate();
        }


    },[])

    const gpsPostMessage = useCallback((message) => {
        if (workerRef.current) workerRef.current.postMessage(message);

        if(message === "start"){
            console.log("GPS센서 켜짐");

            //gps 센서를 켜는 부분 [변화를 감지해 값을 가져오는 부분]
            gpsSensorRef.current = navigator.geolocation.watchPosition((position)=>{

                const latitude = Number(position.coords.latitude);
                const longitude = Number(position.coords.longitude);
                const timestamp = Number(position.timestamp);

                gpsSensorValue.current = {
                    lat:latitude,
                    lng:longitude,
                    timestamp:timestamp
                };
            },(error)=>{
                console.log(error);
            },{
                enableHighAccuracy:true,
                timeout:5000,
                maximumAge:0
            });
        }

      }, []);


  return [gpsLocation,gpsPostMessage];
}

export default useGpsWorker