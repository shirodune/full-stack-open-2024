import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import { CounterContextProvider } from './CounterContext'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient} >
    <CounterContextProvider>
      <App />
    </CounterContextProvider>
  </QueryClientProvider>
)