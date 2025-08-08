
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Daily from './pages/Daily.jsx'

// Fonts:
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// Create a theme (you can customize this later)
// const theme = createTheme({
//   palette: {
//     mode: 'dark', // or 'dark'
//   },
// })

const root = document.getElementById('root')

createRoot(root).render(
  <>
    <CssBaseline/>
    <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Daily /> } />
        </Routes>
    </BrowserRouter>
  </>
)
