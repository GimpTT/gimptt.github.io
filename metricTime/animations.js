let menuBTN =document.querySelector('.menu')
menuBTN.addEventListener('click', ()=>{
    let menu = document.querySelector('.menuVis')
    menu.classList.toggle('open')
})

function textParser(element){
    textArray = element.textContent.split(' ')
    let newInnerHtml = ''
    for(let i=0; i<textArray.length; i++){
        let newElm = `<span>&nbsp;${textArray[i]}</span>`
        newInnerHtml += newElm
    }
    element.innerHTML = newInnerHtml
}


function animateFunLarge(element, delay){
    let elementArray = element.querySelectorAll('span')
    for(let i = 0; i<elementArray.length; i++){
        elementArray[i].style.animation = `fadeInUp 0.3s ease ${i*delay}s forwards`
    }
}
function animateFunSmall(element){
    element.style.animation = `fadeInUp 0.3s ease forwards`

}
textParser(document.querySelector('.pageTitle'))
animateFunLarge(document.querySelector('.pageTitle'), 0.3)

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateFunSmall(entry.target)
            observer.unobserve(entry.target); // stop observing if you want it to run only once
        }
    });
}, {threshold:0.2});


animateElms = document.querySelectorAll('.animateText')
console.log(animateElms)
for(let i=0; i<animateElms.length;i++){
    textParser(animateElms[i])
    let elements = animateElms[i].querySelectorAll('span')
    elements.forEach(el => {
        observer.observe(el);
    });
}
const fadeUpObserver = new IntersectionObserver((entries,observer)=>{
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.style.animation = `fadeInUp 0.3s ease forwards`;

            observer.unobserve(entry.target)
        }
    })
}, {threshold:0.2})
let tableRows = document.querySelectorAll('.fadeUpIn')
for(let i=0;i<tableRows.length;i++){
    fadeUpObserver.observe(tableRows[i])
}