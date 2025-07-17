import { useEffect, useRef } from 'react'


const baseWidth = 2000
const baseHeight = 1000
const yellow_boids = 200
const red_boids = 30
const green_boids = 200
const blue_boids = 500
const speed = 1.25

class Vector {
    constructor(public x: number = 0, public y: number = 0) {}



    sqrMag() : number {
        return (this.x * this.x) + (this.y * this.y)
    }
    mag() : number {
        return Math.sqrt(this.sqrMag())
    }


    normalised() : Vector {
        const mag = this.mag()
        if (mag == 0) return new Vector(0,0)
        return new Vector(this.x / mag, this.y / mag)
    }

    inv() : Vector {
        const sqrMag = this.sqrMag()
        if (sqrMag == 0) return new Vector(0,0)
        return new Vector(this.x / sqrMag, this.y / sqrMag)
    }

    mult(r : number) {
        this.x *= r
        this.y *= r
    }

    add(v : Vector) {
        this.x += v.x
        this.y += v.y
    }

}

abstract class Object extends Vector {

    abstract draw(ctx: CanvasRenderingContext2D, scale : Vector): void;
    abstract move(): void;
}

function pythag_comp(centre: Vector, r: number, point: Vector): boolean {
    return ((centre.x-point.x)**2) + ((centre.y-point.y)**2) < r**2;
}



let goal = new Vector(750, 200);
let goal2 = new Vector(250, 200);



class Boid extends Object {
    static sep_range = 25;
    static avoidFact = 1.5
    static wallFact = 0.75
    static vis_range = 60
    static centeringFact = 0.5
    static alignmentFact = 0.3
    static goalFact = 0.15
    static enemyFact = 1

    static drawCols = ["yellow", "lime", "aqua", "red"];

    velocity: Vector = new Vector(1,0);
    public facing: Vector = new Vector()

    constructor(x: number,
                y: number,
                public type: number)
    {
        super(x, y);
    }

    update(boids_func: (pos: Boid, range: number) => Boid[]) {
        // separation

        const close = new Vector()
        const sep_boids =  boids_func(this, Boid.sep_range)
        for (const boid of sep_boids) {
            close.add(new Vector(this.x-boid.x, this.y-boid.y).normalised())
        }
        close.mult(Boid.avoidFact / sep_boids.length)
        this.velocity.add(close)


        const vis_birds = boids_func(this, Boid.vis_range);
        if (vis_birds.length > 0) {

            // alignment & cohesion
            const pos_avg = new Vector()
            const vel_avg = new Vector()
            const enemy_avg = new Vector()

            let numFriends = 0
            let numEnemies = 0

            vis_birds.forEach(boid => {
                if (this.type == 3 || boid.type != 3) {
                    pos_avg.add(new Vector(boid.x - this.x, boid.y - this.y).normalised())
                    vel_avg.add(boid.facing)
                    numFriends++
                } else {
                    // enemy-avoiding
                    enemy_avg.add(new Vector(this.x - boid.x, this.y - boid.y).normalised())
                    numEnemies++
                }
            })
            pos_avg.mult(Boid.centeringFact / numFriends)
            vel_avg.mult(Boid.alignmentFact / numFriends)
            enemy_avg.mult(Boid.enemyFact / numEnemies)

            if (numFriends > 0) this.velocity.add(pos_avg)
            if (numEnemies > 0) this.velocity.add(enemy_avg)

            this.velocity.x += (vel_avg.x - this.velocity.x) * Boid.alignmentFact;
            this.velocity.y += (vel_avg.y - this.velocity.y) * Boid.alignmentFact;
        }
        // goal-seeking
        if (this.type == 0) {
            const path = new Vector(goal.x-this.x, goal.y-this.y).normalised()
            this.velocity.x += (path.x - this.velocity.x) * Boid.goalFact
            this.velocity.y += (path.y - this.velocity.y) * Boid.goalFact
        } else if (this.type == 1) {
            const path = new Vector(goal2.x-this.x, goal2.y-this.y).normalised()
            this.velocity.x += (path.x - this.velocity.x) * Boid.goalFact
            this.velocity.y += (path.y - this.velocity.y) * Boid.goalFact
        }


        // dodge walls
        const sep_range = this.type != 3 ? 2 * Boid.sep_range : Boid.sep_range
        if (this.x - sep_range < 0)
            this.velocity.x += Boid.wallFact;
        if (this.x + sep_range > baseWidth)
            this.velocity.x -= Boid.wallFact;
        if (this.y - sep_range < 0)
            this.velocity.y += Boid.wallFact;
        if (this.y + sep_range > baseHeight)
            this.velocity.y -= Boid.wallFact;

        if (this.velocity.x == 0 && this.velocity.y == 0) {
            this.velocity.x = 0.01;
            this.velocity.y = 0.01;
        }
        this.facing = this.velocity.normalised()
        if (this.velocity.sqrMag() > 36) {
            this.velocity = new Vector(this.facing.x, this.facing.y)
            // this.velocity = this.facing
            this.velocity.mult(6)
        }

    }

