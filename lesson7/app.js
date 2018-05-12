//create app.js file for phaser

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {preload:preload, create:create, update:update});

var score = 0; 
var life = 3; 

function preload(){
	game.load.image('sky', 'assets/sky.png');
	game.load.image('ground', 'assets/platform.png');
	game.load.image('star', 'assets/star.png');
	game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
	game.load.spritesheet('baddie', 'assets/baddie.png', 32, 32);


}

function create(){
	game.physics.startSystem(Phaser.Physics.ARCADE);
	// Create the sky 
	game.add.sprite(0, 0, 'sky');
	// Create group of platforms
	platforms = game.add.physicsGroup(); 
	platforms.enableBody = true;
	// Create the ground 
	var ground = platforms.create(0, 550, 'ground');
	ground.scale.setTo(2, 2); 
	ground.body.immovable = true; 
	// Create the ledges 
	var ledge = platforms.create(400, 400, 'ground');
	ledge.body.immovable = true;
	ledge = platforms.create(-100, 250, 'ground');
	ledge.body.immovable = true; 

	//set text style 
	var style = {font: "bold 32px Arial", fill: '#fff'}
	//positioning the score 
	scorelabel = game.add.text(300,560, "Score: ", style);
	scoretext = game.add.text(420, 560, score,style);
	scorelabel.setShadow(3,3, 'rgba(0,0,0,0.5)',2);
	scoretext.setShadow(3,3, 'rgba(0,0,0,0.5)',2);

	//positioning the lives 
	lifelabel = game.add.text(10,5, "Score: ", style);
	lifetext = game.add.text(120, 5, score,style);
	lifelabel.setShadow(3,3, 'rgba(0,0,0,0.5)',2);
	lifetext.setShadow(3,3, 'rgba(0,0,0,0.5)',2);

	//lesson8 

	// create the player sprite 
	// starting cooridnatex x,y 
	player = game.add.sprite(32, 400, 'dude'); 
	// animations.add(name of animation, [frames for animation], frames per sec, truelfalse )
	player.animations.add('left', [0, 1, 2, 3], 10, true);
	player.animations.add('right', [5, 6, 7, 8], 10, true);
	game.physics.arcade.enable(player); 
	player.body.bounce.y = 0.2; 
	player.body.gravity.y = 300; 
	// this allows player to collide 
	player.body.collideWorldBounds = true; 

	enemy1 = game.add.sprite(760, 20, 'baddie'); 
	// animations.add(name of animation, [frames for animation], frames per sec, truelfalse )
	enemy1.animations.add('left', [0, 1], 10, true);
	enemy1.animations.add('right', [2, 3], 10, true);
	game.physics.arcade.enable(enemy1); 
	enemy1.body.bounce.y = 0.2; 
	enemy1.body.gravity.y = 500; 
	enemy1.body.collideWorldBounds = true;

	stars = game.add.physicsGroup(); 
	stars.enableBody = true; 
	for(var i = 0; i < 12; i++) {
		var star = stars.create(i * 70, 0, 'star');
		star.body.gravity.y = 200; 
		star.body.bounce.y = 0.7 + Math.random() * 0.2;
	}

	cursors = game.input.keyboard.createCursorKeys(); 
}

function update(){
	game.physics.collide(player, platforms);
	game.physics.collide(stars, platforms);
	game.physics.collide(enemy1, platforms);

	// reset a player's velocity if no events occur 
	player.body.velocity.x = 0; 

	//program movement keys 
	if(cursors.left.isDown) {
		//move left 
		player.body.velocity.x = -150; 
		player.animations.play('left');
	} else if(cursors.right.isDown) {
		player.body.velocity.x = 150; 
		player.animations.play('right');
	} else {
		player.animations.stop(); 
		player.frame = 4; 

	}
	// allow layer to jump if player is touching the ground 
	if(cursor.up.isDown && player.body.touching.down) {
		player.body.velocity.y = -300;
	}
}







