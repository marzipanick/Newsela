import React from 'react'
import './App.css'
import questions from './quiz_questions.json'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      questions: questions,
      fail: [],
      success: []
    }
    this.successFreqCount = this.successFreqCount.bind(this)
    this.poorFreqCount = this.poorFreqCount.bind(this)
  }

  successFreqCount() {
    let successWords = []
    this.state.questions.map(question => {
      if (question.percent_correct > 0.5) {
        let sWords = question.text.toLowerCase().match(/\w+(?:'\w+)*/g)
        successWords.push(sWords.pop())
      }
    })
    let successFreq = {}

    successWords.map(word => {
      if (successFreq[word]) successFreq[word]++
      else successFreq[word] = 1
    })
    let sorted = Object.keys(successFreq).sort(
      (a, b) => successFreq[b] - successFreq[a]
    )
    this.setState({ success: sorted.slice(0, 100) })
  }

  poorFreqCount() {
    let poorWords = []

    this.state.questions.map(question => {
      if (question.percent_correct < 0.5) {
        let pWords = question.text.toLowerCase().match(/\w+(?:'\w+)*/g)
        poorWords.push(pWords.pop())
      }
    })

    let poorFreq = {}

    poorWords.map(word => {
      if (poorFreq[word]) poorFreq[word]++
      else poorFreq[word] = 1
    })

    let sorted = Object.keys(poorFreq).sort((a, b) => poorFreq[b] - poorFreq[a])
    this.setState({ fail: sorted.slice(0, 100) })
  }

  componentDidMount() {
    this.poorFreqCount()
    this.successFreqCount()
  }

  render() {
    return (
      <div className="App">
        <h1>Frequency counter</h1>
        <div className="datalists">
          <div className="fail_list">
            <h4>Fail words</h4>
            {this.state.fail.map(
              word => !this.state.success.includes(word) && <p>{word}</p>
            )}
          </div>
          <div className="success_list">
            <h4>Success words</h4>
            {this.state.success.map(
              word => !this.state.fail.includes(word) && <p>{word}</p>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default App
