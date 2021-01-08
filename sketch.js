var PLAY = 1;
var END = 0;
var gameState = 1;

var path,boy,cash,diamonds,jwellery,sword,gameOver;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg = loadAnimation("gameOver.png");
}

function setup(){
  createCanvas(400,400);
  path=createSprite(200,200);
  path.addImage(pathImg);
  path.velocityY = 3;

  gameOver = createSprite(200,200,20,20)  
  gameOver.addAnimation("Game Over", endImg)  
  gameOver.depth > path.depth
  gameOver.scale = 0.95  

  boy = createSprite(70,330,20,20);
  boy.addAnimation("SahilRunning",boyImg);
  boy.scale=0.08;
    
  cashG=new Group();
  diamondsG=new Group();
  jwelleryG=new Group();
  swordGroup=new Group();

  boy.setCollider("rectangle",0,0,20,20);
}

function draw() {
  background(0);
  edges= createEdgeSprites();
  boy.collide(edges);
  
  textSize(20);
  fill("blue");
  text("Treasure: "+ treasureCollection,150,30);
  
  drawSprites();
  if (swordGroup.isTouching(boy)){
    gameState = 0
}

  if(gameState === 1){
    if(path.y > 400 ){
      path.y = height/2;
}
   
    boy.x = World.mouseX;
    
    path.velocityY = 4 
    
    gameOver.visible = false
   
    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection = treasureCollection + 50
    } 
    else if (boy.isTouching(diamondsG)) {
      diamondsG.destroyEach();
      treasureCollection = treasureCollection + 100
    }
    else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection = treasureCollection + 70
    }
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();
}
 
  else if (gameState === 0){
    cashG.destroyEach()
    jwelleryG.destroyEach()
    diamondsG.destroyEach()
    swordGroup.destroyEach()
    boy.destroy()
    
    path.velocityY = 0
    
    gameOver.visible = true
  }
}

function createCash() {
  if (World.frameCount % 110 == 0) {
    var cash = createSprite(Math.round(random(50, 350),40, 10,       10));
    cash.addImage(cashImg);
    cash.scale=0.12;
    cash.velocityY = path.velocityY;
    cash.lifetime = 150;
    cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 159 === 0) {
    var diamonds = createSprite(Math.round(random(50, 350),40,       10, 10));
    diamonds.addImage(diamondsImg);
    diamonds.scale=0.03;
    diamonds.velocityY = path.velocityY;
    diamonds.lifetime = 150;
    diamondsG.add(diamonds);
  }
}

function createJwellery() {
  if (World.frameCount % 211 == 0) {
    var jwellery = createSprite(Math.round(random(50, 350),40,       10, 10));
    jwellery.addImage(jwelleryImg);
    jwellery.scale=0.13;
    jwellery.velocityY = path.velocityY;
    jwellery.lifetime = 150;
    jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % Math.round(random(100,200)) === 0) {
    var sword = createSprite(Math.round(random(50, 350),40, 10,       10));
    sword.addImage(swordImg);
    sword.scale=0.1;
    sword.velocityY = path.velocityY;
    sword.lifetime = 150;
    swordGroup.add(sword);
  }
}