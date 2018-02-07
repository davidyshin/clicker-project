let canvas, zombie, zombie_walk, zombie_idle, blood_splat;

function preload() {
  zombie_walk = loadAnimation(
    "/animations/zombie/walk/go_1.png",
    "/animations/zombie/walk/go_10.png"
  );
  zombie_idle = loadAnimation(
    "/animations/zombie/attack/hit_1.png",
    "/animations/zombie/attack/hit_7.png"
  );
  blood_splat = loadAnimation(
    "/animations/blood/splat/bloodsplats_0001.png",
    "/animations/blood/splat/bloodsplats_0016.png" 
  )

}

function setup() {
  canvas = createCanvas(450, 320);
  canvas.parent("zombieSprite");
  zombie = createSprite(width / 2, height / 2, 450, 320);
  zombie.addAnimation("zombie_walk", zombie_walk);
  zombie.addAnimation("zombie_idle", zombie_idle);

  zombie.onMousePressed = function() {
    this.changeAnimation("zombie_idle");
    bgClicked()
  };
  zombie.onMouseReleased = function() {
    this.changeAnimation("zombie_walk");
  };
  console.log("game working");
  frameRate(50);
}

function draw() {
  clear();

  drawSprites();
}

function bgClicked() {
  let blood = createSprite(200, 200, 50, 50)
  blood.addAnimation("blood_splat", blood_splat)
  blood.life = 65
}
