// Get DOM Elements
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
const movieDesc1 = document.getElementById('movie-1');
const movieDesc2 = document.getElementById('movie-2');
const movieDesc3 = document.getElementById('movie-3');
const movieDesc4 = document.getElementById('movie-4');
const movieDesc5 = document.getElementById('movie-5');

populateUI();

let ticketPrice = +movieSelect.value;

function updateSelectedCount() {
    if (movieSelect.value !== "") {
    // Get all seats that are selected
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    // Get the index of selected seats from all seats
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    // Getting the count of total selected seats
    const selectedSeatsCount = selectedSeats.length;
    // Updating the UI to show number of selected seats
    count.innerText = selectedSeatsCount;
    // Updating the UI to show total price of tickets
    total.innerText = "$" + selectedSeatsCount * ticketPrice;
    // Saving to Local Storage
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))
    }
}

// Save the movie data to local storage
function setMovieData(movieIndex, moviePrice) {
    // Saving selected movie index to local storage
    localStorage.setItem('selectedMovieIndex', movieIndex);
    // Saving selected movie ticket price to local storage
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Get data from localstorage and populate UI
function populateUI() {
    // Get selected seats from local storage and convert from string to array
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    // check if selected seats is not null and not empty, and if true, then loop through all seats and mark matching seats with class selected
    if(selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected')
            }
        })
    };
    // Get the selected movie index from local storage
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    // Using the value from local storage, select the movie on page load
    if(selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

// Event Listeneres
// 1. Event listener for container to check for click on seats
container.addEventListener('click', e => {
    if (movieSelect.value !== "") {
    // Check if target of click is a seat that's not occupied
    if(e.target.classList.contains('seat') &&
        !e.target.classList.contains('occupied')
    ) {
        // Add or Remove class selected from seat
        e.target.classList.toggle('selected');
        // Refreshing counts
        updateSelectedCount();
    }
}
})

// 2. Event listener for movie select
movieSelect.addEventListener('change', e => {
    // Setting movie price and converting to number
    ticketPrice = +e.target.value;
    // Calling function to set data in local storage
    setMovieData(e.target.selectedIndex, e.target.value);
    // Updating counts
    updateSelectedCount();
})

// Initial count and total price
updateSelectedCount();

// Event listener and the function for showing the movie details based on the movie selection
movieSelect.addEventListener('change', function () {
    var style1 = this.value == 10 ? 'block' : 'none';
    var style2 = this.value == 15 ? 'block' : 'none';
    var style3 = this.value == 20 ? 'block' : 'none';
    var style4 = this.value == 12 ? 'block' : 'none';
    var style5 = this.value == 17 ? 'block' : 'none';
    var style6 = this.value == "" ? 'none' : 'block';
    movieDesc1.style.display = style1;
    movieDesc2.style.display = style2;
    movieDesc3.style.display = style3;
    movieDesc4.style.display = style4;
    movieDesc5.style.display = style5;
    document.getElementById('desc-container').style.display = style6;
});

// Function for resetting movie selection list on page refresh
onload = function Reset() {
    var dropDown = movieSelect;
    dropDown.selectedIndex = 0;
}

