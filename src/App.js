import React from 'react'
import './App.css'
import questions from './quiz_questions.json'
import FailList from './FailList'
import SuccessList from './SuccessList'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      fail: [],
      success: [],
      sanitizedWords: [
        'is',
        'this',
        'that',
        'the',
        'are',
        'those',
        'to',
        'of',
        'by',
        'ii',
        's',
        'it'
      ]
    }
    this.successFreqCount = this.successFreqCount.bind(this)
    this.poorFreqCount = this.poorFreqCount.bind(this)
  }

  successFreqCount() {
    let successWords = []
    questions.map(question => {
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

    let parsed = Object.keys(successFreq).filter(
      word =>
        successFreq[word] > 10 && !this.state.sanitizedWords.includes(word)
    )
    this.setState({ success: parsed })
  }

  poorFreqCount() {
    let poorWords = []

    questions.map(question => {
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

    let parsed = Object.keys(poorFreq).filter(
      word => poorFreq[word] > 5 && !this.state.sanitizedWords.includes(word)
    )
    this.setState({ fail: parsed })
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
            <FailList words={this.state.fail} success={this.state.success} />
          </div>
          <div className="success_list">
            <SuccessList words={this.state.success} fail={this.state.fail} />
          </div>
        </div>
      </div>
    )
  }
}

export default App
