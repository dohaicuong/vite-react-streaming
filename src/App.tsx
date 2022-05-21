import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import {
  QueryClient,
  QueryClientProvider,
  // QueryErrorResetBoundary,
} from 'react-query'

import { Provider as JotaiProvider } from 'jotai'

const Home = lazy(() => import('./pages/home'))
const Posts = lazy(() => import('./pages/posts'))

const NotFound = lazy(() => import('./pages/notfound'))

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 5,
      suspense: true,
    },
  },
})

const App = () => {
  return (
    <JotaiProvider>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path='/' element={<SuspensePage page={<Home />} />}>
            <Route path='/posts' element={<SuspensePage page={<Posts />} />} />
          </Route>
          <Route path='/*' element={<SuspensePage page={<NotFound />} />} />
        </Routes>
      </QueryClientProvider>
    </JotaiProvider>
  )
}

export default App

const SuspensePage = ({ page }: { page: React.ReactNode }) => <Suspense fallback='Loading...'>{page}</Suspense>
