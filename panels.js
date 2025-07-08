let queue = document.getElementById('queue');
let info = document.getElementById('Info');
let panelParent = document.querySelector('#panel');
let queued = false
let infoed = false
let panelBusy = false;
function showPanel(){
    panelParent.classList.add('show'); // unhide immediately
    panelParent.offsetHeight;
    requestAnimationFrame(() => {
        panelParent.classList.add('active');
    }) // trigger animation next frame
}
function hidePanel() {
    panelParent.classList.remove('active'); // start fade/scale out
    panelParent.offsetHeight;
    setTimeout(() => {
        panelParent.classList.remove('show'); // hide after animation completes
    }, 1000); // matches transition duration
}
function metaFetch(song) {
  return new Promise((resolve, reject) => {
    jsmediatags.read(song[1], {
      onSuccess: function (result) {
        const title = lengthcutter(result.tags.title || 'Unknown Title');
        const artist = lengthcutter(result.tags.artist || 'Unknown Artist');
        const album = lengthcutter(result.tags.album || 'Unkown Album');
        const year = lengthcutter(result.tags.year || 'Unkown Year');
        const genre = lengthcutter(result.tags.genre || 'Unkown Genre');
        const picture = result.tags.picture;
        let srcable = '';

        if (picture) {
          const base64String = arrayBufferToBase64(picture.data);
          const imageUrl = `data:${picture.format};base64,${base64String}`;
          srcable = imageUrl;
        }

        resolve([title, artist, srcable, album, year, genre]);
      },
      onError: function (err) {
        console.error('Error reading tags:', err);
        reject(err);
      }
    });
  });
}



queue.addEventListener('click',async function (event) {
    
    let bottomBean = document.querySelector('.bottombean');
    if(queued){
        hidePanel()
        panelParent.innerHTML = ''
        queue.style.backgroundColor = ''
        bottomBean.style.display = 'block'
        queued = false
    }else{
        if (panelBusy) return;
        panelBusy = true;
        if(infoed){
            info.style.backgroundColor = ''
            infoed = false
        }
        bottomBean.style.display = 'none'
        panelParent.innerHTML = ''
        showPanel()
        for(let i = 0; i<mp3List.length; i++){
            let metaData =await metaFetch(mp3List[i])
            html=`
            <div class="song" id="${i}">
                <img class="albumArt" src="${metaData[2]}">
                <div class="nameHolder">
                    <h5 style="margin:0;">${metaData[0]}</h5>
                    <h5 style="margin:0;">${metaData[1]}</h5>
                </div>
            <div class="time"></div>
            </div>`
            let tempelm = document.createElement('div');
            tempelm.innerHTML = html
            const newElm = tempelm.firstElementChild;
            panelParent.appendChild(newElm);
            newElm.addEventListener('click', function(event){
                let id = event.currentTarget.id
                songNum = id
                nextPlay(songNum)
            })
        }
        queue.style.backgroundColor = '#ffffff'
        queued = true;
        panelBusy = false;
    }

})
info.addEventListener('click', async function (event) {
    let bottomBean = document.querySelector('.bottombean');
    if(infoed){
        hidePanel()
        panelParent.innerHTML = ''
        info.style.backgroundColor = ''
        bottomBean.style.display = 'block'
        infoed = false;
    }else{
        if (panelBusy) return;
        panelBusy = true;
        if(queued){
            queue.style.backgroundColor = ''
            queued = false
        }
        showPanel()
        bottomBean.style.display = 'none'
        panelParent.innerHTML = ''
        info.style.backgroundColor = '#ffffff'
        let song = mp3List[songNum]
        let metaDat = await metaFetch(song)
        console.log(metaDat)
        html=`
        <div>
            <h3>Name: ${metaDat[0]}</h3>
            <h3>Artist: ${metaDat[1]}</h3>
            <h3>Album: ${metaDat[3]}</h3>
            <h3>Year: ${metaDat[4]}</h3>
            <h3>Genre: ${metaDat[5]}</h3>
        </div>`
        

        let tempelm = document.createElement('div');
        tempelm.innerHTML = html;
        let newElm = tempelm.firstElementChild;
        panelParent.appendChild(newElm)
        infoed = true;
        panelBusy = false;
    }

})
