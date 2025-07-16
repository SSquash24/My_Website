import { useEffect, useRef } from 'react'


const width = 2000
const height = 1000
const red_boids = 100
const green_boids = 100
const blue_boids = 300
const speed = 1.25

class Vector {
  constructor(public x: number = 0, public y: number = 0) {}



  sqrMag() : number {
    return this.x * this.x + this.y * this.y
  }
  mag() : number {
    return Math.sqrt(this.sqrMag())
  }


  normalised() : Vector {
    const mag = this.mag()
    if (mag == 0) return new Vector(0,0)
    return new Vector(this.x / mag, this.y / mag)
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

  public facing: Vector = new Vector()
  abstract draw(ctx: CanvasRenderingContext2D | null): void;
  abstract move(): void;
}

function pythag_comp(centre: Vector, r: number, point: Vector): boolean {
  return ((centre.x-point.x)**2) + ((centre.y-point.y)**2) < r**2;
}



let goal = new Vector(750, 200);
let goal2 = new Vector(250, 200);



class Boid extends Object {
  static sep_range = 20;
  static avoidFact = 0.8
  static vis_range = 50
  static centeringFact = 0.2
  static alignmentFact = 0.3
  static goalFact = 0.15

  static drawCols = ["red", "lime", "aqua"];

  velocity: Vector = new Vector(1,0);

  constructor(x: number,
              y: number,
              public type: number)
  {
    super(x, y);
  }

  update(boids_func: (pos: Object, range: number) => Object[]) {
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

      vis_birds.forEach(boid => {
        pos_avg.add(new Vector(boid.x - this.x, boid.y - this.y).normalised())
        vel_avg.add(boid.facing)
      })
      pos_avg.mult(Boid.centeringFact / vis_birds.length)
      vel_avg.mult(Boid.alignmentFact / vis_birds.length)

      this.velocity.add(pos_avg)

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
    if (this.x - Boid.sep_range < 0)
      this.velocity.x += Boid.avoidFact;
    if (this.x + Boid.sep_range > width)
      this.velocity.x -= Boid.avoidFact;
    if (this.y - Boid.sep_range < 0)
      this.velocity.y += Boid.avoidFact;
    if (this.y + Boid.sep_range > height)
      this.velocity.y -= Boid.avoidFact;

    if (this.velocity.x == 0 && this.velocity.y == 0) {
      this.velocity.x = 0.01;
      this.velocity.y = 0.01;
    }
    this.facing = this.velocity.normalised()
    if (this.velocity.sqrMag() > 100) {
      this.velocity = this.facing
      this.velocity.mult(10)
    }

  }

  move() {
    const step = this.velocity
    step.mult(speed)
    if (!isNaN(step.x)) this.x += step.x
    if (!isNaN(step.y)) this.y += step.y
  }

  draw(ctx: CanvasRenderingContext2D | null): void {
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
    ctx?.moveTo(x1, y1);
    ctx?.lineTo(x2, y2);
    ctx?.lineTo(x3, y3);
    ctx?.lineTo(x1, y1);
    ctx?.fill();
  }
}


class QuadTree {
  private isLeaf: boolean = true;
  private elems: Object[] = [];
  private subs: QuadTree[] = []; // 0 top-left, 1 top-right, 2 bot-left, 3 bot-right
  private count: number = 0; // number of elements in quadtree

  constructor (protected x: number,
               protected y: number,
               protected width: number,
               protected height: number,
               protected bucket: number)
  {
  }

