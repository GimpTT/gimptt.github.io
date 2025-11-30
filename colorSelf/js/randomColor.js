let color = randomColor()
let grid=new Map()
let bookMarks = []
let dataOBJ = {
    favColor:'#ffffff',
    hateColor: '#000000',
    colorsRanked: 0,
    averageRank: 0,
    rankSum: 0,
    colorsBookMarked: 0
}
let statMenuOpen = false
let bookMarkMenuOpen = false
let liked
let hated
function generateGridArray(){
    for(let z=0; z<101; z+=1){
        for(let x=-40; x<41; x+= 1){
            for(let y=-40; y<41; y+= 1){
                grid.set(`${z},${x},${y}`,0)
            }
        }
    }
}
generateGridArray()
console.log(grid)

function randomColor(){
    let light = Math.round(Math.random()*100)
    let a = (Math.round(Math.random()*(80)))-40
    let b = (Math.round(Math.random()*(80)))-40
    return [light,a,b]
}

function showColor(colorArray){
    let colorSplach = document.querySelector('.color')
    let colorName = oklabToHex(colorArray[0]/100, colorArray[1]/100, colorArray[2]/100)
    let colorNameElm = document.querySelector('.colorName')
    colorNameElm.textContent = colorName
    colorSplach.style.animation = 'slideOut 0.3s ease forwards'
    setTimeout(()=>{
        colorSplach.style.animation = 'slideIn 0.3s ease forwards'
        colorSplach.style.backgroundColor = `oklab(${colorArray[0]/100} ${colorArray[1]/100} ${colorArray[2]/100})`
    }, 300)
}

function determineDistance(pointArray1, pointArray2){
    let distance = Math.sqrt(
        (pointArray1[0] - pointArray2[0]) ** 2 +
        (pointArray1[1] - pointArray2[1]) ** 2 +
        (pointArray1[2] - pointArray2[2]) ** 2
    );
    return distance
}
let fav = ['',0]
function findFav(){
    let arr = [...grid.entries()];
    arr.sort((a, b) => b[1] - a[1]);
    let top15 = arr.slice(0, 15);
    console.log(arr[arr.length - 1])
    dataOBJ.hateColor= arr[arr.length - 1];
    dataOBJ.favColor = top15[0]
    let testArray = []
    for(let i=0; i<10; i++){
        testArray.push(randomColor())
    }
    let parsed15 =[]
    for(let i=0; i<top15.length; i++){
        parsedStr = top15[i][0].split(',')
        parsed15.push([Number(parsedStr[0]), Number(parsedStr[1]), Number(parsedStr[2])])
    }
    let bestColor = testSet(parsed15, testArray)
    showColor(bestColor)
    color=bestColor
}
function testSet(goodArray, testArray){
    let distanceArray = []
    for(let g=0; g<testArray.length; g++){
        let distance = 0
        for(let k=0; k<goodArray.length; k++){
            
            let distanceFromPref = determineDistance(testArray[g], goodArray[k])
            distance += distanceFromPref
        }
        let penalties = grid.get(`${testArray[g][0]},${testArray[g][1]},${testArray[g][2]}`)*-10
        if(penalties == undefined){
            penalties=0
        }
        distance+=penalties
        distanceArray.push(distance)
    }
    
    let smallest = Math.min(...distanceArray);
    let index = distanceArray.indexOf(smallest)
    return testArray[index]
}
console.log(grid.get(`0,-40,-40`))
function applyLiking(yIntercept, decay, reach, pointArray){
    for(let z=-reach; z<=reach; z++){
        for(let x=-reach; x<=reach; x++){
            for(let y=-reach; y<=reach; y++){
                let location = [
                    pointArray[0] + z,
                    pointArray[1] + x,
                    pointArray[2] + y
                ];
                let distance = ((z)**2 + (x)**2 + (y)**2) ** 0.5;3
                let liking = Math.round((yIntercept * decay ** distance) * 10) / 10;
                let getStr = `${location[0]},${location[1]},${location[2]}`

                let getcmd = grid.has(getStr)
                if(getcmd){
                    let value = grid.get(getStr)
                    if(value==undefined){
                        value=0
                    }
                    grid.set(getStr,liking+value)
                }

            }
        }
    }
}


showColor(color)

