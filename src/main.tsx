import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const root = createRoot(document.getElementById('root')!)

if (import.meta.env.DEV && window.location.hash === '#ios-preview') {
  // Development shortcut: the phone home screen without the 3D scene.
  void import('./dev/IosPreview.tsx').then(({ default: IosPreview }) => root.render(<IosPreview />))
} else {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
