let headerList = []
let listHeads = []
let wikiDisplay = document.getElementById('wikiDisplay')
let panel = document.querySelector('.headerPanel')
sectionPanelOpen = false
let tooltip = document.querySelector('.summar')
tooltip.style.display = 'none'
function closePanel(){
    sectionPanelOpen = false
    panel.classList.remove('panelOpenClass')
    panel.classList.add('panelCloseClass')
    panel.style.display = 'none'
    panel.innerHTML = ''
}
let spotInlist = -1
let hoverTimer
let searcher = document.querySelector('#searchy')
let searchPanel = document.querySelector('.searchResults')
let back = document.querySelector('#back')
let forward = document.querySelector('#forward')
let imgPanel = document.querySelector('.imageViewer')

document.addEventListener('click', (event) => {
    if(!searchPanel.contains(event.target)){
        searchPanel.style.display = 'none'
        
    }
})

function getArticle(query){
tooltip.style.display = 'none'
console.log(headerList)
clearTimeout(hoverTimer)
console.log(query)
console.log(spotInlist)
fetch(`https://en.wikipedia.org/api/rest_v1/page/html/${query}`)
  .then(res => res.text())
  .then(html => {


    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const bodyContent = doc.body.innerHTML
    const headContent = doc.head.innerHTML;
    const styleSheets = doc.head.querySelectorAll('link[rel="stylesheet"]')
    let hero = document.querySelector('.hero')
    for(let i=0; i<styleSheets.length;i++){
        let link = styleSheets[i]
        let oldHref = link.href
        link.href = oldHref
        document.head.appendChild(link)
    }
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/style.css';
    document.head.appendChild(link)
    
    console.log(styleSheets)
    console.log(headContent)
    document.getElementById('wikiDisplay').innerHTML = bodyContent;
    let image = wikiDisplay.querySelectorAll('img')


    function tryIMG(i = 0){
        if (i>= image.length) return;
        console.log(image.src)
        let imgSRC = image[i].src
        let imgSRCWOUTThumb = imgSRC.replace('/thumb','');
        let lastSlash = imgSRCWOUTThumb.lastIndexOf('/');
        let fullImageUrl = imgSRCWOUTThumb.slice(0,lastSlash)
        console.log(fullImageUrl)
        

        const img = new Image();

        img.onload = () => {
            console.log('Image width:', img.naturalWidth);
            console.log('Image height:', img.naturalHeight);
            if(img.naturalHeight>1000 && img.naturalWidth>1000){
                console.log('good Image')
                hero.style.backgroundImage = `url(${fullImageUrl})`
                i = image.length
            }else{
                console.log('not Good')
                i++
                tryIMG(i+1)
            }
        };
        img.onerror = () => {
            console.log('bad image')
            tryIMG(i+1)
        }
        img.src = fullImageUrl
    }
    tryIMG()



    const container = document.querySelector('.glassishCont');
    let text = doc.head.querySelector('title').innerText;

    // Get computed font size instead of inline style
    let computedFontSize = window.getComputedStyle(container).fontSize;
    let fontSizeNum = parseFloat(computedFontSize); // Get just the number



    if (text.length > 12 && text.length < 20) {
        console.log('long')
        fontSizeNum = 60;
    } else if (text.length > 19 && text.length < 28) {
        console.log('longer')
        fontSizeNum = 40;
    } else if (text.length > 27) {
        console.log('longest')
        fontSizeNum = 20;
    }else{
        fontSizeNum = 100
    }



    let imgLinks = wikiDisplay.querySelectorAll('.mw-file-description')
    for(let i=0; i<imgLinks.length; i++){
        console.log(imgLinks[i].href)
        let hrefLink = imgLinks[i].href
        const index = hrefLink.lastIndexOf('/');
        const newHref = hrefLink.slice(index+1,hrefLink.length)
        let fullHref = `https://commons.wikimedia.org/wiki/${newHref}`
        console.log(fullHref)
        imgLinks[i].href = fullHref
        imgLinks[i].addEventListener('click', (event) => {
            event.preventDefault();
            let image = imgLinks[i].querySelector('img')
            let imgSRCWOUTThumb = image.src.replace('/thumb','');
            let lastSlash = imgSRCWOUTThumb.lastIndexOf('/');
            let fullImageUrl = imgSRCWOUTThumb.slice(0,lastSlash)
            console.log(fullImageUrl)
            html=`<img src="${fullImageUrl}" alt="" id="displayImage">`
            imgPanel.innerHTML = html
            imgPanel.style.display = 'flex'
            panel.classList.remove('panelCloseClass')
            panel.classList.add('panelOpenClass')
        })
    }
    // Clamp to minimum font size if necessary
    fontSizeNum = Math.max(fontSizeNum, 10);

    container.style.fontSize = `${fontSizeNum}px`;
    container.textContent = text;
    listHeads = []
    let sections = wikiDisplay.querySelectorAll('section')
    panel.innerHTML=''
    for(let i = 0; i<sections.length; i++){
        let name = ''
        let prename = sections[i].querySelector('h2')
        if(prename){
            name = prename.textContent
        }
        let id = sections[i].id
        console.log(name,id)
        if(i == 0){
            name = 'Top'
            id = 'top'
        }
        if(name){
            html=`<a href="#${id}" class="navTag" onclick="closePanel()">${name}</a>`
            listHeads.push(html)
        }
    }
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
  });
tooltip.style.display = 'none'
clearTimeout(hoverTimer)

}


