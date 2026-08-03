let currentCard = 0
let cardState = 0
let selectState = false
const params = new URLSearchParams(window.location.search);
let name = params.get('name')
let defANS = params.get('defANS')
let randomize = params.get('randomize')
let isWritten = params.get('writtenChoice')
let data = JSON.parse(localStorage.getItem(name))
console.log(data)
ansOBJ = {correct:0, worng:0}
data = [...data]

let orderedArr = []
if(randomize === 'false'){
    orderedArr=data
}else{
    orderedArr = shuffle(data)
}
let ansARR
if(defANS === 'false'){
    cardState=1
    ansARR = orderedArr.map(item => item[0])
}else{
    cardState=0
    ansARR = orderedArr.map(item => item[1])
}
if(isWritten == 'true'){
    let btns = document.querySelectorAll('.ans')
    btns.forEach((item, index)=>{
        item.style.display = 'none'
    })
    displayText()
}else{
    let textInput = document.querySelector('.textInputContainer')
    textInput.style.display = 'none'
    displayCard()
}
updateProgressBar()


//displayCard()
function shuffle(array) {
    console.log(array)
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function displayCard(){
    let defTermArr = orderedArr[currentCard]
    let flashCardElm = document.querySelector('.textHolder')
    let ansElms = document.querySelectorAll('.ans') 
    flashCardElm.textContent = defTermArr[cardState]
    console.log(ansARR)
    const randomNumber = Math.floor(Math.random() * 4);
    let yatesShuffle = shuffle(ansARR)
    let num = 0
    if(cardState == 0){
        num = 1
    }
    let index = yatesShuffle.indexOf(defTermArr[num])
    yatesShuffle.splice(index,1)

    console.log(ansElms.length, randomNumber, yatesShuffle)
    for(let i=0; i<ansElms.length; i++){
        if(randomNumber == i){
            ansElms[i].textContent = defTermArr[num] 
            ansElms[i].dataset.correct = 'true'
        }else{
            let ans = yatesShuffle[i]
            ansElms[i].textContent = ans
            ansElms[i].dataset.correct = 'false'
        }
    }
}
function displayText(){
    let defTermArr = orderedArr[currentCard]
    let flashCardElm = document.querySelector('.textHolder')
    flashCardElm.textContent = defTermArr[cardState]
}
let backBtn = document.querySelector('.backBTN')
backBtn.addEventListener('click', ()=>{
    let baseURL = 'YosaLearn/masterSettings.html'
    let url = new URL(baseURL,window.location.origin)
    params.forEach((value, key) => {
        url.searchParams.set(key, value);
    });
    url.searchParams.append('comeingFrom', 'index')
    
    window.location.href = url.href
})
let ansElms = document.querySelectorAll('.ans')
for(let i = 0; i<ansElms.length; i++){
    ansElms[i].addEventListener('click', (e)=>{
        if(!selectState){
        selectState = true
        let elm = e.currentTarget
        if(elm.dataset.correct == 'true'){
            ansOBJ.correct++
            console.log('correct', ansOBJ.correct, currentCard)
        }else{
            ansOBJ.worng++
            orderedArr.push(orderedArr[currentCard])
            console.log('pushing', orderedArr)
            ansARR.push(ansARR[currentCard])
        }
        let ansElms = document.querySelectorAll('.ans')
        for(let j=0; j<ansElms.length; j++){
            if(ansElms[j].dataset.correct == 'true'){
                ansElms[j].classList.add('correct')
            }else{
                ansElms[j].classList.add('wrong')
            }
        }
        let nextArrow = document.querySelector('.arrRight')
        nextArrow.classList.toggle('noVis')
        }
    })
}
let nextArrow = document.querySelector('.arrRight')
nextArrow.addEventListener('click', ()=>{
    selectState = false
    if(currentCard+1<orderedArr.length){
    nextArrow.classList.toggle('noVis')
    currentCard++
    if(isWritten != 'true'){
        displayCard()
    }else{
        displayText()
    }
    let ansElms = document.querySelectorAll('.ans')
    let textInput = document.querySelector('#textAns')
    let correctText = document.querySelector('.correctText')
    for(let i=0; i<ansElms.length; i++){
        ansElms[i].classList.remove('wrong')
        ansElms[i].classList.remove('correct')
        textInput.classList.remove('wrong')
        textInput.classList.remove('correct')
        textInput.value = ''
        correctText.style.display = 'none'
    }
    updateProgressBar()
    }else{
        let canEnd = true
        orderedArr.forEach((item,index)=>{
            if(item[1] != 0){
                canEnd = false
            }
        })
        gotoEnd()
        
    }

})


let endBTN = document.querySelector('.endBTN')
endBTN.addEventListener('click', ()=>{
    gotoEnd()
})

function updateProgressBar(){
    let sum = 0
    orderedArr.forEach((item, index)=>{
        sum = sum+item[1]
    })
    let percentFinished = (((currentCard)/(orderedArr.length))*100)
    console.log(percentFinished, ((data.length*3)-sum), (sum)*100)
    let progressElm = document.querySelector('.pogressFillin')
    progressElm.style.width = `${percentFinished}%`
}
function gotoEnd(){
    let baseURL = 'YosaLearn/results.html'
    let url = new URL(baseURL,window.location.origin)
    params.forEach((value, key) => {
        if(key != 'correct' && key != 'questAns'){
            url.searchParams.set(key, value);
        }
    });
    url.searchParams.append('comeingFrom', 'index')
    url.searchParams.append('questAns', currentCard+1)
    url.searchParams.append('correct', ansOBJ.correct)
    console.log(currentCard+1, ansOBJ.correct)
    window.location.href = url.href
}
let textInput = document.querySelector('#textAns')
textInput.addEventListener('input', ()=>{
    textInput.classList.remove('typed')
    void textInput.offsetWidth;
    textInput.classList.add('typed')
})

let form = document.querySelector('.textInputContainer')
form.addEventListener('submit', (e)=>{
    e.preventDefault()
    if(!selectState){
        selectState=true
    if(textInput.value.toLowerCase() == ansARR[currentCard].toLowerCase()){
        textInput.classList.add('correct')
        ansOBJ.correct++
        let nextArrow = document.querySelector('.arrRight')
        nextArrow.classList.toggle('noVis')

    }else{
        textInput.classList.add('wrong')
        let nextArrow = document.querySelector('.arrRight')
        nextArrow.classList.toggle('noVis')
        let correctAns = document.querySelector('.correctText')
        correctAns.textContent = ansARR[currentCard]
        correctAns.style.display = 'flex'
        orderedArr.push(orderedArr[currentCard])
        console.log('pushing', orderedArr)
        ansARR.push(ansARR[currentCard])

    }
    }
})
