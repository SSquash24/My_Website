import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import './index.css'

import App from './App.tsx'
import NotFound from "./NotFound.tsx";

import githubURL from "./assets/github_logo.png";
import LinkedInLogo from "./assets/LinkedIn-Blue-96@2x.png";
import ThisWebsite from "./Projects/ThisWebsite.tsx";
import HotDesk from "./Projects/HotDesk.tsx";
import MechanicsSim from "./Projects/MechanicsSim.tsx";

const root = createRoot(document.getElementById('root')!);
root.render(
  <StrictMode>
    <BrowserRouter>
      <div id="topBar">
        <Link to='/' className='top_elem' id='top_name'>Joshua Coombe</Link>
        <div className="links">
          <a href="https://github.com/SSquash24" target="_blank">
            <img src={githubURL} className="top_elem" alt="Github link"/>
          </a>
          <a href="https://www.linkedin.com/in/joshua-coombe-707939320" target="_blank">
            <img src={LinkedInLogo} className="top_elem" alt="LinkedIn link"/>
          </a>
          <a href="mailto:joshua.coombe@worc.ox.ac.uk" className="top_elem in_block">
            joshua.coombe@worc.ox.ac.uk
          </a>
        </div>
      </div>
      <div id="mainbody">
      <Routes>
        <Route path='/' element={<App/>}/>
        <Route path='/projects/ThisWebsite' element={<ThisWebsite/>} />
        <Route path='/projects/HotDesk' element={<HotDesk/>} />
        <Route path='/projects/MechanicsSim' element={<MechanicsSim/>} />
        <Route path='*' element={<NotFound/>}/>
      </Routes>
      </div>
    </BrowserRouter>
  </StrictMode>,
)
