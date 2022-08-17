// Modal functionality
let modal = document.getElementById("instructionsModal");
let btn = document.getElementById("instructionsModalBtn");
let span = document.getElementsByClassName("close")[0];
// When the user clicks on the button, open the modal
btn.addEventListener('click', () => {
  modal.style.display = "flex";
})
// When the user clicks on <span> (x), close the modal
span.addEventListener('click', () => {
  modal.style.display = "none";
})
// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
  }
})

fetch('quotes.json')
    .then((data) => {
        return data.json()
    })

    .then((apiResponse) => {
      shuffleArray(apiResponse.films)
      let threeFilms = apiResponse.films.slice(0, 3)
      let winningFilmObject = threeFilms[0]
      shuffleArray(threeFilms)
      let p_text = document.createTextNode(winningFilmObject.quote)
      document.querySelector('#quote').appendChild(p_text)
      let p_tag = document.querySelector('#quote')
      threeFilms.forEach((oneFilm) => {
           let button_tag = document.createElement('button')
           let button_text = document.createTextNode(oneFilm.title)
           button_tag.appendChild(button_text)
           document.querySelector('#btnContainer').appendChild(button_tag)
           if(p_tag.textContent === oneFilm.quote) {
            button_tag.dataset.winner = true
        } else {
            button_tag.dataset.winner = false
        }
    })
})

const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }

    return array;
  }