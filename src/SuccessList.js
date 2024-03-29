import React from 'react'

const SuccessList = props => {
  //get a flattened array!
  let unsuccessfulWords = props.unsuccessful.reduce(
    (acc, val) => acc.concat(val),
    []
  )
  return (
    <div>
      <h4>Successful Words</h4>
      <div>
        {props.words.map(
          (word, index) =>
            !unsuccessfulWords.includes(word[0]) && (
              <div key={index} className="wordlist">
                <p>{word[0]}:</p> <p>{word[1]}</p>
              </div>
            )
        )}
      </div>
    </div>
  )
}

export default SuccessList
