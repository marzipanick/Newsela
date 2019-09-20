import React from 'react'

const FailList = props => {
  return (
    <div>
      <h4>Fail words</h4>
      {props.words.map(word => !props.success.includes(word) && <p>{word}</p>)}
    </div>
  )
}

export default FailList
