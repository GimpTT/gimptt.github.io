let conversionMode='OtoM'
let numinputs = document.querySelectorAll('.timeConverter')
for(let i=0; i<numinputs.length; i++){
    numinputs[i].addEventListener("beforeinput", (e) => {
        let exit=false
        if (e.data && !/^[0-9]$/.test(e.data)) {
            e.preventDefault();
            exit=true
        }else if(e.target.value.length>0 && e.inputType === "deleteContentBackward"){
            exit = true
            e.target.value = ''
        }else if(e.target.value.length>0){
            e.preventDefault()
            e.target.value = e.data
        }
        
        if(!exit){
            if(e.target.dataset.type == 'old' && e.target.dataset.num != '6' && e.inputType != "deleteContentBackward"){
                let parent = document.querySelector('#oldTimeContainer')
                let num = Number(e.target.dataset.num)+1
                let nextDownLine = parent.querySelector(`[data-num="${num}"]`)
                nextDownLine.focus();
            }else if(e.target.dataset.type == 'old' && e.target.dataset.num != '1' && e.inputType === "deleteContentBackward"){
                let parent = document.querySelector('#oldTimeContainer')
                let num = Number(e.target.dataset.num)-1
                let nextDownLine = parent.querySelector(`[data-num="${num}"]`)
                nextDownLine.focus();
            }else if(e.target.dataset.type == 'metric' && e.target.dataset.num != '5' && e.inputType != "deleteContentBackward"){
                let parent = document.querySelector('#metricTimeContainer')
                let num = Number(e.target.dataset.num)+1
                let nextDownLine = parent.querySelector(`[data-num="${num}"]`)
                nextDownLine.focus();
            }else if(e.target.dataset.type == 'metric' && e.target.dataset.num != '1' && e.inputType === "deleteContentBackward"){
                let parent = document.querySelector('#metricTimeContainer')
                let num = Number(e.target.dataset.num)-1
                let nextDownLine = parent.querySelector(`[data-num="${num}"]`)
                nextDownLine.focus();
            }
        }
        
    numinputs[i].addEventListener('input', ()=>{
        let hour1 = document.querySelector('#hour1')
        let hour2 = document.querySelector('#hour2')
        let min1 = document.querySelector('#min1')
        let sec1 = document.querySelector('#sec1')
        console.log(hour1.value)
        console.log(hour2.value)
        if(Number(hour1.value)>2){
            hour1.value = 2
        }
        if(Number(hour2.value)>3 && Number(hour1.value)==2){
            hour2.value = 3
        }
        if(Number(min1.value)>5){
            min1.value=5
        }
        if(Number(sec1.value)>5){
            sec1.value=5
        }

        if(conversionMode==='OtoM' && numinputs[i].dataset.type=='old'){
            let oldTimes = document.querySelectorAll('[data-Type="old"]')
            let hours = (Number(oldTimes[0].value)*10) + Number(oldTimes[1].value)
            let min = (Number(oldTimes[2].value)*10) + Number(oldTimes[3].value)
            let sec = (Number(oldTimes[4].value)*10) + Number(oldTimes[5].value)
            let timeobj = convertToMetric(hours, min, sec)
            let metricTime = document.querySelectorAll('[data-Type="metric"]')
            metricTime[0].value = timeobj['HC']
            metricTime[1].value = timeobj['DC']
            metricTime[2].value = timeobj['C']
            metricTime[3].value = timeobj['dC']
            metricTime[4].value = timeobj['cC']

        }
        if(conversionMode==='MtoO' && numinputs[i].dataset.type=='metric'){
            let metricTime = document.querySelectorAll('[data-Type="metric"]')
            let metricStr = metricTime[0].value+metricTime[1].value+metricTime[2].value+'.'+metricTime[3].value+metricTime[4].value
            console.log(metricStr)
            let metricNum = Number(metricStr)
            console.log(convertToOld(metricNum))
            let oldTimeOBJ=convertToOld(metricNum)
            let oldTime = document.querySelectorAll('[data-Type="old"]')
            oldTime[0].value=oldTimeOBJ['hours'][0]
            oldTime[1].value=oldTimeOBJ['hours'][1]
            oldTime[2].value=oldTimeOBJ['minutes'][0]
            oldTime[3].value=oldTimeOBJ['minutes'][1]
            oldTime[4].value=oldTimeOBJ['seconds'][0]
            oldTime[5].value=oldTimeOBJ['seconds'][1]


        }
    })

});
}
let tooldBtn =document.querySelector('.centerBTNUp')
tooldBtn.addEventListener('click', ()=>{
    console.log('GOING TO OLD')
    conversionMode = 'MtoO'
     let metricTime = document.querySelectorAll('[data-Type="metric"]')
            let metricStr = metricTime[0].value+metricTime[1].value+metricTime[2].value+'.'+metricTime[3].value+metricTime[4].value
            console.log(metricStr)
            let metricNum = Number(metricStr)
            console.log(convertToOld(metricNum))
            let oldTimeOBJ=convertToOld(metricNum)
            let oldTime = document.querySelectorAll('[data-Type="old"]')
            oldTime[0].value=oldTimeOBJ['hours'][0]
            oldTime[1].value=oldTimeOBJ['hours'][1]
            oldTime[2].value=oldTimeOBJ['minutes'][0]
            oldTime[3].value=oldTimeOBJ['minutes'][1]
            oldTime[4].value=oldTimeOBJ['seconds'][0]
            oldTime[5].value=oldTimeOBJ['seconds'][1]
})
let tometricBtn = document.querySelector('.centerBTNDown')
tometricBtn.addEventListener('click', ()=>{
    console.log('GOING TO METRIC')
    conversionMode = 'OtoM'
    let oldTimes = document.querySelectorAll('[data-Type="old"]')
            let hours = (Number(oldTimes[0].value)*10) + Number(oldTimes[1].value)
            let min = (Number(oldTimes[2].value)*10) + Number(oldTimes[3].value)
            let sec = (Number(oldTimes[4].value)*10) + Number(oldTimes[5].value)
            let timeobj = convertToMetric(hours, min, sec)
            let metricTime = document.querySelectorAll('[data-Type="metric"]')
            metricTime[0].value = timeobj['HC']
            metricTime[1].value = timeobj['DC']
            metricTime[2].value = timeobj['C']
            metricTime[3].value = timeobj['dC']
            metricTime[4].value = timeobj['cC']
})