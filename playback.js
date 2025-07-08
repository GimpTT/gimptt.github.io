const pause = document.querySelector('#pause');
const audio = document.getElementById('player');
const ffw = document.getElementById('ffw');
const fbw = document.getElementById('fbw');
const shuffle = document.getElementById('shuffle');
const loop = document.getElementById('loop')
const seek = document.getElementById('seek')
let shuffled = false
let looping = false
function updateSeek(){
    let value = seek.value;
    let min = seek.min;
    let max = seek.max;
    let percent = ((value-min) / (max - min)) * 100;
    const fill = "#b88bffcc"
    const empty = "#23232395"
    seek.style.background = `linear-gradient(to right, ${fill} 0%, ${fill} ${percent}%, ${empty} ${percent}%, ${empty} 100%)`;
}
updateSeek()
function nextPlay(num){
    if(num>mp3List.length){
        songNum = 0;
        num = 0;
    }
    if(num<0){
        num = mp3List.length-1
        songNum = num
    }
    console.log(num)
    play(mp3List[num])
}
function shuffler(array){
    for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]];   // swap elements
  }
  mp3List = array
  songNum = 0
  nextPlay(songNum)
}
function deshuffle(array){
    let deshuffledArray = array.slice().sort((a, b) => a[2] - b[2]);
    mp3List = deshuffledArray
    songNum = 0
    nextPlay(songNum)
}
pause.addEventListener('click',function(){
    if(paused){
        pause.style.maskImage = 'url("play.png")';
        pause.style.webkitMaskImage = 'url("play.png")';
        pause.style.backgroundColor = ""
        audio.play()
        paused = false
    }else{
        pause.style.maskImage = 'url("pause.png")';
        pause.style.webkitMaskImage = 'url("pause.png")';
        pause.style.backgroundColor = "#ffffff"
        audio.pause()
        paused = true
    }
});
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        event.preventDefault(); // optional: prevent page scroll
        if(paused){
            pause.style.maskImage = 'url("play.png")';
            pause.style.webkitMaskImage = 'url("play.png")';
            pause.style.backgroundColor = ""
            audio.play()
            paused = false
        }else{
            pause.style.maskImage = 'url("pause.png")';
            pause.style.webkitMaskImage = 'url("pause.png")';
            pause.style.backgroundColor = "#ffffff"
            audio.pause()
            paused = true
        }
    }
});
let duration
audio.addEventListener('loadedmetadata', function(){
    duration = audio.duration
    seek.max = duration
})
audio.addEventListener('timeupdate', ()=>{
    const currentTime = audio.currentTime;
    seek.value = currentTime
    updateSeek()
    if(currentTime == audio.duration){
        if(!looping){
            songNum++
        }
        nextPlay(songNum)
    }
})
seek.addEventListener('input', ()=>{
    const moved = seek.value;
    updateSeek()
    audio.currentTime = moved
})
ffw.addEventListener('click', () => {
    songNum++
    nextPlay(songNum)
});
fbw.addEventListener('click', () => {
    songNum = songNum-1
    nextPlay(songNum)
})
shuffle.addEventListener('click', () => {
    if(shuffled == false){
        shuffler(mp3List); 
        shuffled = true
        shuffle.style.backgroundColor = '#ffffff'
    }else{
        deshuffle(mp3List);
        shuffled = false
        shuffle.style.backgroundColor = ''
    }
})
loop.addEventListener('click', () => {
    if(looping){
        looping=false
        loop.style.backgroundColor = ''
    }else{
        looping=true
        loop.style.backgroundColor = '#ffffff'

    }
})
if('mediaSession' in navigator){
    navigator.mediaSession.setActionHandler('play', () => {
        pause.style.maskImage = 'url("play.png")';
        pause.style.webkitMaskImage = 'url("play.png")';
        audio.play()
        pause.style.backgroundColor = ''
        paused = false
    })
    navigator.mediaSession.setActionHandler('pause', () => {
        pause.style.maskImage = 'url("pause.png")';
        pause.style.webkitMaskImage = 'url("pause.png")';
        pause.style.backgroundColor = "#ffffff"
        audio.pause()
        paused = true
    })
    navigator.mediaSession.setActionHandler('previoustrack', () => {
        songNum = songNum-1
        nextPlay(songNum)
    })
    navigator.mediaSession.setActionHandler('nexttrack', () => {
        songNum = songNum+1
        nextPlay(songNum)
    })
}
