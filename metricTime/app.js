
startMetricClock()

let deciChronos = 0
document.addEventListener('timeupdate', (e)=>{
    let p = e.detail
    localdC = p.HC + p.DC + p.C +p.dC + p.cC 
    if(deciChronos!==localdC){
        let timeSlots = document.querySelectorAll('.clockNum')
        let dcStr = localdC.toString()
        for(let i=0; i<timeSlots.length; i++){
            if(dcStr[i] !== timeSlots[i].textContent){
                timeSlots[i].classList.remove('fadeOut')
                timeSlots[i].classList.remove('fadeIn')

                timeSlots[i].classList.add('fadeOut')

                setTimeout(()=>{
                    timeSlots[i].classList.remove('fadeOut')
                    timeSlots[i].classList.add('fadeIn')
                    timeSlots[i].textContent = dcStr[i]
                },400)

            }
        }
        deciChronos=localdC
    }
})


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
//document.addEventListener('timeupdate', (e)=>{
  //  let time = e.detail
    //let timeDis = document.querySelector('.currentClock')
//    timeDis.textContent = time.HC+ time.DC+ time.C+'c'
//})
