let p=[];
let n = 100;
var SCROLL_SPEED = 4;
var SCORE = 0;
var x = false;
const GRAVITY = 9.80665;
const JUMP_HEIGHT = 9.0;
const GROUND_HEIGHT = 20; 
const WIDTH = 400;
const HEIGHT = 600;

function setup() {
    createCanvas(WIDTH, HEIGHT);
    for (i=0;i<n;i++){
        xdir= Math.pow(-1,Math.floor(Math.random()*100));
        ydir= Math.pow(-1,Math.floor(Math.random()*100));
        p.push(new SmallBall(random(350),random(350),14,1,xdir,ydir));
        p[i].speed = i % 5 + 1;
    }
}

//menberi angka random integer
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

class SmallBall{
    constructor(x,y,size,speed=3,xDir=1,yDir=0){
        this.posX = x;
        this.posY = y;
        this.size= size;
        this.speed = speed;
        this.xDirection = xDir;
        this.yDirection = yDir;
    }
    
    //menampilkan bola-bola kecil(distraction)
    show(){
        noStroke();
        fill(color(255,255,255));
        circle(this.posX,this.posY,this.size);  
    }

    //pergerakan bola-bola kecil(distraction)
    move(){
        this.posX += this.speed*this.xDirection;
        this.posY += this.speed*this.yDirection;
        if (this.posX>=width || this.posX <= 1)
            this.xDirection *= -1;
        if (this.posY>=height || this.posY <= 1)
            this.yDirection *= -1;
    }
}

class Ball {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.vely = 0;
    }

    //menggambar bola
    draw() {
        fill("#eaff2");
        circle(this.x, this.y, this.size);
    }
    
    //upadate pergerkan bola
    update() {
        this.y += this.vely;
        this.vely = lerp(this.vely, GRAVITY, 0.05);
        this.y = Math.max(this.size / 2, Math.min(this.y, HEIGHT - GROUND_HEIGHT - this.size / 2)); 
    }

    //bola menuju atas
    flap() {
        this.vely = -JUMP_HEIGHT;
    }

    //pengecekan jika bola mengenai rintangan
    checkDeath(obs) {
        for (var obsl of obs.obs_list) {
        if (this.x + this.size / 2 > obsl.x && obsl.height && this.x - this.size / 2 < obsl.x + obs.width && !x) {
            if (this.y - this.size / 2 <= obsl.height || this.y + this.size / 2 >= obsl.height + obs.gap ) {
                x = true;
            }
        }
        //kondisi dimana jika bola terkena rintangan nya bola akan berhenti.
        if(x){
            gameOver();
            SCROLL_SPEED =0;
        }
        //mencetak skor
        if (this.x - this.size / 2 > obsl.x + obs.width && obsl.scored == false) {
            SCORE += 1;
            obsl.scored = true;
        }
        }
    }
}
