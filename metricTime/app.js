
startMetricClock()

let deciChronos = 0
document.addEventListener('timeupdate', (e)=>{
    localdC = e.detail.miCFull
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
    let time = e.detail.miCFull
    let timeDis = document.querySelector('.currentClock')
    timeDis.textContent = time.slice(0,3)+'c'
})
