import { Routes, Route } from 'react-router-dom'
import { HomePage } from '@/pages/HomePage'
import { RecipePage } from '@/pages/RecipePage'
import { CameraPage } from '@/pages/CameraPage'
import { NavDropdown } from '@/components/NavDropdown'

function App() {
  return (
    <>
      <NavDropdown />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipe" element={<RecipePage />} />
        <Route path="/capture" element={<CameraPage />} />
      </Routes>
    </>
  )
}

export default App