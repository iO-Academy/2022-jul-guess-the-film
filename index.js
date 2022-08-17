let modal = document.getElementById("instructionsModal");
let btn = document.getElementById("instructionsModalBtn");
let span = document.getElementsByClassName("close")[0];
btn.addEventListener('click', () => {
  modal.style.display = "flex";
})
span.addEventListener('click', () => {
  modal.style.display = "none";
})
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
    createQuote(winningFilmObject)
    threeFilms.forEach(createTitleButtons)
  })
  .then(() => {
    let answer_buttons = document.querySelectorAll('.answerButton')
    answer_buttons.forEach((button) => {
      button.addEventListener('click', () => {
        enableButton(next_button)
        console.log('hello')
      })
    })
  })

const createTitleButtons = (oneFilm) => {
  let p_tag = document.querySelector('#quote')
  let button_tag = document.createElement('button')
  let button_text = document.createTextNode(oneFilm.title)
  button_tag.appendChild(button_text)
  document.querySelector('#btnContainer').appendChild(button_tag)
  button_tag.classList.add('answerButton')
  if(p_tag.textContent === oneFilm.quote) {
    button_tag.dataset.winner = true
  } else {
    button_tag.dataset.winner = false
  }
}
  
const createQuote = (winningFilmObject) => {
  let p_text = document.createTextNode(winningFilmObject.quote)
  document.querySelector('#quote').appendChild(p_text)
}

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
    return array;
}

let next_button = document.getElementById('next')

const disableButton = (button) => {
  button.disabled = true
  button.style.opacity = 0.4
}

const enableButton = (button) => {
  button.disabled = false
  button.style.opacity = 1
}

disableButton(next_button)