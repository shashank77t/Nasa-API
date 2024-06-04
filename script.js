import YOUR_API_KEY from "./API_constant.js";

const searchForm = document.getElementById('search-form');
const container=document.querySelector(".container");
const date=document.getElementById("search-input");
const submit=document.querySelector("button");
const currentImageContainer=document.getElementById("current-image-container");


let url="https://api.nasa.gov/planetary/apod?";


searchForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const selectedDate = date.value;
    console.log(selectedDate+"submitform");
    getImageOfTheDay(selectedDate);
});

const currentDate = new Date().toISOString().split("T")[0];
console.log(currentDate);

 async function getCurrentImageOfTheDay(){
   const newurl=url+"date="+`${currentDate}`+"&api_key="+`${YOUR_API_KEY}`;
 await  fetch(newurl).then((res)=>res.json()).then((data)=>{
    console.log(data);
    displayTheImage(data);
    saveSearch(currentDate);
    addSearchToHistory();
   })
}
getCurrentImageOfTheDay();
function displayTheImage(data){
    
        container.classList.add("active");
    
    currentImageContainer.innerHTML=`
    <span class="title">${data.title}</span>
    
    <img src="${data.url}">
    <p>${data.explanation}</p>
    `;
}

function saveSearch(date) {
   
    let searches = JSON.parse(localStorage.getItem('searches')) || [];
    searches.push(date);
    localStorage.setItem('searches', JSON.stringify(searches));
}

function getImageOfTheDay(date) {
    console.log(date+" kjhsdkjfhak");
    const newurl1=url+"date="+`${date}`+"&api_key="+`${YOUR_API_KEY}`;
    fetch(newurl1)
    .then(response => {
        
        return response.json();
    })
    .then(data => {
        console.log(data);
        displayTheImage(data);
        saveSearch(date);
        addSearchToHistory();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}







function addSearchToHistory() {
    const searches = JSON.parse(localStorage.getItem('searches')) || [];
    const searchHistory = document.getElementById('search-history');
    searchHistory.innerHTML = '';
    searches.forEach(date => {
        const listItem = document.createElement('li');
        listItem.textContent = date;
        listItem.addEventListener('click', function() {
            getImageOfTheDay(date);
        });
        searchHistory.appendChild(listItem);
    });
}