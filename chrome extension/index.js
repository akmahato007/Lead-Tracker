const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")

const tabBtn = document.getElementById("tab-btn")

//creating two variables
let myLeads = []
const inputEl = document.getElementById("input-el")


// localStorage.setItem("myLeads", "www.google.com")
// let leads =  localStorage.getItem("myLeads") 
// console.log(leads)
// localStorage.clear()

const leadsfromLocalStorage =  JSON.parse ( localStorage.getItem("myLeads") )
// console.log(leadsfromLocalStorage)

if(leadsfromLocalStorage) {
    myLeads = leadsfromLocalStorage
    renderLead(myLeads)
}

inputBtn.addEventListener("click" , function(){
    //push new value to myLeads array from input field
    inputEl.textContent = myLeads.push(inputEl.value)
    inputEl.value =""
    renderLead(myLeads)
    
    //myLeads to LocalStorage
    localStorage.setItem("myLeads" , JSON.stringify(myLeads))
    //verify that it works
    // console.log( localStorage.getItem("myLeads"))

})

tabBtn.addEventListener("click" , function() {
    chrome.tabs.query({active:true ,currentWindow : true}, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads" , JSON.stringify (myLeads))
        renderLead(myLeads)
    })
})

deleteBtn.addEventListener("dblclick", function(){
    console.log("double click")
    localStorage.clear()
    myLeads = []
    renderLead(myLeads)
})


function renderLead(leads){
    //count the leads in the myLeads array
    let listItems =""
    for(let i= 0; i <leads.length ; i++){
        // console.log(myLeads[i])  
        //creating html elements using JS
        // listItems += "<li><a target='_blank' href='myLeads[i]'>" + myLeads[i] + "</a></li>" 
        
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
        //create var listItems
        // assign to empty string
        //listItems in ulEl element
    }

    //DOM manipulation comes with a cost, hence doing it outside
    ulEl.innerHTML = listItems

}



