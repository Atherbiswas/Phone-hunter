//Get phone data from api url link
const loadPhones = async(searchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data);
}
//To show phone to ui with function with dynamic api
const displayPhones = phones => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.innerHTML = '';
    //display 15 phones part start
    phones = phones.slice(0,15);
    //display 15 phones part end
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
            </div>
        </div>
    `;
    phonesContainer.appendChild(phoneDiv);
    })
    //stop spinner lodder start
    toggleSpinner(false);
    //stop spinner lodder start
}
// search phone by button with add event listner
document.getElementById('btn-search').addEventListener('click', function(){
    //start spinner part satrt 
    toggleSpinner(true);
    //start spinner part end
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText)
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
// loadPhones();