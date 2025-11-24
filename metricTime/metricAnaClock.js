startMetricClock()

document.addEventListener('timeupdate', (e)=>{
    let time = e.detail
    let longHandDeg = (Number(time.HC+'.'+time.DC+time.C)/10)*360
    let longHandElm = document.querySelector('.longHand')
    longHandElm.style.transform = `translate(-50%, -50%) rotateZ(${longHandDeg+90}deg)`
})
document.addEventListener('timeupdate', (e)=>{
    let time = e.detail
    let medHandDeg = (Number(time.DC+'.'+time.C)/10)*360
    let medHandElm = document.querySelector('.medHand')
    medHandElm.style.transform = `translate(-50%, -50%) rotateZ(${medHandDeg+90}deg)`
})
document.addEventListener('timeupdate', (e)=>{
    let time = e.detail
    let shortHandDeg = (Number(time.C+'.'+time.dC+time.cC)/10)*360
    let shortHandElm = document.querySelector('.shortHand')
    shortHandElm.style.transform = `translate(-50%, -50%) rotateZ(${shortHandDeg+90}deg)`
})