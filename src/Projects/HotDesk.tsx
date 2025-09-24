import Report from '../assets/HotDesk_Report.pdf'
import HomePage from '../assets/HotDesk_Home.png'
import './HotDesk.css'

function HotDesk() {
    return (
        <div className="HotDesk ProjPage">
            <h1>Project: Hot-Desk Booking System:</h1>
            <p className="block blue">The hot-desk booking system was a web-based application I created as part of a team in
                my second year in Oxford.
                The goal was to create a web-based application to allow clients to book a desk, and to organise clients
                of similar departments/groups to be sat near each other.
            </p><p className="block green">
                We created the application using <a href='https://react.dev/' target='_blank'>React</a>, and I was responsible for the
                Front-End and much of the testing (Which is where I learned the skills to create this Website!).
                The front-end was tested using <a href="https://jestjs.io/" target='_blank'>Jest</a>, and the python back-end was tested
                using <a href="https://docs.pytest.org/" target='_blank'>pytest</a>.
                <br/>
                Overall, this project was relatively short - A couple of months whilst we were all also focusing on our
                studies, but it was a great introduction to working on a shared project as a team: Using GitHub,
                organising meetings, and utilising our different talents and experiences to achieve a unified goal.
            </p>
            We wrote a report about our app once we were finished, which is linked <a href={Report} target='_blank'>here</a>.

            <div className="block purple">
                <img src={HomePage} alt="HotDesk Home Page" className="HomePage green"/>
                <p>The home page of the HotDesk app</p>
            </div>
        </div>
    )
}

export default HotDesk;