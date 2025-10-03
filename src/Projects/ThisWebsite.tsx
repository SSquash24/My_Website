import Boids from "../Boids.tsx";
import './ThisWebsite.css'

function ThisWebsite() {
    return (
        <div className="Project ProjPage">
            <h1>Project: This Website</h1>
            {/*<Waves />*/}
            <p className="block green">
                While I don't feel like web development is one of my best skills, I do have some familiarity with the
                area. I created this website using <a href="https://vite.dev/" target="_blank">Vite</a> and <a
                href="https://react.dev/" target="_blank">React</a>, and am hosting it myself.
                You can find the code for this website <a href="https://github.com/SSquash24/My_Website" target="_blank">here
                </a> on my github.
            </p>
            <h2>Front Page Simulation</h2>

            <div className="block purple">
                <p>The front page simulation follows the <a href="https://en.wikipedia.org/wiki/Boids"
                                                            target="_blank">Boids</a> algorithm, where each 'boid' tries to
                    flock together like birds. Each boid has 3 main rules they follow:</p>
                <div className='alignLeft limitW'>
                    <b>Separation:</b> If any other boids are too close, the boid will move away from them. This rule also tells the boids to turn away from walls.<br/>
                    <b>Cohesion:</b> The boid will move towards any other boids it sees. A boid can 'see' any other boid
                    that is within it's vision radius.<br/>
                    <b>Alignment:</b> The boid will move to face the same direction as the other boids it can see.
                </div>


                <p>In addition, I added a few extra rules for added depth. In order to accomodate these rules boids now have
                    a colour, and different coloured boids may follow different rules</p>
                <div className='alignLeft limitW'>
                    <b>Goal Seeking</b> If there is a goal of the same colour as the boid, the boid will try to move towards
                    it. In my simulation, the yellow and green boids each have a goal<br/>
                    <b>Wall Avoidance</b> If a boid is too close to a wall, it will try to move away.
                    (In rare cases the boid moves too fast to turn away and leaves the boundary of the simulation. If this
                    happens then it is moved to the centre)<br/>
                    <b>Enemy Avoidance</b> If the boid can see a boid of an 'enemy' colour, then it will move away.
                    In my simulation, all boids see red boids as an enemy (except for red themselves)
                </div>
            </div>
            <div className="block blue">
                <p> To allow many boids to be simulated in real time my simulation makes use of a quad-tree.
                    A quad-tree works by recursively splitting its area into 4 sub-areas, if there are too many boids in that area.
                    Hence, areas where boids are densely populated are split up into very small areas, whereas sparcely populated areas are split up little.
                    When a boid needs to find all other boids in a certain radius, it only needs to check boids that are in sub-areas that are (at least partially) within that radius.
                    This avoids each boid needing to check every other boid to find those that are within visible range, every timestep.
                    Below you can see the simulation again, but now with the quad-tree visible:
                </p>
            </div>
            <Boids id='demoBoids' showQuad/>

        </div>
    )
}

export default ThisWebsite;