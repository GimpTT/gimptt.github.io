
//Checks Connection With server
console.log('jsLoaded')
fetch('http://127.0.0.1:3000/')// --To Replace
    .then(response => response.text())
    .then(data => {
        console.log(data)
    })

//This converts url to blob most likly unessary but I don't want to touch it
async function toDataURL(url) {
  const res = await fetch(url);
  const blob = await res.blob();
  return await new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

//Declaring Global Vars
const today = new Date();
const lastMonthDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
const monthName = lastMonthDate.toLocaleString('default', { month: 'long' });
const params = new URLSearchParams(window.location.search);
const accessToken = params.get('accessToken');
//This Cuts down Strings to size
function truncateString(str, maxLength = 17) {
  return str.length > maxLength ? str.slice(0, maxLength) + '...' : str;
}
let artistsList = []
let artistsImg = []
let tracksList = []
let tracksImg = []
//This gets the top 5 artists from spotify
async function getArtists(){
    const res = await fetch('https://api.spotify.com/v1/me/top/artists?limit=5&time_range=short_term', {
    headers: {
        'Authorization': `Bearer ${accessToken}`
    }
    })
    const data = await res.json()
    console.log(data)
    for(let i = 0; i<data.items.length; i++){
        artistsList.push(data.items[i].name)
        artistsImg.push(await toDataURL(data.items[i].images[1].url))
    }
}

//This gets the top 5 songs from Spotify
async function getSongs() {
    const res = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=5&time_range=short_term', {
    headers: {
        'Authorization': `Bearer ${accessToken}`
    }
    })
    const data = await res.json()
    console.log(data)
    for(let i = 0; i<data.items.length; i++){
        tracksList.push(data.items[i].name)
        tracksImg.push(await toDataURL(data.items[i].album.images[0].url))
    }
}


//This remakes and makes the stats card whenever a parm is editied
const container = document.getElementById('StatsCard')
function cardMake(BgType, BgObject, fontColor){
    container.innerHTML = ''
    if(BgType == 'linear'){
        let angle = BgObject.angle
        let color1 = BgObject.color1
        let color2 = BgObject.color2
        console.log('making BG')
        container.style.background = `linear-gradient(${angle}deg, ${color1}, ${color2})`;
    }else if(BgType == 'radial'){
        let color1 = BgObject.color1
        let color2 = BgObject.color2
        container.style.background = `radial-gradient(${color1},${color2})`
    }else if(BgType == 'conical'){
        let angle = BgObject.angle
        let color1 = BgObject.color1
        let color2 = BgObject.color2
        container.style.background = `conic-gradient( from ${angle}deg, ${color1}, ${color2})`
    }else{
        let color = BgObject.color1
        container.style.background = color
    }
    let parent= document.querySelector('#StatsCard');
    header=`<div class="fullFlex" id="header" style="margin-top:0;">${monthName} Recap</div>`
    parent.insertAdjacentHTML('beforeend', header);
    let heads = parent.querySelector('#header');
    heads.style.color = fontColor;
    heads.style.fontSize = '40px'
    artistsHtml = `
    <div id="artists">
        <div class="rowFlex" style="font-size: 30px; justify-content:center; margin:0;"><div>Top Artists</div></div>
            <div class="item2" style="top:110px; left:50px; background-image: url(${artistsImg[0]});">
                <div class="rank2">${1}</div>
                <div class="textHolder2">
                    <h6 class="detail2">${truncateString(artistsList[0])}</h6>
                </div>
            </div>
            <div class="item2" style="top:110px; right:50px; background-image: url(${artistsImg[1]});">
                <div class="rank2">${2}</div>
                <div class="textHolder2">
                    <h6 class="detail2">${truncateString(artistsList[1])}</h6>
                </div>
            </div>
            <div class="item2" style="top:220px; right:125px; background-image: url(${artistsImg[2]});">
                <div class="rank2">${3}</div>
                <div class="textHolder2">
                    <h6 class="detail2">${truncateString(artistsList[2])}</h6>
                </div>
            </div>
    </div>`
    parent.insertAdjacentHTML('beforeend', artistsHtml);
    parent.insertAdjacentHTML('beforeend', '<div class="divider"></div>')
    heads = parent.querySelector('#artists');
    heads.style.color = fontColor;
    songsHtml = `
        <div id="songs">
        <div class="rowFlex" style="font-size: 30px; justify-content:center; margin-top:180px; margin-left:0;"><div>Top Songs</div></div>
            <div class="item2" style="bottom:120px; left:125px; background-image: url(${tracksImg[0]});">
                <div class="rank2">${1}</div>
                <div class="textHolder2">
                    <h6 class="detail2">${truncateString(tracksList[0])}</h6>
                </div>
            </div>
            <div class="item2" style="bottom:10px; left:50px; background-image: url(${tracksImg[1]});">
                <div class="rank2">${2}</div>
                <div class="textHolder2">
                    <h6 class="detail2">${truncateString(tracksList[1])}</h6>
                </div>
            </div>
            <div class="item2" style="bottom:10px; right:50px; background-image: url(${tracksImg[2]});">
                <div class="rank2">${3}</div>
                <div class="textHolder2">
                    <h6 class="detail2">${truncateString(tracksList[2])}</h6>
                </div>
            </div>
        </div>`
    parent.insertAdjacentHTML('beforeend', songsHtml);
    heads = parent.querySelector('#songs');
    heads.style.color = fontColor;
}
//This is what does the download DO NOT TOUCH very unstable
function download(){
    let parent = document.querySelector('#StatsCard')
    const style = {
        transform: `scale(${2})`,
        transformOrigin: 'top left',
        width: `${parent.offsetWidth}px`,
        height: `${parent.offsetHeight}px`,
        overflow: 'visible',
    };
    domtoimage.toPng(parent, {
        style: style,
        width: parent.offsetWidth * 2,
        height: parent.offsetHeight * 2 +10,
        bgcolor: '#ffffff00',

    
    }).then(function (dataUrl) {
    const aTag = document.createElement('a')
    aTag.href = dataUrl
    aTag.download = `${monthName} Recap.png`;
    document.body.appendChild(aTag);
    aTag.click();
    document.body.removeChild(aTag)
    })
    //.catch(function (error) {
    //    console.error('oops, something went wrong!', error);
    //});
}

