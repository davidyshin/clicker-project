let canvas, zombie, zombie_idle;

function preload() {
  zombie_idle = loadAnimation(
    "/animations/zombie/walk/go_1.png",
    "/animations/zombie/walk/go_10.png"
  );

}

function setup() {
  var canvas = createCanvas(350, 350);
  canvas.parent("zombieSprite");
  zombie = createSprite(width/2, height/2, 50, 50);
  zombie.addAnimation("zombie_idle", zombie_idle);
  console.log("game working");
  frameRate(50);
  
}

function draw() {
<<<<<<< HEAD
  clear()
=======
  background(225, 226, 225)
>>>>>>> 85dd31575ac607799aa05296f36bf21e8b273eb8
  drawSprites()

}



