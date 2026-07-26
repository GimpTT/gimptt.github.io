let index = localStorage.getItem("index")
if(index !== null){
    let indexArr = JSON.parse(index)
    for(let i=0;i<indexArr.length; i++){
        let data = localStorage.getItem(indexArr[i])
        if(data !== null){
            data = JSON.parse(data)
            let terms = data.length
            let html = `
            <div class="setBTN" data-name="${indexArr[i]}">
                <div class="setName">${indexArr[i]}</div>
                <div class="setTerms">${terms}</div>
            </div>`
            let titleElm = document.querySelector('.title')
            titleElm.insertAdjacentHTML("afterend", html)
            let newBtn = document.querySelector(`[data-name="${indexArr[i]}"]`)
            newBtn.addEventListener('click', (e)=>{
                let id = e.currentTarget.dataset.name
                console.log(id)
                let baseURL = 'YosaLearn/selectMode.html' 
                let parms = new URL(baseURL,window.location.origin)
                parms.searchParams.append('name',id)
                parms.searchParams.append('comeingFrom', 'index')
                window.location.href = parms.href
            })
        }    
    }
}