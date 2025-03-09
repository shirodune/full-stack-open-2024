import { useReducer, useContext, createContext } from "react";

const counterReducer = (state, action) => {
  switch (action.type) {
    case "SET_MESSAGE":
        return action.payload
    default:
        return state
  }
}

const CounterContext = createContext()

export default CounterContext

export const CounterContextProvider = (props) => {
  const [counter, counterDispatch] = useReducer(counterReducer, '')

  return (
    <CounterContext.Provider value={[counter, counterDispatch] }>
      {props.children}
    </CounterContext.Provider>
  )
}

export const useCounterValve = () => {
  const counterAndDispatch = useContext(CounterContext)
  return counterAndDispatch[0]
}

export const useCounterDispatch = () => {
  const counterAndDispatch = useContext(CounterContext)
  return counterAndDispatch[1]
}