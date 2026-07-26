let container = document.querySelector('.mainContainer')
container.addEventListener('click', (e)=>{
    let elm = e.target
    console.log('clicked', elm.classList.contains('ans'))
    if(elm.classList.contains('ans') && !elm.classList.contains('toggledOn')){
        elm.style.backgroundColor = '#FFF9F9'
        elm.style.border = 'solid 1px #fff9f9'
        elm.classList.toggle('toggledOn')
    }else if(elm.classList.contains('ans') && elm.classList.contains('toggledOn')){
        elm.style.backgroundColor = '#1d1c1c'
        elm.style.border = 'solid 1px #868484'
        elm.classList.toggle('toggledOn')
    }
})

let contBTN = document.querySelector('.importQuizlet')
contBTN.addEventListener('click', ()=>{
    let allSettings = document.querySelectorAll('.ans')
    let ref = ''
    if(contBTN.id == 'flashCards'){
        ref='flashCards.html'
    }else{
        ref = 'learn.html'
    }
    let URLOBJ = new URL(ref,window.location.origin)
    for(let i=0; i<allSettings.length; i++){
        let state
        if(allSettings[i].classList.contains('toggledOn')){
            state = true
        }else{
            state = false
        }
        
        URLOBJ.searchParams.append(allSettings[i].id, state)
        console.log('paramAdded')
    }
    const params = new URLSearchParams(window.location.search);
    let name = params.get('name')
    URLOBJ.searchParams.append('name',name)
    window.location.href = URLOBJ.href

})
let backBtn = document.querySelector('.backBTN')
backBtn.addEventListener('click', ()=>{
    const params = new URLSearchParams(window.location.search);
    let name = params.get('name')
    let baseURL = `/selectMode.html`
    let parms = new URL(baseURL,window.location.origin)
    parms.searchParams.append('name',name)
    parms.searchParams.append('comeingFrom', 'index')
    window.location.href = parms.href
})