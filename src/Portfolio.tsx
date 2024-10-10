
function Skills() {
  return (
    <div className="Skills">
      <h2>Skills</h2>

    </div>
  )
}

function Projects() {
  return (
    <div className="Projects">
      <h2>Personal Projects</h2>
      <p>In my free time, I like to take on personal projects in areas I find interest in:</p>
      <div className="project">
        <h4>This Website!</h4>
        <p>I created this website myself using Vite and React.</p>
      </div>

      <h2>For Companies</h2>
      <div className="project">
        <h4>Hot-Desk booking system</h4>
        <p>This was a web-based application I created as part of a team to allow employees to book, view and manage hot desks.</p>
      </div>

      <h3>Still Working on...</h3>
      <div className="project">
        <h4>Water Graphics Simulations</h4>
        <p>Using C++, OpenGL and GLFW, I am trying to simulate realistic water and lighting in real time, implementing waves (via fast-fourier transforms), reflections, refractions.</p>
      </div>
      <div className="project">
        <h4>Chess AI (with physical board)</h4>
        <p>The goal of this project is to have a physical chess board you can play against, using magnets, sensors, and lights. This meant encoding a chess AI on a device with limited hardware capabilities (Raspberry Pi).
          Unfortunately as Uni got busy I had to put this project on hold, but I still intend to return very soon!</p>
      </div>
    </div>
  )
}


function Portfolio() {
  return (
    <div className="portfolio">

      <h1>Portfolio goes here</h1>
      <Skills />
      <Projects />

    </div>
  )
}

export default Portfolio;