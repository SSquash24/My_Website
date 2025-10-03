import {Link} from "react-router-dom";
import TE5_Pic from "../assets/TE5.png"
import TE5_Cycle_Pic from "../assets/TE5_Cycle.png"

function TE5() {
    return (<div className="TE5 ProjPage">
        <h1>Project: Skardin TE5</h1>
        <img src={TE5_Pic} alt="TE5 overview page" className="pic"/>
        <div className="block purple">
            The TE5 (Testing Equipment 5) Was the second project I undertook for <a href='https://www.skardin.com/'>Skardin</a>,
            a few years after the <Link to="projects/TE3">TE3</Link>. The aim of this project was to create a tool that
            would turn on/off mains power in a scheduled manner - Either by time of day/week or fixed on/off duration.
            This would be used by the company to test a variety of their products, or to schedule when they wanted various
            devices on or off. Like the TE3, this device would be powered by a
            <a href="https://www.raspberrypi.com/" target="_blank"> Raspberry Pi</a>, and I would be responsible for the
            software, communicating via GPIOs to the hardware, which would be designed by someone else.
        </div>
        <div className="block green">
            The Device needed to be able to be accessed locally, ideally anywhere within the same building, so I opted
            for the interface to be a local webapp. The user, once logged in, would be able to manually turn on or off
            a port, set it to turn on/off based on a weekly schedule, orset it to run a fixed amount of cycles with
            set on/off durations. With the cycle mode many ports could be ran simultaneously, with same or different
            settings, as part of a group.
        </div>
        <div>
            <h5>The cycle page of a selected port:</h5>
            <img src={TE5_Cycle_Pic} alt="TE5_Cycle_Pic" className="pic"/>
        </div>
        <div className="block blue">
            In order to set up the device, the user could plug in a USB stick with the desired settings in a file to the
            device. Most importantly, this allows the device to connect to WiFi if it cannot be connected via Ethernet,
            but it also allows other configuration changes, such as the webpage hostname and login details.
            Once the TE5 has booted up once with the USB stick it can then be removed.
        </div>
        <div className="block purple">
            This was the first time I had ever made a web-based application, so whilst making this I had to learn many
            new tools (Flask, frontend & backend practices) and languages (Javascript, HTML, CSS) that I had never
            touched before. Since then, my web development skills have definitely improved (I like to think this website
            looks a little bit better than the screenshots above). Despite this, the product worked well and as far as
            I'm aware, this product is still in use by the company to this day!
        </div>

    </div>)
}

export default TE5