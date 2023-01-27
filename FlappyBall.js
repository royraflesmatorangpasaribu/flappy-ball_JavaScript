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
