let sName = document.getElementById('sName')
let sUrl = document.getElementById('sUrl')
let addBtn = document.getElementsByTagName('button')[0]

let siteBox = []
function urlValidation() {
    let regex = /^(www.)\w+.(com|net|org)$/
    return (regex.test(sUrl.value))
}

window.onload = function () {
    if (localStorage.length > 0) {
        siteBox =  JSON.parse(localStorage.getItem('siteInfo'))
        displaySite(siteBox)
    }
}
addBtn.onclick = addSite


function addSite() {
    if (urlValidation() == true) {
        let site  = {
            Name : sName.value,
            url : sUrl.value
        }
        siteBox.push(site)
        localStorage.siteInfo = JSON.stringify(siteBox)
        clearForm()
        displaySite(siteBox)  
    }else alert('Invalid URL ')
}

function clearForm() {
    sName.value = ''
    sUrl.value = ''
}

function displaySite(arr) {
    let container = ''
    for (let i = 0; i < arr.length; i++) {
        container += `<fieldset class="outPut d-flex justify-content-between align-items-center py-2 my-3 rounded-2">
        <h3 class="d-inline-block ms-5">${arr[i].Name}</h3> 
        <p class="my-auto">${arr[i].url}</p>
        <div class="d-inline-block">
            <button onclick='visitSite(${i})' class="mx-3 btn btn-outline-primary btn-sm">Visit</button>
            <button onclick='deleteSite(${i})'class="me-5 btn btn-outline-danger btn-sm">Delete</button>
        </div>
    </fieldset>`    
    }
    document.getElementsByClassName('getInfo')[0].innerHTML = container
}
function visitSite(x) {
    location.href = `https://${siteBox[x].url}`
}
function deleteSite(y) {
    siteBox.splice(y,1)
    localStorage.siteInfo = JSON.stringify(siteBox)
    displaySite(siteBox)
}
