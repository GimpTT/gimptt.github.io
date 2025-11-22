let titleBox = document.getElementById('title');
let artistBox = document.getElementById('artist');
let coverArt = document.querySelector('.coverArt');
let glow = document.querySelector('.glow');
let uploader = document.querySelector('#uploaded');
let paused = false
let endedHandled = false;
let songNum = 0
let fileUploaded = false
let middleBeaned = true;
function lengthcutter(item){
    let result
    if(item.length>20){
        result = item.slice(0, 20)+ '...';
    }else{
        result = item
    }
    return result;
}
function arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

async function play(song){
    const metaArray = await new Promise((resolve, reject) => {
        jsmediatags.read(song[1], {
            onSuccess: function(result) {
                titleBox.textContent = lengthcutter(result.tags.title);
                artistBox.textContent = lengthcutter(result.tags.artist);
                const picture = result.tags.picture;
                let imageUrl
                if (picture) {
                    const base64String = arrayBufferToBase64(picture.data);
                    imageUrl = `data:${picture.format};base64,${base64String}`;
                    coverArt.style.backgroundImage = `url(${imageUrl})`;
                    glow.style.backgroundImage = `url(${imageUrl})`;
                }else{
                    coverArt.style.backgroundImage = '';
                    glow.style.backgroundImage = ''
                }
                console.log(imageUrl)
                resolve([result.tags.title,result.tags.artist, imageUrl]);
            },
            onError: function(err) {
                console.error('Error reading tags:', err);
            }
        });
    });
    const audioPlayer = document.querySelector('#player');
    if (audioPlayer.src.startsWith('blob:')) {
        URL.revokeObjectURL(audioPlayer.src);
    };
    const blobUrl = URL.createObjectURL(song[1]);
    audioPlayer.pause(); // ← correct reference
    audioPlayer.src = blobUrl;
    console.log(metaArray)
    endedHandled = false
    if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: metaArray[0],
            artist: metaArray[1],
        });
    }
    if(!paused){
        audioPlayer.play();
    }
}

let mp3List = []
let middlebean = document.getElementById('midBean')
document.getElementById('fileInput').addEventListener('change',async function (event) {
    mp3List = []
   const zipFile = event.target.files[0];
   if (!zipFile){
    console.log("not Zip");
   } 
   try{
        const unzippedArray = await JSZip.loadAsync(zipFile);
        let numbQueue = 0;
        for(const [fileName, fileData] of Object.entries(unzippedArray.files)){
            if(!fileData.dir){
                const content = await fileData.async("blob")
                console.log(fileName, content)
                let quickList = [fileName, content, numbQueue, numbQueue]
                mp3List.push(quickList)
                numbQueue++
            }
        }
        console.log('Quick List',mp3List)
        middlebean.style.display = 'none';
        middleBeaned = false;
        uploader.style.backgroundColor = ''
        play(mp3List[0])
        fileUploaded = true
        songNum = 0
   } catch(err){
        console.log(err)
   }
});
uploader.addEventListener('click', () => {
    if(!middleBeaned){
        middlebean.style.display = 'flex'
        uploader.style.backgroundColor = '#ffffff'
        middlebean.classList.add('show'); // unhide immediately
        middlebean.offsetHeight;
        requestAnimationFrame(() => {
            middlebean.classList.add('active');
        }) // trigger animation next frame
        middleBeaned = true
    }else{
        middlebean.style.display = 'none';
        uploader.style.backgroundColor = ''
        middleBeaned = false

    }
})
