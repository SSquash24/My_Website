import "./Project.css"
import ClassDiagram from '../assets/MechanicsClassDiagram.png'
// import HierachyDiagram from '../assets/MechaincsHierarchyDiagram.png'
import vid from '../assets/MechanicsfpsTest.mp4'
import './MechanicsSim.css'

function MechanicsSim() {
    return (
        <div className="MechanicsSim ProjPage">
            <h1>Project: 2D Mechanics Simulator</h1>

            <div>
                <video controls muted className="mechVid">
                    <source src={vid} type="video/mp4"/>
                </video>
                <h5>An old recording of me testing performance of the simulation.</h5>
            </div>

            <p className='block green'>
                The 2D Mechanics Simulator was one of the first large-scale projects I ever worked on.
                When I started this project I had been experimenting with game engines
                like <a href="https://unity.com/" target="_blank">Unity</a>,
                and I wanted to know how many of the underlying physics worked, so I created this simulator to learn the
                skills myself.
            </p>
            <p className='block blue'>
                One of the most interesting problems I had to solve was handling collisions between objects, and the
                most challenging part of this was detecting them. I needed not just to find if a collision had occurred,
                but where, and what the collision normal vector was. For circles, this was easy, for polygons,
                this is more complicated. I restricted my problem to convex polygons, and after some research, discovered
                the Separating Axis Theorem (SAT).
                <br/>
                {/*The concept of SAT is that for any 2 convex objects, if they are not touching, then there must be a way*/}
                {/*to draw a straight line between them, and that line must be parallel to one of the sides of the object.*/}
                {/*We can check if such a line exists, for each side, by taking the dot product of all the points in both*/}
                {/*shapes with the vector perpendicular to the side we are considering. If there is no overlap in the values*/}
                {/*of each shape (e.g. It is not the case: shape 1 point a &lt;- shape 2 point a &lt;- shape 1 point b)*/}
                {/*Then the shapes are not colliding. If this is the case for all sides then the shapes are colliding.*/}
            </p>
            <p className='block purple'>
                This also was the first time I had used C++ for anything larger than a console application.
                I used <a href="https://www.sfml-dev.org/" target="_blank">SFML</a> for the display.
                Previously to this point I had mostly programmed in Python, so the strict typing and structure that C++
                required was brand new to me. Despite it's challenges, I found the forced structure was quite nice in
                organising my code.
            </p>
            <img src={ClassDiagram} alt='Class Diagram' className='limitW'/>
            <h5>Class Diagram for the various objects in the project.</h5>
            <p className='block blue'>
                Being one of my first major projects, the quality of this code is not up to a standard I would hold
                myself to today.
                The simulation, despite my best efforts, was never free from bugs.
                Considering my lack of age and experience at the time of making this, however, I am proud of what I had accomplished
            </p>
        </div>
    )
}

export default MechanicsSim;