import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import Daily from './pages/Daily.jsx'

const root = document.getElementById('root')

createRoot(root).render(
  <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Daily /> } />
      </Routes>
  </BrowserRouter>
)
