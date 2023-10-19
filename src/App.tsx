import * as React from 'react'
import './App.css';
import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import {
  Routes,
  Route
} from "react-router-dom";
import NavBar from 'components/NavBar';
import LandingPage from 'components/LandingPage';
import Cart from 'components/Cart';

const GlobalStyle = createGlobalStyle`
  ${reset}
  /* 다른 스타일들 */
`

const App = () => (
  <React.Fragment>
    <GlobalStyle />
    <div>
      <NavBar />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </div>
  </React.Fragment>
)

export default App
