let flashCardBtn = document.querySelector('#flash')
flashCardBtn.addEventListener('click', ()=>{
    const params = new URLSearchParams(window.location.search);
    let name = params.get('name')
    let baseURL = '/flashCardSettings.html' 
    let parms = new URL(baseURL,window.location.origin)
    parms.searchParams.append('name',name)
    window.location.href = parms.href
})
let learnBtn = document.querySelector('#learn')
learnBtn.addEventListener('click', ()=>{
    const params = new URLSearchParams(window.location.search);
    let name = params.get('name')
    let baseURL = '/learnSettings.html' 
    let parms = new URL(baseURL,window.location.origin)
    parms.searchParams.append('name',name)
    window.location.href = parms.href
})
let backBtn = document.querySelector('.backBTN')
backBtn.addEventListener('click', ()=>{
    const params = new URLSearchParams(window.location.search);
    let coming = params.get('comeingFrom')
    console.log(coming)
    let name = params.get('name')
    let baseURL = `/${coming}.html`
    let parms = new URL(baseURL,window.location.origin)
    parms.searchParams.append('name',name)
    window.location.href = parms.href

})