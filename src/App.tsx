import IMG_Me from './assets/ME_UPDATE.jpg'
import CPP_Logo from './assets/cpp_logo.png'
import Python_Logo from './assets/python-logo.png'
import Vite_Logo from './assets/Vite.png'
import './App.css'
import {Link} from "react-router-dom";


function App() {

  return (
    <div id='App'>
      <div id='TopPart'>
        <div className="sideBySide maxHeight shaded">
          <div className="margin_2em">
            <h1>Hey!</h1>
            <h3>Nice to meet you!<br/> I'm Josh, and I like to code!</h3>
          </div>
          <img src={IMG_Me} alt="That's me!" className="focus_pic sideBySide margin_2em"/>
        </div>
      </div>

      <div id='MainPart'>

        <h1>About Me:</h1>
        <div className="aboutMe block">
          <p>I am a computer scientist studying at the University of Oxford, currently in my 3rd year. <br/>
            I've had a passion for software development ever since I first discovered Python when I was 10.</p>
        </div>

        <h1>My Skills:</h1>
        <div className="skills block">
          <div className="sideBySide">
            <div className="skill">
              <h3>Python</h3>
              <img src={Python_Logo} alt="Python Logo" className="logo"/>
              <p>Python was the first programming language I ever used. With over 8 years of experience I have used Python
                for many projects, both personal and for companies.</p>
            </div>
            <div className="skill">
              <h3>C++</h3>
              <img src={CPP_Logo} alt="C++ Logo" className="logo"/>
              <p>I have coded in C++ for over 4 years now and it is currently my most common language I use when coding
                personal projects.</p>
            </div>
          </div>
        </div>

        <h1>Projects I've Done:</h1>
        <div className="projects block">
          <h2>Personal Projects</h2>
          <p>In my free time, I like to take on personal projects in areas I find interest in:</p>
          <div className="sideBySide">
            <div className="skill">
              <Link to="/projects/ThisWebsite"><h3>This Website!</h3></Link>
              <img src={Vite_Logo} alt="Vite Logo" className="logo" />
              <p>I created this website myself using Vite and React.</p>
            </div>
            <div className="skill">
              <Link to="/projects/MechanicsSim"><h3>2D Mechanics Simulator</h3></Link>
            </div>
          </div>

          <h2>For Companies</h2>
          <div className="sideBySide">
            <div className="skill">
              <Link to="projects/HotDesk"><h3>Hot-Desk booking system</h3></Link>
              <p>This was a web-based application I created as part of a team to allow employees to book, view and manage
                hot desks.</p>
            </div>
            <div className="skill">
              <Link to="projects/TE3"><h3>Skardin TE3</h3></Link>
              <p>The TE3 was a device housing a Raspberry Pi and a LCD display that read DiSEqC messages and sent them via RS232.</p>
            </div>
            <div className="skill">
              <Link to="projects/TE5"><h3>Skardin TE5</h3></Link>
              <p>The TE5 was a web-based interface hosted locally on a Raspberry Pi that scheduled when mains sockets would power on/off.</p>
            </div>
          </div>

          <h2>Still Working on...</h2>
          <div className="sideBySide">
            <div className="skill">
              <h3>Water Graphics Simulations</h3>
              <p>Using C++, OpenGL and GLFW, I am trying to simulate realistic water and lighting in real time,
                implementing
                waves (via fast-fourier transforms), reflections, refractions.</p>
            </div>
            <div className="skill">
              <h3>Chess AI (with physical board)</h3>
              <p>The goal of this project is to have a physical chess board you can play against, using magnets, sensors,
                and lights. This meant encoding a chess AI on a device with limited hardware capabilities (Raspberry Pi).
                Unfortunately as Uni got busy I had to put this project on hold, but I still intend to return very
                soon!</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default App
