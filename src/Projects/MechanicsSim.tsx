import "./Project.css"

function MechanicsSim() {
  return (
    <div className="MechanicsSim ProjPage">
      <h1>Project: 2D Mechanics Simulator</h1>

      <p>
        The 2D Mechanics Simulator was one of the first large-scale projects I ever worked on.
        When I started this project I had been experimenting with game engines
        like <a href="https://unity.com/" target="_blank">Unity</a>,
        and I wanted to know how many of the underlying physics worked, so I created this simulator to learn the skills myself.
      </p>
      <p>
        ... TALK ABOUT PROJ SKILLS HERE
      </p>
      <p>
        This also was the first time I had used C++ for anything larger than a console application.
        I used <a href="https://www.sfml-dev.org/" target="_blank">SFML</a> for the display.
      </p>
      <p>
        However, as one of my early projects, this simulator was not without it's flaws.
        After many days of debugging the most disastrous issues, the program was improved, but by no means bug free.
        The source code I wrote for this project is messier than my current standards today, but I am still proud of what I created.
      </p>
    </div>
  )
}

export default MechanicsSim;