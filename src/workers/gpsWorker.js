let intervalId = null;
onmessage = (e)=>{
    switch(e.data){
        case "start":
            intervalId = setInterval(()=>{
                postMessage("logging");
            },100);
            break;
        case "stop":
            postMessage("stop");
            intervalId && clearInterval(intervalId);
            break;
        case "reset":
            postMessage("reset");
            intervalId && clearInterval(intervalId);
            break;
        default:
            console.log("gps worker default");
            break;
    }
}