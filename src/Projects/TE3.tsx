import TE3_pic from '../assets/TE3.png'
import TE3_LCD_pic from '../assets/TE3_LCD.png'

function TE3() {
    return (
        <div className="TE3 ProjPage">
            <h1>Project: Skardin TE3</h1>
            <div>
                <h5>Picture of the TE3 device:</h5>
                <img src={TE3_pic} alt="A box with an LCD display and the label 'TE3'" className="pic" />
            </div>
            <p className="block green">
                The TE3 (Testing Equipment 3) for <a href='https://www.skardin.com/'>Skardin</a> was the first project I
                undertook on behalf of a company. The goal was to create a <a href="https://raspberrypi.com" target="_blank">Raspberry Pi </a>
                powered device that could interpret and display <a href='https://en.wikipedia.org/wiki/DiSEqC'>DiSEqC </a>
                commands through both an LCD display and RS-232. In particular, my job was programming the Rasberry Pi,
                whilst it was another person's job to make the hardware.
            </p>
            <p className="block blue">
                This project was one of the first where I really had to research, learning the DiSEqC protocol (which I
                had never even heard of previous to this project), and learning how to communicate through both RS232 and
                I2C. It also taught me valuable communication skills in figuring out what a client actually wants, as
                this was the first time I had ever made code to be used by someone other than myself.
            </p>
            <div>
                <h5>An example of the LCD whilst the device is working:</h5>
                <img src={TE3_LCD_pic} alt="An LCD display showing DiSEqC commands, both hex and unassembled" className="pic"/>
            </div>
        </div>
    )
}

export default TE3;