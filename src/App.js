import React from 'react'
import './App.css'
import questions from './quiz_questions.json'
import Unsuccessful from './Unsuccessful'
import SuccessList from './SuccessList'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      unsuccessful: [],
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
        'it',
        'on',
        'in',
        'sentence'
      ]
    }
    this.successFreqCount = this.successFreqCount.bind(this)
    this.poorFreqCount = this.poorFreqCount.bind(this)
  }

  successFreqCount() {
    let successWords = []
    //get an array of just the words in the questions students did well on
    questions.map(question => {
      if (question.percent_correct > 0.5) {
        let sWords = question.text.toLowerCase().match(/\w+(?:'\w+)*/g)
        successWords.push(sWords.pop())
      }
    })

    let successFreq = {}
    //find frequency of each word
    successWords.map(word => {
      if (successFreq[word]) successFreq[word]++
      else successFreq[word] = 1
    })
    //get only the words that were used more than 5 times but do not include any sanitized words, sort by frequency descending
    let parsed = Object.entries(successFreq)
      .filter(
        word =>
          successFreq[word[0]] > 5 &&
          !this.state.sanitizedWords.includes(word[0])
      )
      .sort((a, b) => b[1] - a[1])
    //set the state of successful words to this array
    this.setState({ success: parsed })
  }

  poorFreqCount() {
    let poorWords = []
    //get an array of just the words in the questions students did not do well on
    questions.map(question => {
      if (question.percent_correct < 0.5) {
        let pWords = question.text.toLowerCase().match(/\w+(?:'\w+)*/g)
        poorWords.push(pWords.pop())
      }
    })

    let poorFreq = {}
    //get the frequency each word was used
    poorWords.map(word => {
      if (poorFreq[word]) poorFreq[word]++
      else poorFreq[word] = 1
    })
    //grab only words used more than 5 times that are not sanitized, sort in descending frequency
    let parsed = Object.entries(poorFreq)
      .filter(
        word =>
          poorFreq[word[0]] > 5 && !this.state.sanitizedWords.includes(word[0])
      )
      .sort((a, b) => b[1] - a[1])
    //set the state of unsuccessful words to this array
    this.setState({ unsuccessful: parsed })
  }

  componentDidMount() {
    //set the state with the above functions
    this.poorFreqCount()
    this.successFreqCount()
  }

  render() {
    return (
      <div className="App">
        <h1>Frequency counter</h1>
        <div className="datalists">
          <div className="unsuccessful">
            <Unsuccessful
              words={this.state.unsuccessful}
              success={this.state.success}
            />
          </div>
          <div className="success_list">
            <SuccessList
              words={this.state.success}
              unsuccessful={this.state.unsuccessful}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default App
