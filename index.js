const modal = document.getElementById("instructionsModal");
const btn = document.getElementById("instructionsModalBtn");
const span = document.getElementsByClassName("close")[0];
let buttonClicked = false
const next_button = document.getElementById('next')
let hint = document.querySelector('#hint')
let hintAnswer = document.querySelector('#hintAnswer')
let startBtn = document.querySelector('#startBtn')
let splashScreen = document.querySelector('.splash')
let score = 0
let guesses = 0
let counter = 30

const playGame = () => {
  fetch('quotes.json')
  .then((data) => {
  return data.json()
})
  .then((apiResponse) => {
    disableButton(next_button)
    shuffleArray(apiResponse.films)
    let threeFilms = apiResponse.films.slice(0, 3)
    let winningFilmObject = threeFilms[0]
    shuffleArray(threeFilms)
    removeLastMovies()
    createQuote(winningFilmObject)
    threeFilms.forEach(createTitleButtons)
    checkAnswer()
})
}

//start the game
startBtn.addEventListener('click', () => {
    splashScreen.style.display = 'none'
    document.querySelector('main').style.visibility = 'visible'
    playGame()
    score = 0
    guesses = 0
    counter = 30
    updateScore(score, guesses)
    const timer = setInterval(()=> {
      if(counter === 0) {
        splashScreen.style.display = 'block'
        document.querySelector('main').style.visibility = 'hidden'
        clearInterval(timer)
        playGame()
      } else {
          counter--
          document.querySelector('#timer').textContent = counter
      }
  }, 1000)
})

hint.addEventListener('click', () => {
  hintAnswer.style.display = 'block'
  disableButton(hint)
  })

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

next_button.addEventListener('click', () => {
    lastQuote = document.getElementById('quote').textContent
    hintAnswer.style.display = 'none'
    enableButton(hint)
    
    fetch('quotes.json')
    .then((data) => {
        return data.json()
    })
    .then((apiResponse) => {
        disableButton(next_button)
        shuffleArray(apiResponse.films)
        let threeFilms = apiResponse.films.slice(0, 3)
        let winningFilmObject = threeFilms[0]
        if(winningFilmObject.quote == lastQuote) {
            winningFilmObject = threeFilms[1]
        }
        shuffleArray(threeFilms)
        removeLastMovies()
        createQuote(winningFilmObject)
        threeFilms.forEach(createTitleButtons)
        checkAnswer()
    })
})

const removeLastMovies = () => {
  buttonClicked = false
  document.querySelector('#quote').innerHTML = ''
  hintAnswer.innerHTML = 'Release Year: '
  let buttons = document.querySelectorAll('.answerBtn')
    buttons.forEach((button) => {
      button.remove()
    })
}

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
    answerBtn.addEventListener('click', (e) => {
      answerBtns.disabled = true
      enableButton(next_button)
      if (answerBtn.dataset.winner === 'true' && !buttonClicked){
        answerBtn.style.backgroundColor = "#98d03b"
        score ++
        guesses ++
        updateScore(score, guesses)
        increment5(score)
      } else if (answerBtn.dataset.winner === 'false' && !buttonClicked) {
        answerBtn.style.backgroundColor = "#d94536"
        guesses ++
        updateScore(score, guesses)
      } 
      answerBtns.forEach((button) => {
        if(e.target != button) {
          disableButton(button)
        }
      })
        buttonClicked = true
      })
    })
}

const createQuote = (winningFilmObject) => {
  let p_text = document.createTextNode(winningFilmObject.quote)
  document.querySelector('#quote').appendChild(p_text)
  let hint_text = document.createTextNode(winningFilmObject.year)
  hintAnswer.appendChild(hint_text)
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

const disableButton = (button) => {
  button.disabled = true
  button.style.opacity = 0.4
}

const enableButton = (button) => {
  button.disabled = false
  button.style.opacity = 1
}

const increment5 = (score) => {
  if (score %5 === 0) {
    document.querySelector('.score').style.fontSize = '2rem'
    document.querySelector('.score').style.color = '#D325BF'
    setTimeout(() => {
      document.querySelector('.score').style.fontSize = '1rem'
      document.querySelector('.score').style.color = '#000000'
    }, 750)
  }
}

const updateScore = (score, guesses) => {
  document.querySelector('.scoreCounter').textContent = score + "/" + guesses
}