    move() {
        const step = this.velocity
        step.mult(speed)
        if (!isNaN(step.x)) this.x += step.x
        if (!isNaN(step.y)) this.y += step.y
    }

    draw(ctx: CanvasRenderingContext2D, scale : Vector): void {

        const facing = this.facing
        facing.mult(7)
        const cosT = -.5
        const sinT = 1 / Math.sqrt(3)
        const x1 = this.x + facing.x; const y1 = this.y + facing.y;
        const x2 = this.x + cosT*facing.x - sinT*facing.y; const y2 = this.y + sinT*facing.x + cosT*facing.y;
        const x3 = this.x + cosT*facing.x + sinT*facing.y; const y3 = this.y - sinT*facing.x + cosT*facing.y;
        if (ctx != null)
            ctx.fillStyle = Boid.drawCols[this.type]
        ctx?.beginPath();
        ctx?.moveTo(x1 * scale.x, y1 * scale.y);
        ctx?.lineTo(x2 * scale.x, y2 * scale.y);
        ctx?.lineTo(x3 * scale.x, y3 * scale.y);
        ctx?.lineTo(x1 * scale.x, y1 * scale.y);
        ctx?.fill();
    }
}


class QuadTree<Type extends Object> {
    private isLeaf: boolean = true;
    private elems: Type[] = [];
    private subs: QuadTree<Type>[] = []; // 0 top-left, 1 top-right, 2 bot-left, 3 bot-right
    private count: number = 0; // number of elements in quadtree

    constructor (protected x: number,
                 protected y: number,
                 protected width: number,
                 protected height: number,
                 protected bucket: number,
                 protected slack: number = 0)
    {
    }

    addElem (elem: Type) {
        this.count++
        if (this.isLeaf) {
            this.elems.push(elem);
            if (this.elems.length > this.bucket) {
                // turn this object into a recursive one
                this.isLeaf = false;
                const w: number = (this.width/2)
                const h: number = (this.height/2)
                this.subs = [
                    new QuadTree(this.x, this.y, w, h, this.bucket, this.slack),
                    new QuadTree(this.x+w, this.y, this.width-w, h, this.bucket, this.slack),
                    new QuadTree(this.x, this.y+h, w, this.height-h, this.bucket, this.slack),
                    new QuadTree(this.x+w, this.y+h, this.width-w, this.height-h, this.bucket, this.slack),
                ]
                for (const e of this.elems)
                    this.getSub(e).addElem(e);

            }
        }
        else {
            this.getSub(elem).addElem(elem);
        }
    }


    reset() {
        this.subs = []
        this.elems = []
        this.isLeaf = true;
    }

    getAll(): Type[] {
        if (this.isLeaf) {
            return this.elems;
        }
        else {
            const res = this.subs.reduce((acc: Type[], elem: QuadTree<Type>) => acc.concat(elem.getAll()), []);
            this.count = res.length;
            return res;
        }
    }

    allInRange(o: Type, range: number): Type[] {
        if (this.isLeaf) {
            return this.elems.filter(y => pythag_comp(o, range, y))
        } else {
            const pointDistance = new Vector(Math.abs(o.x - this.subs[3].x), Math.abs(o.y - this.subs[3].y));

            if (pointDistance.x > this.subs[3].width+range) return []
            if (pointDistance.y > this.subs[3].height+range) return []

            if (pointDistance.x > this.subs[3].height && pointDistance.y > this.subs[3].height
                && !pythag_comp(pointDistance, range, new Vector(this.subs[3].width, this.subs[3].height))) return []
            // else inside this quad
            let results: Type[] = [];
            this.subs.forEach(sub => results = results.concat(sub.allInRange(o, range)))

            return results;

        }
    }

    // this needs to be its own function as when an object moves it may change where it is in the quadtree
    moveAll() : Type[] {
        let toReturn : Type[] = [];
        if (this.isLeaf) {
            this.elems.forEach((elem, index) => {
                elem.move()
                if (!this.inside(elem)) {
                    toReturn.push(elem);
                    this.elems.splice(index, 1);
                }
            })
        } else {
            this.subs.forEach(sub => toReturn.push(...sub.moveAll()))
            // filter out objects that moved from one sub to another
            const toMove = toReturn.filter(obj => this.inside(obj))
            toReturn = toReturn.filter(obj => !this.inside(obj))
            toMove.forEach(obj => this.getSub(obj).addElem(obj))
            this.count -= toReturn.length;
            console.log(this.bucket - this.slack)
            if (this.count <= this.bucket - this.slack) {
                this.elems = this.getAll()
                this.subs = []
                this.isLeaf = true;
            }
        }
        return toReturn;
    }

