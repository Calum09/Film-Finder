let filmNameRef = document.getElementById("film-name");
let searchButton = document.getElementById("search-button");
let result = document.getElementById("result");
let input = document.getElementById("film-name");
let apiKey = 24440972;

// function to fetch data from the film api

let getFilm = () => {
  let filmName = filmNameRef.value;
  let url = `https://www.omdbapi.com/?t=${filmName}&apikey=${apiKey}`;

  // If the input field is empty, do this
  if (filmName.length <= 0) {
    result.innerHTML = '<h3 class="msg">Please enter a movie name </h3>';
  } else {
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        // If the film exists
        if (data.Response == "True") {
          result.innerHTML = `<div class="info"> 
                <img src=${data.Poster} class="poster">
                <div>
                    <h2>${data.Title}</h2>
                    <div class="rating">
                        <h3>Rating:</h3>
                        <img src="rating-Icon.png">
                        <h4> ${data.imdbRating} </h4>
                </div>
                <div class="details">
                    <span> ${data.Rated} </span>
                    <span> ${data.Year} </span>
                    <span> ${data.Runtime} </span>
                </div>

                <div class="genre"> 
                    
                <div>${data.Genre.split(",").join("</div><div>")}</div>
                </div>
            </div>
        </div>
                <h3>Plot:</h3>
                <p>${data.Plot}<p>
                <h3>Cast:</h3>
                <p> ${data.Actors} </p>
                `;
        } else {
          result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
        }
      })

      // if any errors arise
      .catch(() => {
        result.innerHTML = `<h3 class"msg"> Error Occured </h3>`;
      });
  }
};

// Clear the input value after pressing the button
const Clearinput = () => {
  input.value = "";
};

// Adding an event listener to the search button

input.addEventListener("keydown", function (event) {
  // Check if the Enter key was pressed
  if (event.key === "Enter") {
    // Your action here
    getFilm();
    Clearinput();
  }
});

searchButton.addEventListener("click", function () {
  getFilm();
  Clearinput();
});
window.addEventListener("load", getFilm);
