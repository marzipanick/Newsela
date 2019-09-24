import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import SuccessList from './SuccessList'
import Enzyme, { shallow } from 'enzyme'
import chai, { expect } from 'chai'
import EnzymeAdapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new EnzymeAdapter() })

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
  ReactDOM.unmountComponentAtNode(div)
})

describe('<SuccessList /> component', () => {
  let successList

  successList = shallow(
    <SuccessList
      words={['good', 'great', 'wonderful']}
      unsuccessful={['not', 'great', ['fail']]}
    />
  )
  it('has an <h4> that renders a title', () => {
    expect(successList.find('h4').text()).to.equal('Successful Words')
  })
})
