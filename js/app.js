// Diamonds to change level
var pos = [0, 100, 200, 300, 400];
var gems = ['images/GemBlue.png', 'images/GemGreen.png', 'images/GemOrange.png'];
var level = 0;

var Diamond = function (x){
	this.x = x;
	this.y = positions[Math.floor(Math.random() * 3)];
	this.w = 70;
	this.h = 70;
	this.sprite = gems[level];
};


Diamond.prototype.render = function(){
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Enemies our player must avoid
var Enemy = function(x, y, speed) {

    this.w = 70;
    this.h = 70;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Enemy movement
Enemy.prototype.update = function(dt) {

    if (this.x < 505) {
        this.x = this.x + (this.speed * dt);
    } else {
        this.x = -10;
        this.y = positions[Math.floor(Math.random() * 3)];
        this.speed = Math.floor(Math.random() * (300 - 80)) + 80;

    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Creation of player class
var sprites  = ['images/char-cat-girl.png', 'images/char-horn-girl.png','images/char-princess-girl.png'];
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = sprites[level];
    this.w = 70;
    this.h = 70;
    this.level = level;

};

Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'left':
            this.x = this.x - 100;
            break;
        case 'up':
            this.y = this.y - 84;
            console.log (player.y);
            break;
        case 'right':
            this.x = this.x + 100;
            break;
        case 'down':
            this.y = this.y + 84;
            break;
    }
};

Player.prototype.update = function(dt) {

	this.sprite = sprites[level];
	this.level = level;
	this.lifes = level;

    if (this.x >= 480 || this.x < 0 || this.y >= 480) {
        this.x = 200;
        this.y = 410;
    } else if (this.y <= 0) {
        this.x = 200;
        this.y = 400;

    }

};
// checking collisions and managing levels
checkCollisions = function() {

    player.box = [player.x, player.y, player.w, player.h];
    diamond.box = [diamond.x, diamond.y, diamond.w, diamond.h];

    for (i = 0; i < allEnemies.length; i++) {
        
        allEnemies[i].box = [allEnemies[i].x, allEnemies[i].y, allEnemies[i].w, allEnemies[i].h];

        if (player.box[0] < allEnemies[i].box[0] + allEnemies[i].box[2] &&
            player.box[0] + player.box[2] > allEnemies[i].box[0] &&
            player.box[1] < allEnemies[i].box[1] + allEnemies[i].box[3] &&
            player.box[3] + player.box[1]> allEnemies[i].box[1]) {

        	level -=1;
        	if (level ==-1) {
        		reset();
        	}
        	allEnemies = [];
    		createEnemies();
    		diamond.sprite = gems[level];
    		diamond.x = pos[Math.floor(Math.random() * 5)];
    		diamond.y = positions[Math.floor(Math.random() * 3)];
            player.x = 200;
            player.y = 400;
        }
    }
    if (player.box[0] < diamond.box[0] + diamond.box[2] &&
            player.box[0] + player.box[2] > diamond.box[0] &&
            player.box[1] < diamond.box[1] + diamond.box[3] &&
            player.box[3] + player.box[1]> diamond.box[1]) {

    		level +=1 ;
    		if (level > 2) {
				reset();
			}
    		allEnemies = [];
    		createEnemies();
    		diamond.sprite = gems[level];
    		diamond.x = pos[Math.floor(Math.random() * 5)];
    		diamond.y = positions[Math.floor(Math.random() * 3)];
    		player.x = 200;
    		player.y = 400;
    	}

};

Player.prototype.render = function() {
	this.level = "level "+level+" of 3";
	this.lifes = "lifes " +level;
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    document.getElementById('level').innerHTML = this.level;
    document.getElementById('lifes').innerHTML = this.lifes;
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
var positions = [60, 143, 226];



var random_speed = function() {
    return Math.floor(Math.random() * (400 - 80)) + 80;
};

var random_y = function() {
    return positions[Math.floor(Math.random() * 3)];
};

var createEnemies = function() {
	var bugs = 6+level*2;

 	   for (var i = 0; i < bugs; i++) {
    	    var bug = new Enemy();
        	bug.speed = random_speed()+1*level;
        	bug.y = random_y();
        	bug.x = 0;
        	allEnemies.push(bug);
    	}
};
createEnemies();

// Place the player object in a variable called player
var player = new Player(200, 400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// create diamonds
var diamond = new Diamond(pos[Math.floor(Math.random()*5)]);


var reset = function () {
        level = 0;
        player.x = 200;
        player.y = 400;
    };
