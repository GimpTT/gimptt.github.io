const params = new URLSearchParams(window.location.search);
let correct = params.get('correct')
let questAns = params.get('questAns')

let ansed = document.querySelector('#ansed')
ansed.textContent = questAns

let acc = document.querySelector('#acc')
acc.textContent = `${Math.round((correct/questAns)*100)}%`


let restartBtn = document.querySelector('#restart')
restartBtn.addEventListener('click', ()=>{
    let baseURL = 'learn.html'
    let url = new URL(baseURL,window.location.origin)
    params.forEach((value, key) => {
        if(key != 'correct' && key != 'questAns'){
            url.searchParams.set(key, value);
        }
    });
    window.location.href = url.href
})
let homeBtn = document.querySelector('.backBTN')
homeBtn.addEventListener('click', ()=>{
    baseURL = 'index.html'
    let url = new URL(baseURL,window.location.origin)
    window.location.href = url.href
})