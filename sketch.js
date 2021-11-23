var starImg,bgImg;
var star, starBody;
var fairy, fairyImg, fairySound;
//criar variável para sprite de fada e imgFada

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
    starImg = loadImage("images/star.png");
	bgImg = loadImage("images/starNight.png");
    fairyImg = loadAnimation("images/fairyImage1.png","images/fairyImage2.png");
    fairySound = loadSound("sound/JoyMusic.mp3");
    //carregar animação de fada 
}

function setup() {
    createCanvas(800, 750);

    //escrever código para tocar o som vozFada
    fairySound.play();

    //criar sprite de fada e adicionar animação para fada
    fairy = createSprite(200,500,20,20);
    fairy.addAnimation("fairy",fairyImg);
    fairy.scale = 0.2;

    star = createSprite(650,30);
	star.addImage(starImg);
	star.scale = 0.2;

    engine = Engine.create();
	world = engine.world;

	starBody = Bodies.circle(650 , 30 , 5 , {restitution:0.5, isStatic:true});
	World.add(world, starBody);
	
	Engine.run(engine);

}

function draw() {
    background(bgImg);
    drawSprites();

    star.x = starBody.position.x;
    star.y = starBody.position.y;

    move("a",-10);
    move("d",+10);

    if (keyDown("s")) {
        Matter.Body.setStatic(starBody,false);
    }

    if (starBody.position.y > 460 && fairy.isTouching(star)) {
        Matter.Body.setStatic(starBody,true);
    }
}

function move(key,velocity) {
    if (keyDown(key)) {
        fairy.x = fairy.x + velocity;
    }
}