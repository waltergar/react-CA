import { connect } from 'react-redux'

const connector = (states, dispatches, Component) => {
  const mapState = state => ({ ...states.map(stateFunc => stateFunc(state)) })
  const mapDispatch = dispatch => ({ ...dispatches.map(dispatchFunc => dispatchFunc(dispatch)) })

  return connect(mapState, mapDispatch)(Component)
}

export default connector
