import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import Daily from './pages/Daily.jsx'
// import Current from './pages/Current.jsx'
// import Weekly from './pages/Weekly.jsx'

const root = document.getElementById('root')

createRoot(root).render(
  <BrowserRouter>
      <Routes>
        <Route path='/api/tide/current' element={ <Daily /> } />
        {/* <Route path='/current' element={ <Current /> } /> */}
        {/* <Route path='/weekly' element={ <Weekly /> } /> */}
      </Routes>
  </BrowserRouter>
)
