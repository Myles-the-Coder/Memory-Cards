const addContainer = document.getElementById('add-container')
const showBtn = document.getElementById('show')
const mainContainer = document.getElementById('container')
const cardContainer = document.getElementById('card-container')
const prevArrow = document.getElementById('prev')
const currentEl = document.getElementById('current')
const nextArrow = document.getElementById('next')
const questionEl = document.getElementById('question')
const answerEl = document.getElementById('answer')
const addBtn = document.getElementById('add-card')
const clearCurBtn = document.getElementById('clear-current-card')
const clearAllBtn = document.getElementById('clear-cards')
const hideBtn = document.getElementById('hide')

//Keep track of current card
let currentActiveCard = 0

//Store DOM cards
const cardsEl = []

//Store card data
const cardsData = getCardsData()

// const cardsData = [
//   {
//     question: 'What must a variable begin with?',
//     answer: 'A letter, $ or _'
//   },
//   {
//     question: 'What is a variable?',
//     answer: 'Container for a piece of data'
//   },
//   {
//     question: 'Example of Case Sensitive Variable?',
//     answer: 'thisIsAVariable'
//   }
// ]

//Create all cards
function createCards() {
  cardsData.forEach((data, index) => createCard(data, index))
}

//Create a single card in the DOM
function createCard(data,index) {
  const card = document.createElement('div')
  card.classList.add('card')

  if(index === 0) {
    card.classList.add('active')
  }

  card.innerHTML = `
  <div class="inner-card">
  <div class="inner-card-front">
    <h1>${data.question}</h1>
  </div>
  <div class="inner-card-back">
    <h1>${data.answer}</h1>
  </div>
</div>
  `
  card.addEventListener('click', () => card.classList.toggle('show-answer'))


  //Add to DOM cards
  cardsEl.push(card)

  //Append card
  cardContainer.appendChild(card)
  
  updateCurrentText()
}

//show number of cards
function updateCurrentText() {
  currentEl.innerText = `${currentActiveCard + 1} / ${cardsEl.length}`
}

//Get cards from local storage
function getCardsData() {
  const cards = JSON.parse(localStorage.getItem('cards'))
  
  return cards === null ? [] : cards
}

//Save cards data to local storage
function setCardsData(cards) {
  localStorage.setItem('cards', JSON.stringify(cards))
  window.location.reload()
}

createCards()

//Event Listeners
//Next Arrow
nextArrow.addEventListener('click', () => {
  cardsEl[currentActiveCard].className = 'card left'

  currentActiveCard = currentActiveCard + 1

  if(currentActiveCard > cardsEl.length - 1) {
    currentActiveCard = cardsEl.length - 1
  }

  cardsEl[currentActiveCard].className = 'card active'

  updateCurrentText()
})

//Prev Arrow
prevArrow.addEventListener('click', () => {
  cardsEl[currentActiveCard].className = 'card right'

  currentActiveCard = currentActiveCard - 1

  if(currentActiveCard < 0) {
    currentActiveCard = 0
  }

  cardsEl[currentActiveCard].className = 'card active'

  updateCurrentText()
})


//Show add container
showBtn.addEventListener('click', () => addContainer.classList.add('show'))
//Hide add container
hideBtn.addEventListener('click', () => addContainer.classList.remove('show'))
//Add new card
addBtn.addEventListener('click', () => {
  const question = questionEl.value
  const answer = answerEl.value

  if(!question.trim() || !answer.trim) return

  const newCard = { question, answer }

  createCard(newCard)

  questionEl.value = ''
  answerEl.value = ''

  addContainer.classList.remove('show')

  cardsData.push(newCard)

  setCardsData(cardsData)
})

//Clear current card
clearCurBtn.addEventListener('click', () => {
  localStorage.removeItem(`cards`)
})

//Clear all cards
clearAllBtn.addEventListener('click', () => {
  localStorage.clear()
  cardContainer.innerHTML = ''
  window.location.reload()
})