let menuBtn = document.querySelector('.hambuberMenu');


menuBtn.addEventListener('click', ()=>{
    if(sectionPanelOpen){
        sectionPanelOpen = false
        panel.classList.remove('panelOpenClass')
        panel.classList.add('panelCloseClass')
        panel.style.display = 'none'
        panel.innerHTML = ''
        scrollbox.blur();

    }else{
        for(let i=0; i<listHeads.length; i++){
            panel.insertAdjacentHTML('beforeend', listHeads[i])
        }
        panel.style.display = 'flex'
        sectionPanelOpen = true
        panel.classList.remove('panelCloseClass')
        panel.classList.add('panelOpenClass')
    }
})
menuBtn.addEventListener('animationend', () => {
  if (menuBtn.classList.contains('panelCloseClass')) {
    menuBtn.style.display = 'none';
    panel.innerHTML = ''
    scrollbox.blur();
  }
});

wikiDisplay.addEventListener('click', (event) => {
    const link = event.target.closest('a')
    const title = event.target.title
    if(link && title){
        event.preventDefault();
        const hrefLink = event.target.href
        console.log(hrefLink)
        const index = hrefLink.lastIndexOf('/');
        const newHref = hrefLink.slice(index+1,hrefLink.length)
        spotInlist = spotInlist+1
        headerList.push(newHref)

        getArticle(newHref)
    } 

    console.log(newHref)
    
})
tooltip.style.display = 'none'

wikiDisplay.addEventListener('mouseover', (event) => {
    const link = event.target.closest('a')
    const title = event.target.title
    
    if(link && title){
        const hrefLink = event.target.href
        console.log(hrefLink)
        const index = hrefLink.lastIndexOf('/');
        const newHref = hrefLink.slice(index+1,hrefLink.length)
        hoverTimer = setTimeout(() => {
            console.log('Long hover detected!');
            fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${newHref}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data.extract);  // This is the summary text
                    console.log(data.thumbnail); // Image if available
                    let summary
                    if(data.extract.length>200){
                        summary = data.extract.slice(0,200) + '...'
                    }else{
                        summary = data.extract
                    }
                    let x = event.clientX;
                    let y = event.clientY;
                    if(x+300 > window.innerWidth){
                        let difference = (x+320) - window.innerWidth
                        x = x-difference
                    }
                    html=`<div class="summar" style="top:${y-220}px; left:${x}px;">${summary}</div>`
                    tooltip.textContent = summary
                    tooltip.style.top = `${y-220}px`
                    tooltip.style.left = `${x}px`
                    tooltip.style.display = 'block'
                    
                });
        }, 1000);
        event.target.addEventListener('mouseleave', (event) => {
            clearTimeout(hoverTimer)
            tooltip.style.display = 'none'
            
        })
    }
})

searcher.addEventListener('input', (event) => {
    fetch(`https://en.wikipedia.org/w/api.php?action=opensearch&search=${searcher.value}&limit=10&namespace=0&format=json&origin=*`)
    .then(res => res.json())
    .then(data =>{
        searchPanel.style.display = 'flex'
        console.log(data)
        searchPanel.innerHTML = '';
        for(let i=0; i<data[1].length; i++){
            console.log(data[1][i])
            let hrefLink = data[3][i]
            const index = hrefLink.lastIndexOf('/');
            const newHref = hrefLink.slice(index+1,hrefLink.length)
            html = `<button class="result" id="${newHref}">${data[1][i]}</button>`
            searchPanel.insertAdjacentHTML('beforeend', html)
        }
    })
})
searchPanel.addEventListener('click', (event) => {
    let clicked = event.target.id
    searchPanel.style.display = 'none'
    headerList.push(clicked)
    spotInlist = headerList.length - 1
    getArticle(clicked)
})
back.addEventListener('click', (event) => {
    console.log('initial',spotInlist)
    spotInlist = spotInlist-1
    if(spotInlist>= 0){
        console.log(spotInlist)
        console.log(headerList[spotInlist])
        getArticle(headerList[spotInlist])

    }else{
        spotInlist = spotInlist+1
    }
})
forward.addEventListener('click', (event) => {
    console.log(spotInlist)
    spotInlist = spotInlist+1
    console.log(spotInlist, headerList.length)
    if(spotInlist < headerList.length){
        console.log(spotInlist)
        console.log(headerList[spotInlist])
        getArticle(headerList[spotInlist])

    }else{
        spotInlist = spotInlist-1
    }
})

imgPanel.addEventListener('click', (event) => {
    if(event.target == event.currentTarget){
        imgPanel.style.display = 'none'
    }
})