  addElem (elem: Object) {
    this.count++
    if (this.isLeaf) {
      this.elems.push(elem);
      if (this.elems.length > this.bucket) {
        // turn this object into a recursive one
        this.isLeaf = false;
        const w: number = (this.width/2)
        const h: number = (this.height/2)
        this.subs = [
          new QuadTree(this.x, this.y, w, h, this.bucket),
          new QuadTree(this.x+w, this.y, this.width-w, h, this.bucket),
          new QuadTree(this.x, this.y+h, w, this.height-h, this.bucket),
          new QuadTree(this.x+w, this.y+h, this.width-w, this.height-h, this.bucket),
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

  getAll(): Object[] {
    if (this.isLeaf) {
      return this.elems;
    }
    else {
      const res = this.subs.reduce((acc: Object[], elem: QuadTree) => acc.concat(elem.getAll()), []);
      this.count = res.length;
      return res;
    }
  }

  allInRange(o: Object, range: number): Object[] {
    if (this.isLeaf) {
      return this.elems.filter(y => pythag_comp(o, range, y))
    } else {
      const pointDistance = new Vector(Math.abs(o.x - this.subs[3].x), Math.abs(o.y - this.subs[3].y));

      if (pointDistance.x > this.subs[3].width+range) return []
      if (pointDistance.y > this.subs[3].height+range) return []

      if (pointDistance.x > this.subs[3].height && pointDistance.y > this.subs[3].height
          && !pythag_comp(pointDistance, range, new Vector(this.subs[3].width, this.subs[3].height))) return []
      // else inside this quad
      let results: Object[] = [];
      this.subs.forEach(sub => results = results.concat(sub.allInRange(o, range)))

      return results;

    }
  }

  // this needs to be its own function as when an object moves it may change where it is in the quadtree
  moveAll() : Object[] {
    let toReturn : Object[] = [];
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
      if (this.count <= this.bucket) {
        this.elems = this.getAll()
        this.subs = []
        this.isLeaf = true;
      }
    }
    return toReturn;
  }

  // draw method to see boxes for debug purposes
  draw(ctx: CanvasRenderingContext2D | null): void {
    if (this.isLeaf) {
      ctx?.beginPath()
      ctx?.rect(this.x, this.y, this.width, this.height)
      ctx?.stroke()
    } else this.subs.forEach(sub => sub.draw(ctx))
  }

  private inside(o : Object) : boolean {
    return (this.x <= o.x && o.x <= this.x + this.width && this.y <= o.y && o.y <= this.y + this.height);
  }

  private getSub(o: Object): QuadTree {
    const midx: number = this.x + (this.width/2)
    const midy: number = this.y + (this.height/2)
    return this.subs[(o.x < midx ? 0 : 1) + (o.y < midy ? 0 : 2)];
  }

}

const quad: QuadTree = new QuadTree(0,0,width,height,16);
let ctx: CanvasRenderingContext2D | null;

let boids : Boid[] = []


function set_goal() {
  goal = new Vector(Math.floor(Math.random()*width), Math.floor(Math.random()*height));
  goal2 = new Vector(Math.floor(Math.random()*width), Math.floor(Math.random()*height));
}

function draw_goal(ctx: CanvasRenderingContext2D | null): void {
  quad.getAll()
  if (ctx != null) ctx.fillStyle = "red"
  ctx?.beginPath()
  ctx?.arc(goal.x, goal.y, 10, 0, 2 * Math.PI)
  ctx?.fill()
  if (ctx != null) ctx.fillStyle = "lime"
  ctx?.beginPath()
  ctx?.arc(goal2.x, goal2.y, 10, 0, 2 * Math.PI)
  ctx?.fill()
}

function update() {
  ctx?.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  boids.forEach(boid => boid.update(function (a,b){return quad.allInRange(a,b)}));
  draw_goal(ctx)
  const lost = quad.moveAll()
  lost.forEach(boid => {
    boid.x = width / 2; boid.y = height / 2
    quad.addElem(boid)
  })
  boids.forEach(elem => elem.draw(ctx))
  // quad.draw(ctx)
}


function Boids() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (ref.current) {
      if (boids.length == 0) {
        quad.reset()

        ctx = ref.current.getContext('2d')
        boids = []
        for (let y = 0; y < red_boids; y++)
          boids.push(new Boid(Math.floor(Math.random() * width), Math.floor(Math.random() * height), 0))
        for (let y = 0; y < green_boids; y++)
          boids.push(new Boid(Math.floor(Math.random() * width), Math.floor(Math.random() * height), 1))
        for (let y = 0; y < blue_boids; y++)
          boids.push(new Boid(Math.floor(Math.random() * width), Math.floor(Math.random() * height), 2))
        boids.forEach(elem => quad.addElem(elem))
      }
      //Implementing the setInterval method
      const interval = setInterval(() => {
        update()
      }, 25);

      const goal_interval = setInterval(() => {set_goal()}, 10000)

      //Clearing the interval
      return () => {clearInterval(interval); clearInterval(goal_interval)};

    }
  }, [])

  return <canvas ref={ref} width="2000" height="1000" />
}

export default Boids