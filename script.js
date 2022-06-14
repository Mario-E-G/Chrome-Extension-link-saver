let myleads = []
const saveBtnEl = document.querySelector("#save-btn-el")
const deleteBtnEl = document.querySelector("#delete-btn-el")
const inputEl = document.querySelector("#input-el")
const ulEl = document.querySelector("#ul-el")
const saveTabEl = document.querySelector("#save-tab-el")

const getLeadsFromLocalStorage = JSON.parse( localStorage.getItem("myleads") )

if(getLeadsFromLocalStorage){
    myleads = getLeadsFromLocalStorage
    render(myleads)
}
saveBtnEl.addEventListener("click", function(){
    if(myleads.includes(inputEl.value)){
        console.log("already there!!!!")
    }
    // else if (inputEl.value == 0 ){
    //     console.log("nothing is in here!!!!")
    // }
    else{
        myleads.push(inputEl.value)
        localStorage.setItem("myleads",JSON.stringify(myleads))
        render(myleads)
        inputEl.value = null
    }
})

function render(leads){
    let listItems = ""
    for(let i = 0; i < leads.length; i++){       
        listItems +=  
        `<li> 
            <a target='_blank' href=${leads[i]}>
            ${leads[i]}
            </a> 
        </li>`
    }
    ulEl.innerHTML = listItems
}
deleteBtnEl.addEventListener("dblclick", function deletelinks(){
    localStorage.clear()
    myleads = []
    render(myleads)
})
saveTabEl.addEventListener("click",function(){
    chrome.tabs.query({active:true, currentWindow: true}, function(tabs){
        myleads.push(tabs[0].url)
        localStorage.setItem("myleads",JSON.stringify(myleads))
        render(myleads)
    })

    if(myleads.includes(tabs[0].url)){
        console.log("already there!!!!") 
    }
    // else if (inputEl.value == 0 ){
    //     console.log("nothing is in here!!!!")
    // }
    else{
        myleads.push(tabs[0].url)
        localStorage.setItem("myleads",JSON.stringify(myleads))
        render(myleads)
    }
})