let btnGrid = document.querySelector('.ratingBar')
btnGrid.addEventListener('click', (e)=>{
    dataOBJ.colorsRanked++
    let target = e.target
    if(target.id === 'great'){
        applyLiking(20,0.9,30,color)
        console.log(grid.get(`${color[0]},${color[1]},${color[2]}`))
        dataOBJ.rankSum += 5
    }
    if(target.id === 'good'){
        applyLiking(10,0.9,20,color)
        console.log(grid.get(`${color[0]},${color[1]},${color[2]}`))
        dataOBJ.rankSum += 4
    }
    if(target.id === 'okay'){
        console.log(grid.get(`${color[0]},${color[1]},${color[2]}`))
        dataOBJ.rankSum += 3
    }
    if(target.id === 'bad'){
        applyLiking(-10,0.9,20,color)
        console.log(grid.get(`${color[0]},${color[1]},${color[2]}`))
        dataOBJ.rankSum += 2
    }
    if(target.id === 'ew'){
        applyLiking(-20,0.9,30,color)
        console.log(grid.get(`${color[0]},${color[1]},${color[2]}`))
        dataOBJ.rankSum += 1
    }
    findFav()
    calcAvg()
    let statMenu = document.querySelector('.statsMenu')
    if(statMenu.classList.contains('menuSlideIn')){
        statMenu.classList.add('menuSlideOut')
        statMenu.classList.remove('menuSlideIn')
        statMenu.innerHTML = ''
    }
                    
})


function oklabToHex(L, a, b) {
    let l_ = L + 0.3963377774 * a + 0.2158037573 * b;
    let m_ = L - 0.1055613458 * a - 0.0638541728 * b;
    let s_ = L - 0.0894841775 * a - 1.2914855480 * b;
    let l = l_ ** 3;
    let m = m_ ** 3;
    let s = s_ ** 3;
    let r =  4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
    let g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
    let b_ = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s;
    function toSrgb(x) {
        return x <= 0.0031308
            ? 12.92 * x
            : 1.055 * Math.pow(x, 1/2.4) - 0.055;
    }
    r = toSrgb(r);
    g = toSrgb(g);
    b_ = toSrgb(b_);
    function toHex(v) {
        v = Math.round(Math.min(Math.max(v, 0), 1) * 255);
        return v.toString(16).padStart(2, "0");
    }
    return `#${toHex(r)}${toHex(g)}${toHex(b_)}`;
}
let bookMarksMenuIcon = document.querySelector('.bookMarksMenuIcon')
bookMarksMenuIcon.addEventListener('click', ()=>{
    let bookMarkMenu = document.querySelector('.bookMarkMenu')
    
    if(bookMarkMenu.classList.contains('menuSlideIn')){
        bookMarkMenu.classList.add('menuSlideOut')
        bookMarkMenu.classList.remove('menuSlideIn')
        bookMarkMenu.innerHTML = ''
        bookMarkMenuOpen = false
    }else{
        bookMarkMenuOpen = true
        if(statMenuOpen == true){
            let statMenu = document.querySelector('.statsMenu')
            statMenu.classList.add('menuSlideOut')
            statMenu.classList.remove('menuSlideIn')
            statMenu.innerHTML = ''
            statMenuOpen = false
        }
        for(let i = 0; i<bookMarks.length; i++){
            let renderingBookMark = document.createElement('div')
            renderingBookMark.innerHTML = `<div class="bookMarkHolder">
            <div class="colorPreviw" style="background-color:${bookMarks[i]};"></div>
            <p class="bookMarkName">${bookMarks[i]}</p>
            <div class="optionHolders">
                <div class="copyColor"></div>
                <div class="removeBookmark"></div>
            </div>
            </div>`
            bookMarkMenu.prepend(renderingBookMark)
        }
        let allBookMarksStored = document.querySelectorAll('.bookMarkHolder')
        for(let i=0; i<allBookMarksStored.length; i++){
        allBookMarksStored[i].addEventListener('click', (e)=>{
            let elm = e.target
            if(elm.classList.contains('copyColor')){
                let parent = allBookMarksStored[i].parentElement
                let colorElm = parent.querySelector('.bookMarkName')
                let color = colorElm.textContent
                console.log(color)
                navigator.clipboard.writeText(color)
                makeToast('Color Copied', '#202020ff')
            }
            if(elm.classList.contains('removeBookmark')){
                let parent = allBookMarksStored[i].parentElement
                let colorElm = parent.querySelector('.bookMarkName')
                let color = colorElm.textContent
                let index = bookMarks.indexOf(color);
                if (index !== -1) bookMarks.splice(index, 1);
                parent.remove()
                makeToast('Bookmark Removed', '#202020ff')
            }
        })
        }
        
        bookMarkMenu.classList.add('menuSlideIn')
        bookMarkMenu.classList.remove('menuSlideOut')
    }
})
let bookMarkBtn = document.querySelector('.bookMark')
bookMarkBtn.addEventListener('click', ()=>{
    let color = document.querySelector('.colorName').textContent
    let index = bookMarks.indexOf(color)
    if(index === -1){
        bookMarks.push(color)
        makeToast('Saved', '#202020ff')
        let bookMarkMenu = document.querySelector('.bookMarkMenu')
        if(bookMarkMenu.classList.contains('menuSlideIn')){
            bookMarkMenu.classList.add('menuSlideOut')
            bookMarkMenu.classList.remove('menuSlideIn')
            bookMarkMenu.innerHTML = ''
        }
        dataOBJ.colorsBookMarked += 1
    }else{
        makeToast('Already Saved', '#202020ff')
    }
    

})

