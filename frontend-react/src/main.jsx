import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/inter/wght.css'
// Before index.css, so Tailwind utilities (w-4, block, hidden…) placed on an
// icon still override the icon's default box.
import './icons.generated.css'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