    // draw method to see boxes for debug purposes
    draw(ctx: CanvasRenderingContext2D, scale: Vector): void {
        if (this.isLeaf) {
            if (ctx != null) ctx.strokeStyle = "white"
            ctx?.beginPath()
            ctx?.rect(this.x * scale.x, this.y * scale.y, this.width * scale.x, this.height * scale.y)
            ctx?.stroke()
        } else this.subs.forEach(sub => sub.draw(ctx, scale))
    }

    private inside(o : Object) : boolean {
        return (this.x <= o.x && o.x <= this.x + this.width && this.y <= o.y && o.y <= this.y + this.height);
    }

    private getSub(o: Object): QuadTree<Type> {
        const midx: number = this.x + (this.width/2)
        const midy: number = this.y + (this.height/2)
        return this.subs[(o.x < midx ? 0 : 1) + (o.y < midy ? 0 : 2)];
    }

}

const quad = new QuadTree<Boid>(0,0,baseWidth,baseHeight,12, 4);
let ctx: CanvasRenderingContext2D | null;

let boids : Boid[] = []


function set_goal() {
    goal = new Vector(100+ Math.floor(Math.random()*(baseWidth-200)), 100+Math.floor(Math.random()*(baseHeight-200)));
    goal2 = new Vector(100+Math.floor(Math.random()*(baseWidth-200)), 100+Math.floor(Math.random()*(baseHeight-200)));
}

function draw_goal(ctx: CanvasRenderingContext2D, scale : Vector): void {
    quad.getAll()
    if (ctx != null) ctx.fillStyle = "yellow"
    ctx?.beginPath()
    ctx?.arc(goal.x * scale.x, goal.y * scale.y, 10, 0, 2 * Math.PI)
    ctx?.fill()
    if (ctx != null) ctx.fillStyle = "lime"
    ctx?.beginPath()
    ctx?.arc(goal2.x * scale.x, goal2.y * scale.y, 10, 0, 2 * Math.PI)
    ctx?.fill()
}

let showQuads = false


function update() {

    if (ctx != null) {
        ctx.canvas.width = ctx.canvas.offsetWidth;
        ctx.canvas.height = ctx.canvas.offsetHeight;
        console.log(parent)
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        boids.forEach(boid => boid.update(function (a,b){return quad.allInRange(a,b)}));
        const scale = new Vector(ctx.canvas.width / baseWidth, ctx.canvas.height / baseHeight);
        if (showQuads) quad.draw(ctx, scale)
        draw_goal(ctx, scale)
        const lost = quad.moveAll()
        lost.forEach(boid => {
            boid.x = baseWidth / 2; boid.y = baseHeight / 2
            quad.addElem(boid)
        })
        boids.forEach(elem => elem.draw(ctx as CanvasRenderingContext2D, scale))
    }

}



function Boids({className, id, showQuad = false} : {className: string, id: string, showQuad: boolean}) {
    const ref = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (ref.current) {
            quad.reset()


            ctx = ref.current.getContext('2d')
            boids = []
            for (let y = 0; y < yellow_boids; y++)
                boids.push(new Boid(Math.floor(Math.random() * baseWidth), Math.floor(Math.random() * baseHeight), 0))
            for (let y = 0; y < green_boids; y++)
                boids.push(new Boid(Math.floor(Math.random() * baseWidth), Math.floor(Math.random() * baseHeight), 1))
            for (let y = 0; y < blue_boids; y++)
                boids.push(new Boid(Math.floor(Math.random() * baseWidth), Math.floor(Math.random() * baseHeight), 2))
            for (let y = 0; y < red_boids; y++)
                boids.push(new Boid(Math.floor(Math.random() * baseWidth), Math.floor(Math.random() * baseHeight), 3))
            boids.forEach(elem => quad.addElem(elem))
            //Implementing the setInterval method
            const interval = setInterval(() => {
                // if (ref.current) {
                //   ref.current.width = screen.width
                //   ref.current.height = screen.height
                // }
                update()
            }, 25);

            showQuads = showQuad

            const goal_interval = setInterval(() => {set_goal()}, 10000)

            //Clearing the interval
            return () => {clearInterval(interval); clearInterval(goal_interval)};

        }
    }, [])

    // return <canvas ref={ref} width="2000" height="1000" />
    return <canvas ref={ref} className={className} id={id}/>
}

export default Boids