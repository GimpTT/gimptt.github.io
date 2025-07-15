let searchToggle = document.querySelector('.bg');
let downloadLink = document.querySelector('.download')
let searchBar = document.querySelector('#search');
let searchInput = document.querySelector('#input');
let background = document.querySelector('.hero');
let creditBox = document.querySelector('.credit')
let forward = document.querySelector('.forward')
let back = document.querySelector('.back');
let searchBarVisible = true
let gsrOffset = 0
let imgNum = 0
let imgList = []
let typed = false
let query = ''

function loadImage(){
    console.log('IMAGELOAD ON')
    console.log(imgNum)
    if(imgNum>imgList.length - 1){
        gsrOffset = gsrOffset + 25;
        fetchImage(query)
        return
    }
    let data = imgList[imgNum]
    console.log(data[0])
    background.style.backgroundImage = `url(${data[0]})`
    creditBox.innerHTML = data[1]
    downloadLink.href = data[2]
}




async function fetchImage(query){
    let url = `https://commons.wikimedia.org/w/api.php?action=query&format=json&origin=*&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrlimit=25&gsroffset=${gsrOffset}&gsrnamespace=6&prop=imageinfo&iiprop=url|extmetadata`
    const res = await fetch(url);
    const data = await res.json();
    if(!data){
        return
    };
    const pages = Object.values(data.query.pages)
    for(const item of pages){
        const imageUrl = item['imageinfo'][0]['url']
        const sourceUrl = item['imageinfo'][0]['descriptionshorturl']
        const artist = item['imageinfo'][0]?.['extmetadata']?.['Artist']?.['value'] ?? 'Unknown Artist'
        const credit = item['imageinfo'][0]?.['extmetadata']?.['Credit']?.['value'] ?? 'Unknown Credit'
        const licenseName = item['imageinfo'][0]?.['extmetadata']?.['LicenseShortName']?.['value'] ?? 'Unknown License'
        const licenseUrl = item['imageinfo'][0]?.['extmetadata']?.['LicenseUrl']?.['value'] ?? 'No License Link'
        const creditHTML = `
            By ${artist} - ${credit}, 
            <a href="${licenseUrl}" title="Creative Commons ${licenseName}">${licenseName}</a>, 
            <a href="${sourceUrl}">Link</a>
            `;
        let prelist = [imageUrl, creditHTML, sourceUrl]
        imgList.push(prelist)
    }
    loadImage()
}
searchToggle.addEventListener('click', ()=>{
    console.log('clicked')
    if(!searchBarVisible){
        searchBar.style.display = 'flex';
        searchBarVisible = true
    }else{
        searchBar.style.display = 'none'; 
        searchBarVisible = false
    }
});

let searchBtn = document.querySelector('.searchBtn')
searchBtn.addEventListener('click', ()=>{
    query = searchInput.value
    if(query){
        console.log(query)
        gsrOffset = 0
        imgList = []
        imgNum = 0
        fetchImage(query)
    }
})
forward.addEventListener('click', ()=>{
    imgNum++
    loadImage()
});
back.addEventListener('click', ()=>{
    imgNum--
    loadImage()
});