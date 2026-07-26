let nameInput = document.querySelector('#name')
nameInput.addEventListener('input',()=>{
    checkContinue()
})
let dataInput = document.querySelector('#data')
dataInput.addEventListener('input',()=>{
    checkContinue()
})

function checkContinue(){
    let nameInput = document.querySelector('#name')
    let dataInput = document.querySelector('#data')
    let continueBTN = document.querySelector('.importQuizlet')
    if(nameInput.value.length != 0 && dataInput.value.length != 0 && nameInput.value.length<35){
        let canParse = convertFormat(dataInput.value)
        if(canParse[0]){
            continueBTN.style.opacity = '1'
            return true
        }else{
            continueBTN.style.opacity = '0.5'
            return false
        }
    }else{
        continueBTN.style.opacity = '0.5'
        return false
    }

}

function convertFormat(text){
    const lines = text.split(/\r?\n/);
    console.log(lines)
    const items = lines.map(line => line.split(/\t+/))
    console.log(items)
    let succeed = true
    for(let i = 0;i<items.length; i++){
        if(items[i].length != 2){
            succeed = false
        }
    }
    return [succeed, items]
}

let continueBTN = document.querySelector('.importQuizlet')
continueBTN.addEventListener('click', ()=>{
    let dataInput = document.querySelector('#data')
    let nameInput = document.querySelector('#name')
    let data = convertFormat(dataInput.value)
    if(checkContinue && data[0]){
        console.log('canContinue')
        let index = localStorage.getItem('index')
        if(index === null){
            console.log('initating index')
            index = [nameInput.value]
            localStorage.setItem("index", JSON.stringify(index)) 
        }else{
            index = JSON.parse(index)
            index.push(nameInput.value)
            localStorage.setItem("index", JSON.stringify(index))
        }
        localStorage.setItem(nameInput.value,JSON.stringify(data[1]))

        console.log(localStorage.getItem('index'), localStorage.getItem(nameInput.value))
        let baseURL = 'selectMode.html' 
        let parms = new URL(baseURL,window.location.origin)
        parms.searchParams.append('name', nameInput.value)
        parms.searchParams.append('comeingFrom', 'quizlet')

        window.location.href = parms.href        
    }
})