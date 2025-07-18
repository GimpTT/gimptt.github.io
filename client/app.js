
//This checks that the server is chill with us
console.log('jsLoaded')
fetch('https://gimp-fm-serverside.onrender.com') //--To Replace
    .then(response => response.text())
    .then(data => {
        console.log(data)
    })

// This Cuts the names down
function truncateString(str, maxLength = 17) {
  return str.length > maxLength ? str.slice(0, maxLength) + '...' : str;
}
//Declaring global Vars

let listOfTrackpops = []
let listOFArtistId = []
const params = new URLSearchParams(window.location.search);
const accessToken = params.get('access_token');
let background = document.querySelector('.backgroundBox')
let artistsList = []

//This fetches the requested data and displays it
async function fetchAndApply(amount, time, type){
    let verify = type
    let artistsList = []

    if(accessToken){
        console.log('the dark side of the moon has sent the key')
        const res = await fetch(`https://api.spotify.com/v1/me/top/${verify}?limit=${amount}&time_range=${time}`, {
    headers: {
        'Authorization': `Bearer ${accessToken}`
    }
    })
    const data = await res.json();
    try{
        if (!data.items) {
            console.error('Spotify API did not return items:', data);
            background.innerHTML=`<h3 style="color:#ffffff;">Error Fetching Data Try Re-logging in</h3>`
            return;
        }
        background.innerHTML = ''
        let realData = data.items
        let songName
        if(verify == 'tracks'){
           for(let i = 0; i<realData.length; i++){
                let artistsList = []
                songName = realData[i].name
                artistsList.push(realData[i].artists[0].name)
                let imageURL

                imageURL = realData[i].album.images[1]['url']
                let html = `
                <div class="item">
                    <img src="${imageURL}" alt="" class="imgBack" loading="lazy">
                    <div class="rank">${i+1}</div>
                    <div class="textHolder">
                        <h6 class="detail">${truncateString(songName)}</h6>
                        <h6 class="detail">${truncateString(artistsList[0])}</h6>
                    </div>
                </div>`
                let newElm = document.createElement('div');
                newElm.innerHTML = html
                background.appendChild(newElm.firstElementChild);
        }
        }else{
            console.log('Artists')
            for(let i=0; i<realData.length; i++){
                let name = realData[i].name
                let image = realData[i].images[1]['url']
                let html = `
                <div class="item" >
                    <img src="${image}" alt="" class="imgBack" loading="lazy">
                    <div class="rank">${i+1}</div>
                    <div class="textHolder">
                        <h6 class="detail">${truncateString(name)}</h6>
                    </div>
                </div>`
                let newElm = document.createElement('div');
                newElm.innerHTML = html
                background.appendChild(newElm.firstElementChild);
            }
        }
    }catch(err){
        console.error('Failed to fetch top tracks:', err);
        background.innerHTML=`<h3 style="color:#ffffff;">Error Fetching Data Try Re-logging in</h3>`
    };
    }
}
let trueSum
//Deadish code that calls the first request
async function typeFinder(){
    await fetchAndApply(50,'short_term', 'tracks')
}
typeFinder()

let getterBtn = document.querySelector('#get')

//This wires up the get btn
getterBtn.addEventListener('click', ()=>{
    let version = document.querySelector('#type');
    let time = document.querySelector('#time');
    let timePeriod
    if(time.textContent == '1 Month'){
        timePeriod = 'short_term'
    }
    if(time.textContent == '6 Months'){
        timePeriod = 'medium_term'
    }
    if(time.textContent == '12 Months'){
        timePeriod = 'long_term'
    }
    let doneVersion = version.textContent.toLowerCase()  
    fetchAndApply(50, timePeriod, doneVersion)
})


//This manages dropDowns
const dropdownButton = document.querySelectorAll('.dropdown-item')
for(let i = 0; i<dropdownButton.length; i++){
    dropdownButton[i].addEventListener('click',function(event){
        const elm = event.target
        const grandParent = elm.parentElement.parentElement.parentElement;
        let button = grandParent.querySelector('.dropdown-toggle');
        button.textContent = elm.textContent
    })
}

//This parses the url for the monthly part

let Monthlybtn = document.querySelector('.monthly')
Monthlybtn.addEventListener('click', ()=>{
    url = `monthlyRecap.html?accessToken=${accessToken}`
    window.location.href = url;
})
