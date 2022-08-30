//Get phone data from api url link
const loadPhones = async(searchText,dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data,dataLimit);
}
//To show phone to ui with function with dynamic api
const displayPhones = (phones,dataLimit) => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.innerHTML = '';
    //display show all btn with 10 phones part start
    const showAll = document.getElementById('show-all');
    if(dataLimit && phones.length > 10){
        phones = phones.slice(0,10);
        showAll.classList.remove('d-none');
    }
    else{
        showAll.classList.add('d-none');
    }
    //display show all btn with 10 phones part end
    //display no phone found message show start
    const noPhone = document.getElementById('no-found-message');
    if(phones.length === 0){
        noPhone.classList.remove('d-none')
    }
    else{
        noPhone.classList.add('d-none');
    }
    //display no phone found message show start
    phones.forEach(phone => {
        console.log(phone)
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <a onclick="loadPhoneDetail('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</a>
            </div>
        </div>
    `;
    phonesContainer.appendChild(phoneDiv);
    })
    //stop spinner lodder start
    toggleSpinner(false);
    //stop spinner lodder start
}
//display phone by common function 
const processSearch = (dataLimit) => {
    //start spinner part satrt 
    toggleSpinner(true);
    //start spinner part end
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText,dataLimit);
}
// search phone by button with add event listner
document.getElementById('btn-search').addEventListener('click', function(){
    processSearch(10);
})
//search field work by enter key
document.getElementById('search-field').addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
        processSearch(10);  
    }
})
//function for loader spinner
const toggleSpinner = isLoading => {
    const spinner = document.getElementById('spinner');
    if(isLoading){
        spinner.classList.remove('d-none');
    }
    else{
        spinner.classList.add('d-none');
    }
}
//display all phone by show all button
document.getElementById('btn-showall').addEventListener('click', function(){
    processSearch();
})
//phone details with onclick handler
const loadPhoneDetail =async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetail(data.data);
}
const displayPhoneDetail = phone => {
    console.log(phone)
    const modalTitle = document.getElementById('phoneDetailModaLabel');
    modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
    <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No Release date found' }</p>
    <p>Main  Features : ${phone.mainFeatures ? phone.mainFeatures.storage: 'Main Features is not available now' }</p>
    `
}
loadPhones('a');