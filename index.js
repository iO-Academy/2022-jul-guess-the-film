let modal = document.getElementById("instructionsModal");
let btn = document.getElementById("instructionsModalBtn");
let span = document.getElementsByClassName("close")[0];
let buttonClicked = false
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
    checkAnswer()
  })

const createTitleButtons = (oneFilm) => {
  let p_tag = document.querySelector('#quote')
  let button_tag = document.createElement('button')
  let button_text = document.createTextNode(oneFilm.title)
  button_tag.appendChild(button_text)
  button_tag.classList.add('answerBtn')
  document.querySelector('#btnContainer').appendChild(button_tag)
  if(p_tag.textContent === oneFilm.quote) {
    button_tag.dataset.winner = true
  } else {
    button_tag.dataset.winner = false
  }
}

const checkAnswer = () => {
  let answerBtns = document.querySelectorAll('.answerBtn')
    answerBtns.forEach((answerBtn) => {
      console.log(answerBtn)
      answerBtn.addEventListener('click', (e) => {
        answerBtns.disabled = true
        if (answerBtn.dataset.winner === 'true' && !buttonClicked){
          answerBtn.style.backgroundColor = "#98d03b"
        } else if (answerBtn.dataset.winner === 'false' && !buttonClicked) {
          answerBtn.style.backgroundColor = "#d94536"
        } 
        buttonClicked = true
      })
    })
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