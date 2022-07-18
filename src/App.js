import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Index} from './views/principal'
import {QueryClient, QueryClientProvider, useQuery} from 'react-query'
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Index />
      </div>
    </QueryClientProvider>
  )
}

export default App
