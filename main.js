const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.querySelector('#count');
const total = document.querySelector('#total');
const movie = document.querySelector('#movie');

populatUi();

let ticketPrice = +movie.value; //to integer
function updateSelectedCount() {
    const selectedList = document.querySelectorAll(".row .seat.selected");
    const selectedSeat = [...selectedList].map((seat) => [...seats].indexOf(seat));
    localStorage.setItem("SelectedSeat", JSON.stringify(selectedSeat));
    const listCount = selectedList.length;
    count.innerText = listCount;
    total.innerText = listCount * ticketPrice;

}

//save select movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem("SelectedMovieIndex", movieIndex);
    localStorage.setItem("SelectedMoviePrice", moviePrice);
}

movie.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
})



//get data from storage and populate UI
function populatUi() {
    let selectedSeat = JSON.parse(localStorage.getItem('SelectedSeat'));

    if (selectedSeat !== null && selectedSeat.length > 0) {
        seats.forEach(
            (seat, index) => {
                if (selectedSeat.indexOf(index) > -1) {
                    seat.classList.add('selected');
                }
            }
        )
    }
    const total = localStorage.getItem('SelectedMoviePrice');
    const movieIndex = localStorage.getItem('SelectedMovieIndex');
    if (movieIndex !== null) {
        movie.selectedIndex = movieIndex;
    }
}


//add functionality to container instead of every seat
container.addEventListener('click', (e) => {
        //this will give us the targer element that was clicked
        if (
            e.target.classList.contains("seat") &&
            !e.target.classList.contains("occupied")
        ) {
            console.log(e.target);
            e.target.classList.toggle('selected');
            console.log(e.target);
            updateSelectedCount();
        }
    })
    // initial update count and price
updateSelectedCount();