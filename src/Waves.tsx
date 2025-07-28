// Background animated sine waves on all pages but home page


import { useRef, useEffect } from 'react'


let ctx: CanvasRenderingContext2D | null


function genWaves(height: number, waves: number) {
    return Array.from({length: waves}, () => ({
        y: Math.random() * (height-150) + 250,
        length: Math.random() * 3 + 2,
        amplitude: Math.random() * 25 + 5,
        // frequency: Math.random() * 0.01 + 0.005,
        frequency: 0.01,
    }))
}

let waves : {y: number, length: number, amplitude: number, frequency: number}[] = []

let interval = 0

const step = 2

const colours = ["175,0,0", "0,175,0", "0,125,125", "125,0,125"]

function animate() {
    if (ctx != null) {
        ctx.canvas.width = ctx.canvas.offsetWidth;
        ctx.canvas.height = ctx.canvas.offsetHeight;

        ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height);

        let i = 0
        waves.forEach(wave => {
            const calcY =  (x : number) => {return wave.y+wave.amplitude*Math.sin(wave.frequency*(interval+x))}

            let prevX = 0; let prevY = 0
            let prevBotX = 0; let prevBotY = 0
            for (let x = -15; prevX < ctx.canvas.width; x+= 20) {
                const y = calcY(x)-(x / 10)

                const downX = (prevY-y)*wave.length; const downY = (x-prevX)*wave.length
                const grad = ctx.createLinearGradient(prevX,prevY, prevX+downX, prevY+downY)
                // grad.addColorStop(0, "rbga(255,0,0,1)")
                grad.addColorStop(0, "rgba("+colours[i]+",1)")
                grad.addColorStop(0.1, "rgba("+colours[i]+",0.2)")
                grad.addColorStop(1, "transparent")
                ctx.fillStyle = grad
                ctx?.beginPath()
                ctx?.moveTo(prevX-0.1, prevY)
                ctx?.lineTo(x, y)
                ctx?.lineTo(x+downX, y+downY)
                ctx?.lineTo(prevBotX, prevBotY)
                prevX = x; prevY = y
                prevBotX = x + downX; prevBotY = y + downY
                ctx.fill()

            }
            i++
        })

        interval += step
        console.log(interval)
        // interval %= ctx.canvas.width
    }

}


function Waves() {
    const ref = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (ref.current) {
            ctx = ref.current.getContext('2d');
            waves = genWaves(500, 4)
            const anim_interval = setInterval(() => {animate()}, 25)

            return () => {clearInterval(anim_interval)}
        }
    }, []);

    return <canvas ref={ref} className="background"></canvas>
}

export default Waves;