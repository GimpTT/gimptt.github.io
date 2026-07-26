let currentCard = 0
let cardState = 0
const params = new URLSearchParams(window.location.search);
let name = params.get('name')
let defFirst = params.get('defFirst')
let randomize = params.get('randomize')
let data = JSON.parse(localStorage.getItem(name))
console.log(data)
let orderedArr = []
if(randomize == 'false'){
    orderedArr=data
}else{
    orderedArr = shuffle(data)
}
if(defFirst === 'true'){
    cardState=1
}
setArrState()
displayCard()
updateProgressBar()
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
    let flashCardElm = document.querySelector('.flashCard')
    console.log(currentCard)
    console.log(defFirst)
    if(defFirst == 'true'){
        console.log('showingDef first')
        flashCardElm.textContent = defTermArr[1]
    }else{
        flashCardElm.textContent = defTermArr[0]
    }
}

let rightArr = document.querySelector('.arrRight')
rightArr.addEventListener('click', ()=>{
    if(currentCard+1<orderedArr.length){
        currentCard++
        displayCard()
        setArrState()
        updateProgressBar()
    }
})
let leftArr = document.querySelector('.arrLeft')
leftArr.addEventListener('click', ()=>{
    if(currentCard-1>-1){
        currentCard--
        displayCard()
        setArrState()
        updateProgressBar()
    }
})
function setArrState(){
    let rightArr = document.querySelector('.arrRight')
    let leftArr = document.querySelector('.arrLeft')

    if(currentCard+1===orderedArr.length){
        rightArr.style.backgroundColor = '#868484'
    }else{
        rightArr.style.backgroundColor = '#FFF9F9'
    }
    if(currentCard-1===-1){
        leftArr.style.backgroundColor = '#868484'
    }else{
        leftArr.style.backgroundColor = '#FFF9F9'
    }
}
let card = document.querySelector('.flashCard')
card.addEventListener('click', ()=>{
    flipCard()
})

function flipCard(){
    let card = document.querySelector('.flashCard')
    card.classList.toggle('.flipBack')
    console.log(cardState)
    if(cardState === 0){
        cardState=1
    }else{
        cardState=0
    }
    console.log(cardState)
    card.textContent = orderedArr[currentCard][cardState]
}
let backBtn = document.querySelector('.backBTN')
backBtn.addEventListener('click', ()=>{
    let baseURL = 'YosaLearn/flashCardSettings.html'
    let url = new URL(baseURL,window.location.origin)
    params.forEach((value, key) => {
        url.searchParams.set(key, value);
    });
    url.searchParams.append('comeingFrom', 'index')
    
    window.location.href = url.href
})
function updateProgressBar(){
    let percentFinished = (currentCard/(orderedArr.length-1))*100
    console.log(percentFinished, currentCard, orderedArr.length)
    let progressElm = document.querySelector('.pogressFillin')
    progressElm.style.width = `${percentFinished}%`
}