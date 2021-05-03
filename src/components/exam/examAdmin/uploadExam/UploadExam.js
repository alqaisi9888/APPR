import React, { useEffect, useState } from 'react'
import * as XLSX from 'xlsx'
import './Upload.css'
export default function App() {
  var questionsState = {
    score: 0,
    setScore: 0,
    numberOfQuestnios: 0,
    correctAnswer: 0,
    wrongAnswers: 0,
    currentQuestion: 0,
    setCurrentQuestion: 0,
    setShowScore: false,
    showScore: false,
    questions: [
      {
        id: '',
        question: ' ',
        option: [],
        answer: ' ',
      },
    ],
  }

  // const  [setCounter] = useState()

  //useEffect()

  const readExcel = (file) => {
    //#region Read Excel Data
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader()

      fileReader.readAsArrayBuffer(file)

      fileReader.onload = (e) => {
        const bufferArray = e.target.result

        const wb = XLSX.read(bufferArray, { type: 'buffer' })

        const wsname = wb.SheetNames[0]

        const ws = wb.Sheets[wsname]

        const data = XLSX.utils.sheet_to_json(ws, {
          blankRows: false,
          head: 1,
        })

        resolve(data)
      }

      fileReader.onerror = (error) => {
        reject(error)
      }
    })

    promise.then((d) => {
      questionsState.numberOfQuestnios = d.length

      var i

      var myObject = {
        id: '',
        question: ' ',
        option: [],
        answer: ' ',
      }

      questionsState.questions.pop()
      for (i = 0; i < d.length; i++) {
        //console.log('result: ' + i + ' ')
        //console.log(d[i])
        myObject.id = d[i].id
        myObject.question = d[i].Qs
        myObject.option = [d[i].A, d[i].B, d[i].C, d[i].D]
        myObject.answer = d[i].RightAnswer
        // console.log(myObject)
        console.log('questionsState.questions////')
        questionsState.questions.push(myObject)
        console.log(questionsState.questions[1].question)

        //  setCounter(i)
      }
    })
    //#endregion
  }

  const handleAnswerNextClick = () => {
    const nextQuestion = questionsState.currentQuestion + 1
    if (nextQuestion < questionsState.questions.length) {
      questionsState.setCurrentQuestion(nextQuestion)
    }
  }

  const handleAnswerButtonClick = () => {
    if (questionsState.questions.question === questionsState.questions.answer) {
      questionsState.setScore(questionsState.score + 1)
      questionsState.corrrectAnswer(questionsState.corrrectAnswer + 1)
    } else {
      questionsState.wrongAnswers(questionsState.wrongAnswers + 1)
    }
  }

  return (
    <div>
      <div>
        <input
          type="file"
          onChange={(e) => {
            const file = e.target.files[0]
            readExcel(file)
          }}
        />
      </div>

      {questionsState.questions.map(() => (
        <div>
          <br /> <hr />
          <div>
            <p>score {questionsState.score}</p>
            <p>correctAnswer {questionsState.correctAnswer}</p>
            <p>WrongAnswer {questionsState.wrongAnswers}</p>{' '}
          </div>
          <hr />
          <div className="card11">
            <h4>
              {questionsState.currentQuestioon} /
              {questionsState.numberOfQuestnios}
            </h4>
            <h1 className="fancy-h1">
              Questions :{' '}
              {
                questionsState.questions[questionsState.currentQuestion]
                  .question
              }
            </h1>
            <h1 className="fancy-h1">
              Questions : {questionsState.questions.question}
            </h1>
            <br />
            <button className="fancy-btn1">
              option
              {questionsState.questions[questionsState.currentQuestion].option}
            </button>
            <button className="fancy-btn1">
              option
              {questionsState.questions[questionsState.currentQuestion].option}
            </button>
            <br />
            <button className="fancy-btn1">Next</button> <br />
            <button className="fancy-btn1">Prev</button>
          </div>
        </div>
      ))}
    </div>
  )
}