let transParentLayer = document.querySelector('.transFullLayer')
transParentLayer.addEventListener('click', ()=>{
    if(transParentLayer.style.opacity == 0){
        transParentLayer.style.opacity = '1'
    }else{
        transParentLayer.style.opacity = 0
    }
})


let timeOut = ''
function makeToast(message,color){
    let toast = document.querySelector('.toast')
    toast.textContent = message
    toast.style.backgroundColor = color
    toast.style.opacity = '1'
    clearTimeout(timeOut)
    timeOut = setTimeout(()=>{
        toast.style.opacity = '0'
    },1500)
}

let statMenuIcon = document.querySelector('.statsMenuIcon')
statMenuIcon.addEventListener('click', ()=>{
    let statMenu = document.querySelector('.statsMenu')
    if(statMenu.classList.contains('menuSlideIn')){
        statMenu.classList.add('menuSlideOut')
        statMenu.classList.remove('menuSlideIn')
        statMenu.innerHTML = ''
        statMenuOpen = false
    }else{
        if(bookMarkMenuOpen == true){
            let bookMarkMenu = document.querySelector('.bookMarkMenu')
            bookMarkMenu.classList.add('menuSlideOut')
            bookMarkMenu.classList.remove('menuSlideIn')
            bookMarkMenu.innerHTML = ''
            bookMarkMenuOpen = false
        }
        statMenuOpen = true
        statMenu.classList.remove('menuSlideOut')
        statMenu.classList.add('menuSlideIn')
        let newDiv = document.createElement('div')
        console.log(dataOBJ.favColor)
        console.log(dataOBJ.hateColor)
        let favColorArray = dataOBJ.favColor[0].split(',')
        let hateColorArray = dataOBJ.hateColor[0].split(',')
        console.log(favColorArray, hateColorArray)
        let favColor = oklabToHex(Number(favColorArray[0])/100,Number(favColorArray[1])/100,Number(favColorArray[2])/100)
        let leastFavColor = oklabToHex(Number(hateColorArray[0])/100,Number(hateColorArray[1])/100,Number(hateColorArray[2])/100)
        newDiv.innerHTML = `
        <p class="header">Favorite Color</p>
        <div class="statHolder">
            <div class="colorPreviw" style="background-color:${favColor};"></div>
            <p class="bookMarkName">${favColor}</p>
            <div class="optionHolders">
                <div class="copyColor"></div>
            </div>
        </div>
        <p class="header">Least Favorite Color</p>
        <div class="statHolder">
            <div class="colorPreviw" style="background-color:${leastFavColor};"></div>
            <p class="bookMarkName">${leastFavColor}</p>
            <div class="optionHolders">
                <div class="copyColor"></div>
            </div>
        </div>
        <p class="header">Other Stats</p>
        <div class="statHolder">
            <p class="bookMarkName" style="margin-left: 5px;">#Ranked: ${dataOBJ.colorsRanked}</p>
        </div>
        <div class="statHolder">
            <p class="bookMarkName" style="margin-left: 5px;">AVG Rank: ${dataOBJ.averageRank}</p>
        </div>
        <div class="statHolder">
            <p class="bookMarkName" style="margin-left: 5px;">Book Marks: ${dataOBJ.colorsBookMarked}</p>
        </div>`
        statMenu.prepend(newDiv)
        let allStatsCopies = document.querySelectorAll('.statHolder')
        for(let i=0; i<allStatsCopies.length; i++){
            allStatsCopies[i].addEventListener('click', (e)=>{
                let elm = e.target
                if(elm.classList.contains('copyColor')){
                    let parent = elm.parentElement.parentElement
                    let colorElm = parent.querySelector('.bookMarkName')
                    let color = colorElm.textContent
                    console.log(color)
                    navigator.clipboard.writeText(color)
                    makeToast('Color Copied', '#202020ff')
                }
            })
        }
        
    }
})
function calcAvg(){
    dataOBJ.averageRank = Math.round((dataOBJ.rankSum/dataOBJ.colorsRanked)*10)/10
}