
import './styles/App.css'
import ListCarComponent from './components/ListCarComponent'
import HeaderComponent from './components/HeaderComponent'
import FooterComponent from './components/FooterComponent'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AddCarComponent from './components/AddCarComponent'

function App() {

  return (
    <>
      <BrowserRouter>
        <div className="app-container">
          <HeaderComponent />
          <main>
            <Routes>
              <Route path='/' element={<ListCarComponent />}></Route>
              <Route path='/cars' element={<ListCarComponent />}></Route>
              <Route path='/add-car' element={<AddCarComponent />}></Route>
              <Route path='/edit-car/:id' element={<AddCarComponent />}></Route>
            </Routes>
          </main>
          <FooterComponent />
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
