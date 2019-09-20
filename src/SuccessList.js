import React from 'react'

const SuccessList = props => {
  return (
    <div>
      <h4>Success words</h4>
      {props.words.map(word => !props.fail.includes(word) && <p>{word}</p>)}
    </div>
  )
}

export default SuccessList
