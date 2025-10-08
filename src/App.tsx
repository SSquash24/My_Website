import IMG_Me from './assets/me.jpg'
import CPP_Logo from './assets/cpp_logo.png'
import Python_Logo from './assets/python-logo.png'
import React_Logo from './assets/reactjs-icon.svg'
import RISC_Logo from './assets/RISC-V.svg'
import './App.css'
import {Link} from "react-router-dom";
import Boids from "./Boids.tsx";


function App() {

    return (
        <div id='App'>
            <div id='TopPart'>
                <Boids className="background"/>

                <div className="sideBySide maxHeight">
                    <div className="shaded flex_elem purple">
                        <div className="margin_2em">
                            <h3>Hi, I'm</h3>
                            <h1>Joshua Coombe</h1>
                            <h3>Student at Oxford University, graduating 2026</h3>
                        </div>
                    </div>
                    <img src={IMG_Me} alt="That's me!" className="focus_pic sideBySide margin_2em flex_elem blue"/>
                </div>
            </div>

            <div id='MainPart'>

                <h1>About Me:</h1>
                <div className="aboutMe block green">
                    <p>I am a computer scientist studying at the University of Oxford, currently in my 4th year. <br/>
                        I've had a passion for software development ever since I first discovered Python when I was 10.
                    </p>
                </div>

                <h1>Languages I've worked with:</h1>
                <div className="skills block blue">
                    <div className="sideBySide">
                        <div className="skill">
                            <h3>Python</h3>
                            <img src={Python_Logo} alt="Python Logo" className="logo"/>
                            <p>Python was the first programming language I ever used, back when I was 10. I have since
                                used python for many projects, both personal and for companies.</p>
                        </div>
                        <div className="skill">
                            <h3>C++</h3>
                            <img src={CPP_Logo} alt="C++ Logo" className="logo"/>
                            <p>I first coded in C++ when I was in A-level and it is currently my favoured language when
                                coding
                                personal projects.</p>
                        </div>
                        <div className="skill">
                            <h3>Frontend Web with React</h3>
                            <img src={React_Logo} alt="React Logo" className="logo"/>
                            <p>Many of my more recent projects have been web-based, so I've learned some basic
                                web dev with React to be able to create things such as this website!</p>
                        </div>
                    </div>
                </div>

                <h1>Projects I've Done:</h1>
                <div className="projects block purple">
                    <div className="sideBySide">
                        <div className="skill">
                            <Link to="/projects/ThisWebsite"><h3>This Website!</h3></Link>
                            <p>I created this website myself using Vite and React.</p>
                        </div>
                        <div className="skill">
                            <Link to="/projects/MechanicsSim"><h3>2D Mechanics Simulator</h3></Link>
                            <p>For my A-level NEA I chose a more ambitious project to develop my skills beyond the
                                simpler projects I had done before. </p>
                        </div>
                        <div className="skill">
                            <Link to="projects/HotDesk"><h3>Hot-Desk booking system</h3></Link>
                            <p>This was a web-based application I created as part of a team to allow employees to book,
                                view and manage hot desks.</p>
                        </div>
                        <div className="skill">
                            <Link to="projects/TE3"><h3>Skardin TE3</h3></Link>
                            <p>The TE3 was a device housing a Raspberry Pi and a LCD display that read DiSEqC messages
                                and sent them via RS232.</p>
                        </div>
                        <div className="skill">
                            <Link to="projects/TE5"><h3>Skardin TE5</h3></Link>
                            <p>The TE5 was a web-based interface hosted locally on a Raspberry Pi that scheduled when
                                mains sockets would power on/off.</p>
                        </div>
                    </div>
                </div>

                <h1>Right Now I Am Working On:</h1>
                <div className="block blue">
                    <h3>Simulating the RISC-V Vector Extension</h3>
                    <img src={RISC_Logo} alt="RISC-V Logo" className="logo"/><br/>
                    <a href="https://github.com/SSquash24/RISC-V-python-sim" target="_blank">Code here!</a>
                    <p>The goal of this Uni project is to create a RISC-V simulator, first in python and maybe then in
                    Verilog, and use this to find areas where the RISC-V's unique take on vector architecture is
                    meaningfully different then the SIMD method.</p>
                </div>

                <h1>Projects/Concepts I want to look into:</h1>
                <div className="projects block purple">
                    <div className="sideBySide">
                        <div className="skill">
                            <h3>Real-time Water surface simulations</h3>
                            <p>Computer Graphics is a fascinating area that I've wanted to explore for a while now.
                                I've taken a graphics course in Uni and started working with OpenGL to be able to write
                                custom
                                shaders. In particular, my goal is to create a simulation of the surface of water, from
                                ponds to oceans,
                                with realistic waves, refractions, and reflections in real time. I would love to add a
                                realistic fluid
                                simulation to this as well to make a truly great simulation! Since coming up with this
                                project,
                                I've never looked at a lake the same way again.</p>
                        </div>
                        <div className="skill">
                            <h3>Chess AI (with physical board)</h3>
                            <p>Coding AI to complex puzzles such as chess is one of the purest forms of problem solving
                                that caused
                                me to fall in love with coding in the first place. This is a project I started a while
                                back, but had
                                to put on hold as other aspects of life took up more and more of my time. Since then, my
                                coding
                                skills and practices have improved drastically, so when I come back to this project I
                                will probably
                                re-write my previous code, but I still have every intention of returning to finish this
                                challenge!</p>
                        </div>
                        <div className="skill">
                            <h3>Quantum algorithms with ZX-Calculus</h3>
                            <p>In third year of Uni I took a course in quantum computing, expecting it to be interesting
                                but
                                too challenging for me to pursue much more than the course. What I discovered was one of
                                my favourite
                                areas of computing I've ever worked on, and since then I've read the book
                                <a href="https://www.cambridge.org/core/books/picturing-quantum-processes/1119568B3101F3A685BE832FEEC53E52"
                                   target="_blank"> Picturing Quantum Processes</a>, and I'm about to take a 4th year
                                course in this area.
                                I fully intend to continue studying and experimenting in this area long after I finish
                                Uni.</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default App