//These are the vars that build a card
let BgObject = {
        angle: 90,
        color1: '#230a43ff',
        color2: '#d991fbff'
}
let currentBg = 'conical'
let currentfColor = '#ffffff'

//This orcastrates all of the first orders
async function getData() {
    await getArtists()
    await getSongs()
    BgObject = {
        angle: 90,
        color1: '#230a43ff',
        color2: '#d991fbff'
    }
    cardMake(currentBg, BgObject, currentfColor)
}
getData()
const radios = document.querySelectorAll('input[name="flexRadioDefault"]');

//This part is all for settings
radios.forEach(radio => {
    radio.addEventListener('change', ()=>{
        if(radio.checked) {
            currentBg = radio.id
            cardMake(currentBg, BgObject,currentfColor)

        }
    })
});
const angle = document.querySelector('#angle')
angle.addEventListener('input',()=>{
    if( +angle.value < 361){
        BgObject.angle = angle.value
        cardMake(currentBg,BgObject,currentfColor)
    }
})
const bgColor1 = document.querySelector('#bgColor1')
bgColor1.addEventListener('input', ()=>{
    BgObject.color1 = bgColor1.value
    console.log(BgObject.color1)
    cardMake(currentBg,BgObject,currentfColor)
})
const bgColor2 = document.querySelector('#bgColor2')
bgColor2.addEventListener('input', ()=>{
    BgObject.color2 = bgColor2.value
    cardMake(currentBg,BgObject,currentfColor)
    
})
const fontColor = document.querySelector('#fontColor')
fontColor.addEventListener('input', ()=>{
    currentfColor = fontColor.value
    cardMake(currentBg,BgObject,currentfColor)
})
  


//This controls settings panel toggle
let settingsBut = document.querySelector('.maskButton')
let settingPanel = document.querySelector('.settingsPannel')
settingsOpen = false
settingsBut.addEventListener('click', ()=>{
    if(settingsOpen){
        settingPanel.style.display = 'none'
        settingsOpen = false
    }else{
        settingPanel.style.display = 'flex'
        settingsOpen = true

    }
})
function goBack(){
    url = `index.html?access_token=${accessToken}`
    window.location.href = url;
}
