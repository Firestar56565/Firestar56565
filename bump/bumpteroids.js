var shipImage;
var ship;
var asteroids;
var bullets;
var shipImage, bulletImage, particleImage;
var mines;
var minesImage;

function setup() {
    createCanvas(windowWidth, windowHeight);
    
    ship = createSprite(width/2, height/2);
    ship.maxSpeed = 6;
    ship.friction = .98;
    shipImage = loadImage("images/asteroids_ship0001.png");
    ship.addImage("normal", shipImage);
    
    ship.addAnimation("thrust", "images/asteroids_ship0002.png", "images/asteroids_ship0003.png", "images/asteroids_ship0004.png", "images/asteroids_ship0005.png", "images/asteroids_ship0006.png", "images/asteroids_ship0007.png");
    
    bullets = new Group();
    asteroids = new Group();
    mines = new Group();
    
    for (var i = 0; i<8; i++) {
    var ang = random(360);
    var px = width/2 + 1000 * cos(radians(ang));
    var py = height/2 + 1000* sin(radians(ang));
    createAsteroid(3, px, py);
    }
    
    shipImage = loadImage("images/asteroids_ship0001.png");
    
    bulletImage = loadImage("images/blueblast.png");
    
    particleImage = loadImage("images/asteroids_particle.png");
    
    minesImage = loadImage("images/asteroids_bullet.png");
}

function draw() {
    
    background(120, 120, 120);
    fill(254,190,190);
    textAlign(RIGHT);
    textSize(12);
    
    text("W + A + D keys to move. K to shoot. I to place bombs. M to spawn asteroids. Good luck!", width-60, 30);
    
    // set up a for loop based on the length of any sprite
    for (var i=0; i<allSprites.length; i++) {
    // create an array for each individual sprite
    var s = allSprites[i];
    
    // If the sprite's x position is less than or equal to 0 (the left edge),
    // then set the new x position to the value of the width of the window (on the right)
    if (s.position.x<-0) s.position.x = width;

    // If the sprite's x position is greater than the width of the windows (right edge)
    // then set the new x position to be 0 (left edge)
    if (s.position.x>width) s.position.x = 0;

    // If the sprite's y position is less than or equal to 0 (the top)
    // then set the new y position to be the height of the window (the bottom)
    if (s.position.y<-0) s.position.y = height;

    // If the sprite's y position is greater than the windows's height (bottom)
    // then set the new y position to be 0 (the top)
    if (s.position.y>height) s.position.y = 0;
    }
    
    if (keyDown("W")) {
        ship.addSpeed(.2, ship.rotation);
        ship.changeAnimation("thrust");
    }
    else {
        ship.changeAnimation("normal");
    }
    
    asteroids.overlap(bullets, asteroidHit);
    asteroids.overlap(mines, asteroidBombed);
    
    if (keyDown("M")) {
        for (var i = 0; i<8; i++) {
        var ang = random(360);
        var px = width/2 + 1000 * cos(radians(ang));
        var py = height/2 + 1000* sin(radians(ang));
        createAsteroid(3, px, py);
        }
    }
    
    if (keyDown("A"))
        ship.rotation -= 4;
    
    
    if (keyDown("D"))
        ship.rotation += 4;
        
    
    
    if (keyDown("J"))
        ship.rotation -= 10;
    
    
    if (keyDown("L"))
        ship.rotation += 10;
    
    
    if (keyWentDown("I")) {
    var mine = createSprite(ship.position.x, ship.position.y);
    mine.addImage(minesImage);
    mine.setSpeed(0, ship.rotation);
    mine.life = 3000;
    mines.add(mine);
    }



    if (keyDown("K")) {
    var bullet = createSprite(ship.position.x, ship.position.y);
    bullet.addImage(bulletImage);
    bullet.setSpeed(10+ship.getSpeed(), ship.rotation);
    bullet.life = 30;
    bullets.add(bullet);
    }
    
    
    drawSprites();

}


function createAsteroid(type, x, y) {
    var a = createSprite(x, y);
    var img  = loadImage("images/asteroid"+floor(random(0,3))+".png");
    a.addImage(img);
    
    a.type = type;
    a.setSpeed(2.5-(type/2), random(360));
    a.rotationSpeed = .5;
    
    if (type == 2) a.scale = .6; // 60% of size
    if (type == 1) a.scale = .3; // 30% of size
    
    asteroids.add(a);
    return a;
}

function asteroidHit(asteroid, bullet) {
    var newType = asteroid.type-1;
    
    if (newType>0) {
        createAsteroid(newType, asteroid.position.x, asteroid.position.y);
        createAsteroid(newType, asteroid.position.x, asteroid.position.y);
    }
    
    for (var i=0; i<10; i++) {
        var p = createSprite(bullet.position.x, bullet.position.y);
        p.addImage(particleImage);
        p.setSpeed(random(3,5), random(360));
        p.friction = 0.95;
        p.life = 15;
        
    }
    bullet.remove();
    asteroid.remove();
}

function asteroidBombed(asteroid, mine) {
    var newType = asteroid.type-1;
    
    if (newType>0) {
        createAsteroid(newType, asteroid.position.x, asteroid.position.y);
        createAsteroid(newType, asteroid.position.x, asteroid.position.y);
    }
    
    for (var i=0; i<10; i++) {
        var p = createSprite(mine.position.x, mine.position.y);
        p.addImage(particleImage);
        p.setSpeed(random(3,5), random(360));
        p.friction = 0.95;
        p.life = 15;
        
    }
    
    for (var i=0; i<random(3,6); i++) {
    var bullet = createSprite(mine.position.x, mine.position.y);
    bullet.addImage(bulletImage);
    bullet.setSpeed(random(1,5), random(360));
    bullet.life = 300;
    bullets.add(bullet);
    }
    mine.remove();
    asteroid.remove();
}