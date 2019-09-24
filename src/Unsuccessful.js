import React from 'react'

const Unsuccessful = props => {
  //get a flattened array
  let successWords = props.success.reduce((acc, val) => acc.concat(val), [])
  console.log(props)
  return (
    <div>
      <h4>Unsuccessful Words</h4>
      <div>
        {props.words.map(
          (word, index) =>
            !successWords.includes(word[0]) && (
              <div key={index} className="wordlist">
                <p>{word[0]}:</p> <p>{word[1]}</p>
              </div>
            )
        )}
      </div>
    </div>
  )
}

export default Unsuccessful
