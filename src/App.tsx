import React, { VFC } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import {ReactQueryDevtools} from "react-query/devtools"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainTask from './components/pages/MainTask';
import MainTab from './components/pages/MainTag';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false
    }
  } 
})

const App: VFC = () => {
  return (
    <div className="flex justify-center items-center flex-col min-h-screen text-gray-600 text-sm font-mono">
      <QueryClientProvider client={queryClient} >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainTask />} />
            <Route path="/tags" element={<MainTab />} />
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  )
}

export default App
