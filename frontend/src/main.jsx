import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Genres from './components/Genres'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Genres />
  </StrictMode>,
)
