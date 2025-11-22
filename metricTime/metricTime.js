let metricTimer
let precisionInterval = 8.64
function startMetricClock(){
    let multRecip = 1/precisionInterval
metricTimer = setInterval(()=>{
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let millisec = now.getMilliseconds()
    let totalmillisec = (hours*3600000)+(minutes*60000)+(seconds*1000)+millisec
    let microChronos = totalmillisec*multRecip
    let microCStr = microChronos.toString().padStart(7,'0')
    let timeUpdate = new CustomEvent('timeupdate', {detail:{
        HC:microCStr[0],
        DC:microCStr[1],
        C:microCStr[2],
        dC:microCStr[3],
        cC:microCStr[4],
        mC:microCStr[5],
        miC:microCStr[6],
        miCFull: microCStr
    }})
    document.dispatchEvent(timeUpdate)
},1)
}
function stopMetricClock(){
    clearInterval(metricTimer)
}

function convertToMetric(hours = 0,minutes = 0,seconds = 0, millisec = 0){
    let totalmillisec = (hours*3600000)+(minutes*60000)+(seconds*1000)+millisec
    let microChronos = totalmillisec/precisionInterval
    let microCStr = microChronos.toString().padStart(8,'0')
    let index = microCStr.indexOf(".");
    let outPut = {
        KC:microCStr[index-8] ?? '0',
        HC:microCStr[index-7] ?? '0',
        DC:microCStr[index-6] ?? '0',
        C:microCStr[index-5] ?? '0',
        dC:microCStr[index-4] ?? '0',
        cC:microCStr[index-3] ?? '0',
        mC:microCStr[index-2] ?? '0',
        mic:microCStr[index-1] ?? '0',
        miCFull: microCStr
    }
    return outPut;
}
function convertToOld(chron){
    let millisec = chron*86400
    let hours = Math.floor(millisec/3600000)
    let hourl = hours*3600000
    let min = Math.floor((millisec-hourl)/60000)
    let minl = hourl + (min*60000)
    let sec = Math.floor((millisec-minl)/1000)
    let millisecl = millisec - (minl + sec*1000)
    let oldTime = {
        hours:String(hours).padStart(2,'0'),
        minutes: String(min).padStart(2,'0'),
        seconds: String(sec).padStart(2,'0'),
        millisec: String(millisecl).padStart(2,'0'),
        fullTime: millisec
    }
    return oldTime;
}
function getCurrentMetricTime(){
    let multRecip = 1/precisionInterval
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let millisec = now.getMilliseconds()
    let totalmillisec = (hours*3600000)+(minutes*60000)+(seconds*1000)+millisec
    let microChronos = totalmillisec*multRecip
    let microCStr = microChronos.toString().padStart(7,'0')
    let timeUpdate = {
        HC:microCStr[0],
        DC:microCStr[1],
        C:microCStr[2],
        dC:microCStr[3],
        cC:microCStr[4],
        mC:microCStr[5],
        miC:microCStr[6],
        miCFull: microCStr
    }
    return timeUpdate
}