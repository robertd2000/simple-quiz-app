const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerBtn = document.getElementById('answer-buttons')


let shuffledQuestions, currentQuestionIndex

const startGame = () => {
    console.log('start');
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

const showQuestion = (question) => {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerBtn.appendChild(button)
    });
}

const resetState = () => {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerBtn.firstChild) {
        answerBtn.removeChild(answerBtn.firstChild)
    } 
}
const setNextQuestion = () => {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

const selectAnswer = (e) => {
    const selectedBtn = e.target
    const correct = selectedBtn.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerBtn.children).forEach(btn => {
        setStatusClass(btn, btn.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide') 
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
   
}

const setStatusClass = (element, correct) => {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

const clearStatusClass = (element) => {
    element.classList.remove('correct')
    element.classList.remove('wrong')

}

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

const questions = [
    {
      question: 'What is 2 + 2?',
      answers: [
        { text: '4', correct: true },
        { text: '22', correct: false }
      ]
    },
    {
      question: 'Who is the best YouTuber?',
      answers: [
        { text: 'Web Dev Simplified', correct: true },
        { text: 'Traversy Media', correct: true },
        { text: 'Dev Ed', correct: true },
        { text: 'Fun Fun Function', correct: true }
      ]
    },
    {
      question: 'Is web development fun?',
      answers: [
        { text: 'Kinda', correct: false },
        { text: 'YES!!!', correct: true },
        { text: 'Um no', correct: false },
        { text: 'IDK', correct: false }
      ]
    },
    {
      question: 'What is 4 * 2?',
      answers: [
        { text: '6', correct: false },
        { text: '8', correct: true }
      ]
    }
  ]