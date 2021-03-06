
let public_URL = "https://solar-escape.herokuapp.com/";
let testing_multiplier = 1;
let power = 175 * testing_multiplier;
let game;
let turning_up = false;
let turning_down = false;
let planet;
let ship;
let cursors;
let spaceKey;
let moving = false;
let thrust_start;
let thrust_end;
let HS;
let HS_URL = public_URL + "highscores";
let NEW_URL = public_URL + "newscore";
let win = false;
let exploding = false;
let asteroid_collision;
let sat_collision;
let gravity_burn;
let gravity_shake;
let button_on;
let button_off;
function getRandomInt(max) {
    let  v = Math.floor(Math.random() * Math.floor(max));
   
    return v;
  }
  let battery;
let menu_scene;
let game_scene;
let game_scene_1;
let game_scene_2;
let game_scene_3;
let highscore_scene;
let start_fuel = 3500;
let currentFuel = start_fuel;
let data_entered = false;
let m = false;
let global_music;
let x_divisor = 5;
let y_divisor = 5;
let transitioning = false;
let collision_enemies = [];
let collision_positive = [];
let newGame = function (){
    let public_URL = "https://solar-escape.herokuapp.com/";

power = 175 * testing_multiplier;
game;
turning_up = false;
turning_down = false;
planet;
ship;
cursors;
spaceKey;
moving = false;
currentFuel = start_fuel;
HS;

win = false;

menu_scene;
game_scene;
game_scene_1;
game_scene_2;
game_scene_3;
highscore_scene;

data_entered = false;
m = false;
global_music;
x_divisor = 5;
y_divisor = 5;
transitioning = false;
exploding = false;
    
    game.destroy();
    $( "#thegame" ).empty();
    let gameConfig = {
        type: Phaser.AUTO,
        backgroundColor: 0x444444,
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            parent: "thegame",
            width: 800,
            height: 400
        },dom: {
            createContainer: true
        },
        pixelArt: true,
        physics: {
            default: "arcade"
        },
        audio: {
            disableWebAudio: true
        }
      
    }
    game = new Phaser.Game(gameConfig);
    menu_scene = game.scene.add("Menu", Menu, true);
    game_scene = game.scene.add("Playgame", Playgame, false);
    game_scene_1 = game.scene.add("Playgame_1", Playgame_1, false);
    game_scene_2 = game.scene.add("Playgame_2", Playgame_2, false);
    game_scene_3 = game.scene.add("Playgame_3", Playgame_3, false);
    highscore_scene = game.scene.add("Highscore", Highscore, false);
}
window.onload = function() {
  
    $( "#thegame" ).empty();
    $.ajax({url: HS_URL, success: function(result){
        
        HS = JSON.parse(result);

    }});

      let gameConfig = {
        type: Phaser.AUTO,
        backgroundColor: 0x444444,
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            parent: "thegame",
            width: 800,
            height: 400
        },dom: {
            createContainer: true
        },
        pixelArt: true,
        physics: {
            default: "arcade"
        },
        audio: {
            disableWebAudio: true
        }
      
    }
    game = new Phaser.Game(gameConfig);
    menu_scene = game.scene.add("Menu", Menu, true);
    game_scene = game.scene.add("Playgame", Playgame, false);
    game_scene_1 = game.scene.add("Playgame_1", Playgame_1, false);
    game_scene_2 = game.scene.add("Playgame_2", Playgame_2, false);
    game_scene_3 = game.scene.add("Playgame_3", Playgame_3, false);
    highscore_scene = game.scene.add("Highscore", Highscore, false);



 
    
    
}
let spawn_enemies = function(scene, density, speed)
   {
       collision_enemies = [];
       let y_row = 0;
       for(let i = 0; i<100; i++)
       {
           let x_row = getRandomInt(600)+200
           let rand = getRandomInt(5);
           let key = "satellite"
           if(rand==3) {y_row+=60;key = "debris_1"}
           else if(rand==4) {y_row+=100;key = "debris_2"}
           else{
               y_row+=50;
            key = "satellite";

           }
           y_row+=getRandomInt(i*1000*density);
       let enemy = (scene.physics.add.sprite(x_row, y_row, key));
       enemy.setSize(enemy.body.width*0.7, enemy.body.height*0.7, true);
       let s = getRandomInt(3)+1;
       enemy.speed = s*speed
       collision_enemies.push(enemy);
       }

   }
   let spawn_asteroids = function(scene, density, speed)
   {
       collision_enemies = [];
       let y_row = 0;
       for(let i = 0; i<100; i++)
       {
           let x_row = getRandomInt(600)+200
           let rand = getRandomInt(5);
           let key = "asteroid1"
           if(rand==3) {y_row+=80;key = "asteroid2"}
           
           else{
               y_row+=50;
            key = "asteroid1";

           }
           y_row+=getRandomInt(i*1000*density);
       let enemy = (scene.physics.add.sprite(x_row, y_row, key));
       enemy.setSize(enemy.body.width*0.8, enemy.body.height*0.8, true);
       let s = getRandomInt(3)+1;
       enemy.speed = s*speed
       collision_enemies.push(enemy);
       }

   }
  
class Menu extends Phaser.Scene {
	
	constructor() {
	
        super("Menu");
        menu_scene =this;
        
		

		
	}
		
    preload()
    {
        this.load.html('button', 'assets/audio.html');
        this.load.audio("menu_music", ["assets/menu.mp3"]);
        this.load.audio("button_on", ["assets/button_on.mp3"]);
        this.load.audio("button_off", ["assets/button_off.mp3"]);
        this.load.image('menu_art', 'assets/menu_art.jpg');
        this.load.bitmapFont('atari', 'assets/atari-smooth.png', 'assets/atari-smooth.xml');

    }
   
	create() {
        transitioning = false;
        exploding = false;
        win = false;
        currentFuel = start_fuel;
        let menu_config = 
        {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
        let effect_config = 
        {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        }
        
        this.add.image(0, 0, 'menu_art').setOrigin(0).setScale(1);
        global_music = game.sound.add('menu_music', menu_config);
        button_on = game.sound.add('button_on', effect_config);
        button_off = game.sound.add('button_off', effect_config);
        var element = this.add.dom(game.config.width-40, game.config.height-40).createFromCache('button');
        $("#mute").css({"background": "url('../assets/unmute.png')"});
       
        $("#mute").click(function(){
            if(m){
                button_off.play();
                m= false;
                global_music.stop();
            $("#mute").css({"background": "url('../assets/unmute.png')"});
            }
            else{
                m=true;
                button_on.play();
                global_music.play();
                $("#mute").css({"background": "url('../assets/mute.png')"});
            }
    
        });
    
        
		this.cameras.main.setBackgroundColor('#000000')
		
		
	

       
        this.input.on('pointerdown', function(pointer)
        {
            
            global_music.stop();
            menu_scene.scene.start('Playgame');
            

        });


		
	
					
}
   
	update(){
        
        

}

       
	
	
	


	
	
	

	
 }
class Playgame extends Phaser.Scene{
    

    constructor(){
        
        super("Playgame");
        game_scene = this;
        this.maxDistanceX = game.config.width;
        this.maxDistanceY = game.config.height/2;
        this.counter = 3;
        this.text;
        this.timer;
        transitioning = false;
        exploding = false;

        

        

    }
    preload(){
        
        this.load.bitmapFont('atari', 'assets/atari-smooth.png', 'assets/atari-smooth.xml');
        this.cameras.main.setBackgroundColor('#000000')
        this.load.audio("game_music", ["assets/gameplay.mp3"]);
        this.load.audio("gravity_shake", ["assets/gravity_shake.mp3"]);
        this.load.audio("thrust_start", ["assets/thrust_start.mp3"]);
        this.load.audio("thrust_end", ["assets/thrust_end.mp3"]);
        this.load.audio("satellite_collision", ["assets/satellite_collision.mp3"]);
        this.load.audio("asteroid_collision", ["assets/asteroid_collision.mp3"]);
      
        this.load.audio("gravity_burn", ["assets/gravity_burn.mp3"]);
        this.load.image('planet', 'assets/planet.png');
        this.load.image('earth_art', 'assets/earth.jpg');
        

        this.load.spritesheet('ship', 
    'assets/spaceship.png',
    { frameWidth: 30, frameHeight: 30 }
);
this.load.spritesheet('battery', 
'assets/battery.png',
{ frameWidth: 95, frameHeight: 49 }
);
        this.load.image('satellite', 'assets/satellite.png')
        this.load.image('debris_1', 'assets/debris_1.png')
        this.load.image('debris_2', 'assets/debris_2.png')

    }


    create(){
        transitioning = false;
        exploding = false;
        

        this.add.image(0, 0, 'earth_art').setOrigin(0).setScale(1);

        
        let game_music_config = 
        {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
        let effect_config = 
        {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        }

        global_music= game.sound.add('game_music', game_music_config);
        thrust_start = game.sound.add('thrust_start', effect_config);
        thrust_end = game.sound.add('thrust_end', effect_config);
        sat_collision = game.sound.add('satellite_collision', effect_config);
        gravity_burn = game.sound.add('gravity_burn', effect_config);
        gravity_shake = game.sound.add('gravity_shake', effect_config);
        asteroid_collision = game.sound.add('asteroid_collision', effect_config);
        var element = this.add.dom(game.config.width-40, game.config.height-40).createFromCache('button');
        if(m)
        {
           global_music.play();
        $("#mute").css({"background": "url('../assets/mute.png')"});

        }
        else
        {
        $("#mute").css({"background": "url('../assets/unmute.png')"});
        }

       
        $("#mute").click(function(event){
           
            if(m){
                button_off.play();
                m= false;
                global_music.stop();
            $("#mute").css({"background": "url('../assets/unmute.png')"});
            }
            else{
                m=true;
                button_on.play();
                global_music.play();
                $("#mute").css({"background": "url('../assets/mute.png')"});
            }
    
        });
    
        
      
 
    
        
    this.timer = this.time.addEvent({
        delay: 1000,                // ms
        callback: function(){
            this.counter--;
            if (this.counter==0){this.timer.remove();
            this.text.setText([
                ""
            ]);}
        },
        //args: [],
        callbackScope: this,
        loop: true
    });
        
    this.input.keyboard.on('keydown_A', this.turn_up, this);
    this.input.keyboard.on('keyup_A', this.turning_off_up, this);
    this.input.keyboard.on('keydown_D', this.turn_down, this);
    this.input.keyboard.on('keyup_D', this.turning_off_down, this);
    this.input.keyboard.on('keydown_W', this.throttle, this);
    this.input.keyboard.on('keyup_W', this.stopThrottle, this);
    
    planet = this.physics.add.sprite(0, game.config.height/2, 'planet');
    planet.setVisible(false);
    
    ship = this.physics.add.sprite(game.config.width/7+10,game.config.height/5+70, 'ship');
    
  
    ship.body.allowGravity = false;
    this.anims.create({
        key: 'throttle',
        frames: this.anims.generateFrameNumbers('ship', { start: 0, end: 4}),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'explode',
        frames: this.anims.generateFrameNumbers('ship', { start: 5, end: 8}),
        frameRate: 5,
        repeat: -1
    });
    
 
 
    let explode = function()
    {
      
        if(exploding == false)
        {sat_collision.play();
        exploding = true;
        }
        else return;
        
        ship.anims.stop();
        ship.anims.play('explode',true);
        
     
    }
   
   spawn_enemies(this, 1,0.1);
   


        this.physics.add.overlap(ship, collision_enemies, explode, null, this);
        
        this.text = this.add.bitmapText(400, 200, 'atari', '', 38).setOrigin(0.5).setCenterAlign().setInteractive();

        this.text.setText([
            "Hold W - " + this.counter
        ]);
        battery = this.physics.add.sprite(game.config.width-60,30, 'battery');
    battery.setFrame(4);
           
    }


   throttle (event) {

    
    if(exploding)return;
    thrust_end.stop();
    if (!thrust_start.isPlaying)
    thrust_start.play();
        ship.anims.play('throttle', true);
        moving = true;
       
       }
       stopThrottle (event) {
       
        if(exploding)return;
        thrust_start.stop();
    thrust_end.play();
        ship.anims.stop();
      
        moving = false;
        ship.setFrame(0);
            
       
       }
       turn_up (event) {

      
        turning_up=true;
        
   
   }
   turn_down (event) {

   
    turning_down=true;
    

}
   turning_off_up(event)
   {
  
      
       turning_up = false;
       
   }
   turning_off_down(event)
   {
   
      
       turning_down = false;
   }
    update(){
        
        if(currentFuel < (start_fuel/5))
        battery.setFrame(0);
        else if(currentFuel < (start_fuel/5)*2)
        battery.setFrame(1);
        else if(currentFuel < (start_fuel/5)*3)
        battery.setFrame(2);
        else if(currentFuel < (start_fuel/5)*4)
        battery.setFrame(3);
        else if(currentFuel < (start_fuel/5)*5)
        battery.setFrame(4);
        if(ship.anims.currentFrame!=null && exploding){
     
            ship.anims.play('explode',true);
        if(ship.anims.currentFrame.index === 4 && exploding){
        
            win = false;
            game_scene.scene.start('Highscore');
        }
    }
        collision_enemies.forEach(function (child) {
           
            let from_center = Math.abs(child.body.y-200)+100;
            child.body.velocity.y = -(child.speed)*(from_center)*2;

     
            

            child.angle+=child.speed;
            if (child.body.y > game.config.height || child.body.y < -50)return;
            if(child.body.y > game.config.height /2)
            {
                    child.body.x-=(game.config.height/2 - child.body.y)/250;
            }
            else
            {
                child.body.x-=(game.config.height/2- child.body.y)/250;
            }
         
        
        });
        if(exploding)
    {
        ship.body.velocity.x = 0;
        ship.body.velocity.y = 0;
        return;
    }
    if(currentFuel<=0){
        if(exploding == false)
        {sat_collision.play();
            exploding = true;
            }
        else return;
        
        ship.anims.stop();
        ship.anims.play('explode',true);}
        if(this.counter>0)
        {
        this.text.setText([
            "Hold W - " + this.counter
        ]);
        return;
    }

   
    if(transitioning){
       
        return;
    }
    
    if(ship.body.x >= game.config.width)
    {
       
        this.stopThrottle();
        
        game_scene.scene.start('Playgame_1');

    }
    else if (ship.body.x<=0-ship.body.width)
    {
        //this.stopThrottle();
       if(transitioning == false)
       transitioning =  true;
       else
       return;
        win = false;
        var c = 0;
        ship.body.velocity.y = 0;
        ship.body.velocity.x = 0;
        ship.body.gravity = 0;
        ship.body.reset(-15, ship.body.y);
        
        
        var inter = setInterval(function(){
           
           ship.body.updateFromGameObject();
           if(!gravity_burn.isPlaying)
           gravity_burn.play()
           if(ship.body.x<-100)
           {
     
           }
           else
           {
            c++; 
          
            ship.body.velocity.x = 10;
            ship.body.velocity.y = 10;

            
            ship.angle+=7;
            ship.setScale(1-(c/100));
            if(c==100)
        {
            
          
            clearInterval(inter)
            
            
            game_scene.scene.start('Highscore');
        }}}, 50);
       
        
    }



    
    ship.body.gravity = new Phaser.Geom.Point(planet.body.x - ship.body.x, planet.body.y - ship.body.y);
 
    ship.body.velocity.x =-(this.maxDistanceX +ship.body.gravity.x)
    let oldVelocityY = ship.body.velocity.y;
    let newVelocityY = ship.body.gravity.y >0 ? (this.maxDistanceY - ship.body.gravity.y)/1.2 : -((this.maxDistanceY - Math.abs(ship.body.gravity.y))/1.2);
    if((oldVelocityY >0 && newVelocityY < 0) || (oldVelocityY <0 && newVelocityY >0))ship.body.velocity.y = 0;
    else
    ship.body.velocity.y = newVelocityY;

    ship.body.velocity.y/=y_divisor;
    ship.body.velocity.x/=x_divisor;
    if(ship.body.y>game.config.height/2-10 && ship.body.y<game.config.height/2+10)
    {
        if(!gravity_shake.isPlaying)
        gravity_shake.play();
    }
    else gravity_shake.stop();
  
        if(turning_up){
        
        ship.angle-=1;
        }
        if(turning_down){
           ship.angle+=1;
        }
        if(moving)
        {
            currentFuel-=1;
            ship.body.velocity.x += Math.cos(ship.angle*Math.PI/180)*power;
            if(ship.body.y+ship.body.height <game.config.height && ship.body.y >0)
            ship.body.velocity.y += Math.sin(ship.angle*Math.PI/180)*power;
        }
        else{
            ship.body.velocity.x += 0;
            ship.body.velocity.y += 0;
        }

      
    

      
 
   
  
        
       
    
    

}





}












class Playgame_1 extends Phaser.Scene{
    

    constructor(){
        
        super("Playgame_1");
        game_scene_1 = this;
        this.maxDistanceX = game.config.width;
        this.maxDistanceY = game.config.height/2;
        this.counter = 3;
        this.text;
        this.timer;
        transitioning = false;
        exploding = false;
       

        
        

        

    }
    preload(){
        
        this.load.bitmapFont('atari', 'assets/atari-smooth.png', 'assets/atari-smooth.xml');
        this.cameras.main.setBackgroundColor('#000000')
        this.load.spritesheet('battery', 
'assets/battery.png',
{ frameWidth: 95, frameHeight: 49 }
);
        this.load.image('planet', 'assets/planet.png');
        this.load.image('mars_art', 'assets/mars.jpg');
        this.load.image('satellite', 'assets/satellite.png')
        this.load.image('debris_1', 'assets/debris_1.png')
        this.load.image('debris_2', 'assets/debris_2.png')


        this.load.spritesheet('ship', 
    'assets/spaceship.png',
    { frameWidth: 30, frameHeight: 30 }
);

    }
    create(){
        x_divisor = 4;
        y_divisor = 4;
        transitioning = false;
        exploding = false;
        this.add.image(0, 0, 'mars_art').setOrigin(0).setScale(1);
        let game_music_config = 
        {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }

        
        var element = this.add.dom(game.config.width-40, game.config.height-40).createFromCache('button');
        if(m)
        {
          
        $("#mute").css({"background": "url('../assets/mute.png')"});

        }
        else
        {
        $("#mute").css({"background": "url('../assets/unmute.png')"});
        }

       
        $("#mute").click(function(){
            if(m){
                m= false;
                button_off.play();
                global_music.stop();
            $("#mute").css({"background": "url('../assets/unmute.png')"});
            }
            else{
                m=true;
                button_on.play();
                global_music.play();
                $("#mute").css({"background": "url('../assets/mute.png')"});
            }
    
        });
    
        
     
 

 
       
        
    this.timer = this.time.addEvent({
        delay: 1000,                // ms
        callback: function(){
            this.counter--;
            if (this.counter==0){this.timer.remove();
            this.text.setText([
                ""
            ]);}
        },
        //args: [],
        callbackScope: this,
        loop: true
    });
        
    this.input.keyboard.on('keydown_A', this.turn_up, this);
    this.input.keyboard.on('keyup_A', this.turning_off_up, this);
    this.input.keyboard.on('keydown_D', this.turn_down, this);
    this.input.keyboard.on('keyup_D', this.turning_off_down, this);
    this.input.keyboard.on('keydown_W', this.throttle, this);
    this.input.keyboard.on('keyup_W', this.stopThrottle, this);
    // cursors = this.input.keyboard.createCursorKeys();
    planet = this.physics.add.sprite(0, game.config.height/2, 'planet');
    planet.setVisible(false);
    ship = this.physics.add.sprite(game.config.width/7+10,game.config.height/5+70, 'ship');
    
    
    ship.body.allowGravity = false;
    this.anims.create({
        key: 'throttle',
        frames: this.anims.generateFrameNumbers('ship', { start: 0, end: 4}),
        frameRate: 10,
        repeat: -1
    });
 
    this.anims.create({
        key: 'explode',
        frames: this.anims.generateFrameNumbers('ship', { start: 5, end: 8}),
        frameRate: 5,
        repeat: -1
    });
 
    let explode = function()
    {
      
        if(exploding == false)
        {sat_collision.play();
            exploding = true;
            }
       
        else return;
        
        ship.anims.stop();
        ship.anims.play('explode',true);
        
        
     
    }
   
   spawn_enemies(this, 0.9,0.15);
   


        this.physics.add.overlap(ship, collision_enemies, explode, null, this);
        this.text = this.add.bitmapText(400, 200, 'atari', '', 38).setOrigin(0.5).setCenterAlign().setInteractive();

        this.text.setText([
            "Hold W - " + this.counter
        ]);
        battery = this.physics.add.sprite(game.config.width-60,30, 'battery');
    battery.setFrame(4);
    }


   throttle (event) {

    if(exploding)return;
    thrust_end.stop();
    if (!thrust_start.isPlaying)
    thrust_start.play();
        ship.anims.play('throttle', true);
        moving = true;
       
       }
       stopThrottle (event) {
        if(exploding)return;
        thrust_start.stop();
        thrust_end.play();
        ship.anims.stop();
      
        moving = false;
        ship.setFrame(0);
            
       
       }
       turn_up (event) {


        turning_up=true;
        
   
   }
   turn_down (event) {


    turning_down=true;
    

}
   turning_off_up(event)
   {

    
       turning_up = false;
       
   }
   turning_off_down(event)
   {

    
       turning_down = false;
   }
    update(){
        if(currentFuel < (start_fuel/5))
        battery.setFrame(0);
        else if(currentFuel < (start_fuel/5)*2)
        battery.setFrame(1);
        else if(currentFuel < (start_fuel/5)*3)
        battery.setFrame(2);
        else if(currentFuel < (start_fuel/5)*4)
        battery.setFrame(3);
        else if(currentFuel < (start_fuel/5)*5)
        battery.setFrame(4);

        if(ship.anims.currentFrame!=null && exploding){
         
            ship.anims.play('explode',true);
        if(ship.anims.currentFrame.index === 4 && exploding){
            win = false;
            game_scene_1.scene.start('Highscore');
        }
    }
        collision_enemies.forEach(function (child) {
            
            let from_center = Math.abs(child.body.y-200)+100;
            child.body.velocity.y = -(child.speed)*(from_center);
            

            child.angle+=child.speed;
            if (child.body.y > game.config.height || child.body.y < -50)return;
            if(child.body.y > game.config.height /2)
            {
                    child.body.x-=(game.config.height/2 - child.body.y)/250;
            }
            else
            {
                child.body.x-=(game.config.height/2- child.body.y)/250;
            }
        
        });
        if(exploding)
    {
        ship.body.velocity.x = 0;
        ship.body.velocity.y = 0;
        return;
    }
    if(currentFuel<=0){
        if(exploding == false)
        {sat_collision.play();
            exploding = true;
            }
        else return;
        
        ship.anims.stop();
        ship.anims.play('explode',true);}
        if(this.counter>0)
        {
        this.text.setText([
            "Hold W - " + this.counter
        ]);
        return;
    }
    if(transitioning){
       
        return;
    }
    
    if(ship.body.x >= game.config.width)
    {
       
        this.stopThrottle();
        
        game_scene_1.scene.start('Playgame_2');

    }
    else if (ship.body.x<=0-ship.body.width)
    {
       
        if(transitioning == false)
       transitioning =  true;
       else
       return;
        win = false;
        var c = 0;
        ship.body.velocity.y = 0;
        ship.body.velocity.x = 0;
        ship.body.gravity = 0;
        ship.body.reset(-15, ship.body.y);
        
        
        var inter = setInterval(function(){
           
           ship.body.updateFromGameObject();
           if(!gravity_burn.isPlaying)
           gravity_burn.play()
           if(ship.body.x<-100)
           {
     
           }
           else
           {
            c++; 
          
            ship.body.velocity.x = 10;
            ship.body.velocity.y = 10;

            
            ship.angle+=7;
            ship.setScale(1-(c/100));
            if(c==100)
        {
      
            clearInterval(inter)
            
            
            game_scene_1.scene.start('Highscore');
        }}}, 50);
    }




    ship.body.gravity = new Phaser.Geom.Point(planet.body.x - ship.body.x, planet.body.y - ship.body.y);
 
    ship.body.velocity.x =-(this.maxDistanceX +ship.body.gravity.x)
    let oldVelocityY = ship.body.velocity.y;
    let newVelocityY = ship.body.gravity.y >0 ? (this.maxDistanceY - ship.body.gravity.y)/1.2 : -((this.maxDistanceY - Math.abs(ship.body.gravity.y))/1.2);
    if((oldVelocityY >0 && newVelocityY < 0) || (oldVelocityY <0 && newVelocityY >0))ship.body.velocity.y = 0;
    else
    ship.body.velocity.y = newVelocityY;

    ship.body.velocity.y/=y_divisor;
    ship.body.velocity.x/=x_divisor;

    if(ship.body.y>game.config.height/2-10 && ship.body.y<game.config.height/2+10)
    {
        if(!gravity_shake.isPlaying)
        gravity_shake.play();
    }
    else gravity_shake.stop();
        if(turning_up){
        
        ship.angle-=1;
        }
        if(turning_down){
           ship.angle+=1;
        }
        if(moving)
        {
            currentFuel-=1;
            ship.body.velocity.x += Math.cos(ship.angle*Math.PI/180)*power;
            if(ship.body.y+ship.body.height <game.config.height && ship.body.y >0)
            ship.body.velocity.y += Math.sin(ship.angle*Math.PI/180)*power;
        }
        else{
            ship.body.velocity.x += 0;
            ship.body.velocity.y += 0;
        }

      
    

      
 
   
  
        
       
    
    

}





}














class Playgame_2 extends Phaser.Scene{
    

    constructor(){
        
        super("Playgame_2");
        game_scene_2 = this;
        this.maxDistanceX = game.config.width;
        this.maxDistanceY = game.config.height/2;
        this.counter = 3;
        this.text;
        this.timer;
        transitioning = false;
        exploding = false;

        

        

        

    }
    preload(){
        
        this.load.image('asteroid1', 'assets/asteroid1.png')
        this.load.image('asteroid2', 'assets/asteroid2.png')

        this.load.spritesheet('battery', 
'assets/battery.png',
{ frameWidth: 95, frameHeight: 45 }
);
        this.load.bitmapFont('atari', 'assets/atari-smooth.png', 'assets/atari-smooth.xml');
        this.cameras.main.setBackgroundColor('#000000')
        
        this.load.image('planet', 'assets/planet.png');
        this.load.image('jupiter_art', 'assets/jupiter.jpg');

        this.load.spritesheet('ship', 
    'assets/spaceship.png',
    { frameWidth: 30, frameHeight: 30 }
);

    }
    create(){
        x_divisor = 5;
        y_divisor = 5;
        transitioning = false;
        exploding = false;
        this.add.image(0, 0, 'jupiter_art').setOrigin(0).setScale(1);
        let game_music_config = 
        {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }

        
        var element = this.add.dom(game.config.width-40, game.config.height-40).createFromCache('button');
        if(m)
        {
           
        $("#mute").css({"background": "url('../assets/mute.png')"});

        }
        else
        {
        $("#mute").css({"background": "url('../assets/unmute.png')"});
        }

       
        $("#mute").click(function(){
            if(m){
                m= false;
                button_off.play();
                global_music.stop();
            $("#mute").css({"background": "url('../assets/unmute.png')"});
            }
            else{
                m=true;
                button_on.play();
                global_music.play();
                $("#mute").css({"background": "url('../assets/mute.png')"});
            }
    
        });
    
        
       
 
   
        
    this.timer = this.time.addEvent({
        delay: 1000,                // ms
        callback: function(){
            this.counter--;
            if (this.counter==0){this.timer.remove();
            this.text.setText([
                ""
            ]);}
        },
        //args: [],
        callbackScope: this,
        loop: true
    });
        
    this.input.keyboard.on('keydown_A', this.turn_up, this);
    this.input.keyboard.on('keyup_A', this.turning_off_up, this);
    this.input.keyboard.on('keydown_D', this.turn_down, this);
    this.input.keyboard.on('keyup_D', this.turning_off_down, this);
    this.input.keyboard.on('keydown_W', this.throttle, this);
    this.input.keyboard.on('keyup_W', this.stopThrottle, this);
    // cursors = this.input.keyboard.createCursorKeys();
    planet = this.physics.add.sprite(0, game.config.height/2, 'planet');
    planet.setVisible(false);
    ship = this.physics.add.sprite(game.config.width/7+10,game.config.height/5+70, 'ship');
    
   
    ship.body.allowGravity = false;
    this.anims.create({
        key: 'throttle',
        frames: this.anims.generateFrameNumbers('ship', { start: 0, end: 4}),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'explode',
        frames: this.anims.generateFrameNumbers('ship', { start: 5, end: 8}),
        frameRate: 5,
        repeat: -1
    });
 
    let explode = function()
    {
        if(exploding == false)
        {asteroid_collision.play();
            exploding = true;
            }
        else return;
        
        ship.anims.stop();
        ship.anims.play('explode',true);
        
        
     
    }
   
  
    spawn_asteroids(this, 0.8,0.2);
   


        this.physics.add.overlap(ship, collision_enemies, explode, null, this);
        this.text = this.add.bitmapText(400, 200, 'atari', '', 38).setOrigin(0.5).setCenterAlign().setInteractive();

        this.text.setText([
            "Hold W - " + this.counter
        ]);
        battery = this.physics.add.sprite(game.config.width-60,30, 'battery');
        battery.setFrame(4);
    }


   throttle (event) {


    if(exploding)return;
    thrust_end.stop();
    if (!thrust_start.isPlaying)
    thrust_start.play();
        ship.anims.play('throttle', true);
        moving = true;
       
       }
       stopThrottle (event) {
        if(exploding)return;
        thrust_start.stop();
        thrust_end.play();
        ship.anims.stop();
      
        moving = false;
        ship.setFrame(0);
            
       
       }
       turn_up (event) {


        turning_up=true;
        
   
   }
   turn_down (event) {


    turning_down=true;
    

}
   turning_off_up(event)
   {

    
       turning_up = false;
       
   }
   turning_off_down(event)
   {

    
       turning_down = false;
   }
    update(){
        if(currentFuel < (start_fuel/5))
        battery.setFrame(0);
        else if(currentFuel < (start_fuel/5)*2)
        battery.setFrame(1);
        else if(currentFuel < (start_fuel/5)*3)
        battery.setFrame(2);
        else if(currentFuel < (start_fuel/5)*4)
        battery.setFrame(3);
        else if(currentFuel < (start_fuel/5)*5)
        battery.setFrame(4);
        if(ship.anims.currentFrame!=null && exploding){
            ship.anims.play('explode',true);
        if(ship.anims.currentFrame.index === 4 && exploding){
            win = false;
            game_scene_2.scene.start('Highscore');
        }
    }
        collision_enemies.forEach(function (child) {
            
            let from_center = Math.abs(child.body.y-200)+100;
            child.body.velocity.y = -(child.speed)*(from_center);
            

            child.angle+=child.speed;
            if (child.body.y > game.config.height || child.body.y < -50)return;
            if(child.body.y > game.config.height /2)
            {
                    child.body.x-=(game.config.height/2 - child.body.y)/250;
            }
            else
            {
                child.body.x-=(game.config.height/2- child.body.y)/250;
            }
        
        });
        if(exploding)
    {
        ship.body.velocity.x = 0;
        ship.body.velocity.y = 0;
        return;
    }
    if(currentFuel<=0){
        if(exploding == false)
        {asteroid_collision.play();
            exploding = true;
            }
        else return;
        
        ship.anims.stop();
        ship.anims.play('explode',true);}
        if(this.counter>0)
        {
        this.text.setText([
            "Hold W - " + this.counter
        ]);
        return;
    }
    if(transitioning){
       
        return;
    }
    
    if(ship.body.x >= game.config.width)
    {
       
    
        this.stopThrottle();
        game_scene_2.scene.start('Playgame_3');

    }
    else if (ship.body.x<=0-ship.body.width)
    {
    
        if(transitioning == false)
       transitioning =  true;
       else
       return;
        win = false;
        var c = 0;
        ship.body.velocity.y = 0;
        ship.body.velocity.x = 0;
        ship.body.gravity = 0;
        ship.body.reset(-15, ship.body.y);
        
        
        var inter = setInterval(function(){
           
           ship.body.updateFromGameObject();
           if(!gravity_burn.isPlaying)
           gravity_burn.play()
           if(ship.body.x<-100)
           {
     
           }
           else
           {
            c++; 
          
            ship.body.velocity.x = 10;
            ship.body.velocity.y = 10;

            
            ship.angle+=7;
            ship.setScale(1-(c/100));
            if(c==100)
        {
       
            clearInterval(inter)
            
            
            game_scene_2.scene.start('Highscore');
        }}}, 50);
    }




    ship.body.gravity = new Phaser.Geom.Point(planet.body.x - ship.body.x, planet.body.y - ship.body.y);
 
    ship.body.velocity.x =-(this.maxDistanceX +ship.body.gravity.x)
    let oldVelocityY = ship.body.velocity.y;
    let newVelocityY = ship.body.gravity.y >0 ? (this.maxDistanceY - ship.body.gravity.y)/1.2 : -((this.maxDistanceY - Math.abs(ship.body.gravity.y))/1.2);
    if((oldVelocityY >0 && newVelocityY < 0) || (oldVelocityY <0 && newVelocityY >0))ship.body.velocity.y = 0;
    else
    ship.body.velocity.y = newVelocityY;

    ship.body.velocity.y/=y_divisor;
    ship.body.velocity.x/=x_divisor;
    if(ship.body.y>game.config.height/2-10 && ship.body.y<game.config.height/2+10)
    {
        if(!gravity_shake.isPlaying)
        gravity_shake.play();
    }
    else gravity_shake.stop();
  
        if(turning_up){
        
        ship.angle-=1;
        }
        if(turning_down){
           ship.angle+=1;
        }
        if(moving)
        {
            currentFuel-=1;
            ship.body.velocity.x += Math.cos(ship.angle*Math.PI/180)*power;
            if(ship.body.y+ship.body.height <game.config.height && ship.body.y >0)
            ship.body.velocity.y += Math.sin(ship.angle*Math.PI/180)*power;
        }
        else{
            ship.body.velocity.x += 0;
            ship.body.velocity.y += 0;
        }
      
    
    

}





}


class Playgame_3 extends Phaser.Scene{
    

    constructor(){
        
        super("Playgame_3");
        game_scene_3 = this;
        this.maxDistanceX = game.config.width;
        this.maxDistanceY = game.config.height/2;
        this.counter = 3;
        this.text;
        this.timer;
        transitioning = false;
        exploding = false;



        

        

    }
    preload(){
        this.load.image('asteroid1', 'assets/asteroid1.png')
        this.load.image('asteroid2', 'assets/asteroid2.png')
        this.load.spritesheet('battery', 
'assets/battery.png',
{ frameWidth: 95, frameHeight: 45 }
);
        this.load.bitmapFont('atari', 'assets/atari-smooth.png', 'assets/atari-smooth.xml');
        this.cameras.main.setBackgroundColor('#000000')
        
        this.load.image('planet', 'assets/planet.png');
        this.load.image('saturn_art', 'assets/saturn.jpg');
        

        this.load.spritesheet('ship', 
    'assets/spaceship.png',
    { frameWidth: 30, frameHeight: 30 }
);

    }
    create(){
        x_divisor = 4;
        y_divisor = 4;
        transitioning = false;
        exploding = false;
        this.add.image(0, 0, 'saturn_art').setOrigin(0).setScale(1);
        let game_music_config = 
        {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }

        
        var element = this.add.dom(game.config.width-40, game.config.height-40).createFromCache('button');
        if(m)
        {
        
        $("#mute").css({"background": "url('../assets/mute.png')"});

        }
        else
        {
        $("#mute").css({"background": "url('../assets/unmute.png')"});
        }

       
        $("#mute").click(function(){
            if(m){
                m= false;
                button_off.play();
                global_music.stop();
            $("#mute").css({"background": "url('../assets/unmute.png')"});
            }
            else{
                m=true;
                button_on.play();
                global_music.play();
                $("#mute").css({"background": "url('../assets/mute.png')"});
            }
    
        });
    
        
        
 
        
    this.timer = this.time.addEvent({
        delay: 1000,                // ms
        callback: function(){
            this.counter--;
            if (this.counter==0){this.timer.remove();
            this.text.setText([
                ""
            ]);}
        },
        //args: [],
        callbackScope: this,
        loop: true
    });
        
    this.input.keyboard.on('keydown_A', this.turn_up, this);
    this.input.keyboard.on('keyup_A', this.turning_off_up, this);
    this.input.keyboard.on('keydown_D', this.turn_down, this);
    this.input.keyboard.on('keyup_D', this.turning_off_down, this);
    this.input.keyboard.on('keydown_W', this.throttle, this);
    this.input.keyboard.on('keyup_W', this.stopThrottle, this);
    // cursors = this.input.keyboard.createCursorKeys();
    planet = this.physics.add.sprite(0, game.config.height/2, 'planet');
    planet.setVisible(false);
    ship = this.physics.add.sprite(game.config.width/7+10,game.config.height/5+70, 'ship');
    
  
    ship.body.allowGravity = false;
    this.anims.create({
        key: 'throttle',
        frames: this.anims.generateFrameNumbers('ship', { start: 0, end: 4}),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'explode',
        frames: this.anims.generateFrameNumbers('ship', { start: 5, end: 8}),
        frameRate: 5,
        repeat: -1
    });
 
    let explode = function()
    {
      
        if(exploding == false)
        {asteroid_collision.play();
            exploding = true;
            }
        else return;
        
        ship.anims.stop();
        ship.anims.play('explode',true);
        
        
     
    }
   
    spawn_asteroids(this, 0.7,0.2);
   


        this.physics.add.overlap(ship, collision_enemies, explode, null, this);
        this.text = this.add.bitmapText(400, 200, 'atari', '', 38).setOrigin(0.5).setCenterAlign().setInteractive();

        this.text.setText([
            "Hold W - " + this.counter
        ]);
        battery = this.physics.add.sprite(game.config.width-60,30, 'battery');
    battery.setFrame(4);
    }


   throttle (event) {


    if(exploding)return;
    thrust_end.stop();
    if (!thrust_start.isPlaying)
    thrust_start.play();

        ship.anims.play('throttle', true);
        moving = true;
       
       }
       stopThrottle (event) {

        if(exploding)return;
        thrust_start.stop();
        thrust_end.play();
        ship.anims.stop();
      
        moving = false;
        ship.setFrame(0);
            
       
       }
       turn_up (event) {


        turning_up=true;
        
   
   }
   turn_down (event) {


    turning_down=true;
    

}
   turning_off_up(event)
   {

    
       turning_up = false;
       
   }
   turning_off_down(event)
   {

    
       turning_down = false;
   }
    update(){
        if(currentFuel < (start_fuel/5))
        battery.setFrame(0);
        else if(currentFuel < (start_fuel/5)*2)
        battery.setFrame(1);
        else if(currentFuel < (start_fuel/5)*3)
        battery.setFrame(2);
        else if(currentFuel < (start_fuel/5)*4)
        battery.setFrame(3);
        else if(currentFuel < (start_fuel/5)*5)
        battery.setFrame(4);
        if(ship.anims.currentFrame!=null && exploding){
     
            ship.anims.play('explode',true);
        if(ship.anims.currentFrame.index === 4 && exploding){
            win = false;
            game_scene_3.scene.start('Highscore');
        }
    }
        collision_enemies.forEach(function (child) {
            
            let from_center = Math.abs(child.body.y-200)+100;
            child.body.velocity.y = -(child.speed)*(from_center);
            

            child.angle+=child.speed;
            if (child.body.y > game.config.height || child.body.y < -50)return;
            if(child.body.y > game.config.height /2)
            {
                    child.body.x-=(game.config.height/2 - child.body.y)/250;
            }
            else
            {
                child.body.x-=(game.config.height/2- child.body.y)/250;
            }
        
        });
        if(exploding)
    {
        ship.body.velocity.x = 0;
        ship.body.velocity.y = 0;
        return;
    }
    if(currentFuel<=0){
        if(exploding == false)
        {asteroid_collision.play();
            exploding = true;
            }
        else return;
        
        ship.anims.stop();
        ship.anims.play('explode',true);}
        if(this.counter>0)
        {
        this.text.setText([
            "Hold W - " + this.counter
        ]);
        return;
    }
    if(transitioning){
       
        return;
    }
    if(ship.body.x >= game.config.width)
    {
       
        win = true;
        this.stopThrottle();
        game_scene_3.scene.start('Highscore');

    }
    else if (ship.body.x<=0-ship.body.width)
    {
     
        if(transitioning == false)
        transitioning =  true;
        else
        return;
         win = false;
         var c = 0;
         ship.body.velocity.y = 0;
         ship.body.velocity.x = 0;
         ship.body.gravity = 0;
         ship.body.reset(-15, ship.body.y);
         
         
         var inter = setInterval(function(){
            
            ship.body.updateFromGameObject();
            if(!gravity_burn.isPlaying)
            gravity_burn.play()
            if(ship.body.x<-100)
            {
      
            }
            else
            {
             c++; 
           
             ship.body.velocity.x = 10;
             ship.body.velocity.y = 10;
 
             
             ship.angle+=7;
             ship.setScale(1-(c/100));
             if(c==100)
         {
         
             clearInterval(inter)
             
             
             game_scene_3.scene.start('Highscore');
         }}}, 50);
    }




    ship.body.gravity = new Phaser.Geom.Point(planet.body.x - ship.body.x, planet.body.y - ship.body.y);
 
    ship.body.velocity.x =-(this.maxDistanceX +ship.body.gravity.x)
    let oldVelocityY = ship.body.velocity.y;
    let newVelocityY = ship.body.gravity.y >0 ? (this.maxDistanceY - ship.body.gravity.y)/1.2 : -((this.maxDistanceY - Math.abs(ship.body.gravity.y))/1.2);
    if((oldVelocityY >0 && newVelocityY < 0) || (oldVelocityY <0 && newVelocityY >0))ship.body.velocity.y = 0;
    else
    ship.body.velocity.y = newVelocityY;

    ship.body.velocity.y/=y_divisor;
    ship.body.velocity.x/=x_divisor;

    if(ship.body.y>game.config.height/2-10 && ship.body.y<game.config.height/2+10)
    {
        if(!gravity_shake.isPlaying)
        gravity_shake.play();
    }
    else gravity_shake.stop();
        if(turning_up){
        
        ship.angle-=1;
        }
        if(turning_down){
           ship.angle+=1;
        }
        if(moving)
        {
            currentFuel-=1;
            ship.body.velocity.x += Math.cos(ship.angle*Math.PI/180)*power;
            if(ship.body.y+ship.body.height <game.config.height && ship.body.y >0)
            ship.body.velocity.y += Math.sin(ship.angle*Math.PI/180)*power;
        }
        else{
            ship.body.velocity.x += 0;
            ship.body.velocity.y += 0;
        }

      
    

      
 
   
  
        
       
    
    

}





}



























//change the string of localStorageName to reset highscore



class Highscore extends Phaser.Scene {
	
	constructor() {
	
        super("Highscore");
        highscore_scene = this;
		this.element;
		this.player = "";
        this.text;
        this.placeHolder = {name: "Michael", score: 1346}
        this.placeHolder_ = {name: "Joe", score: 1346}
		//get from db
        this.highscores = HS;
        // for(var i = 0; i<50; i++)
        // {
        //     let obj = i%2 == 0 ? {...this.placeHolder} : {...this.placeHolder_} ;
        //     obj.score=obj.score+i;
        //     this.highscores.push(obj)
        // }
        this.currentPage = 0;

		
	}
		
    preload()
    {
        this.load.image('highscore_art', 'assets/highscores.jpg');
        this.load.bitmapFont('atari', 'assets/atari-smooth.png', 'assets/atari-smooth.xml');
        this.load.html('nameform', 'assets/nameform.html');
    }
    changeScene(pointer)
    {
        if(data_entered==false)return;
      
        game.registry.destroy(); // destroy registry
        game.events.off();
        newGame();
        
    }
	create() {
        thrust_start.stop();
        thrust_end.stop();
        transitioning = false;
        exploding = false;
        this.add.image(0, 0, 'highscore_art').setOrigin(0).setScale(1);
        this.text = this.add.bitmapText(100, 50, 'atari', '', 38);
		this.cameras.main.setBackgroundColor('#000000')
		this.input.on('pointerdown', this.changeScene);
        
		
		this.input.keyboard.on('keydown_DOWN', this.page_down, this);
		this.input.keyboard.on('keydown_UP', this.page_up, this);
		data_entered = false;
        if(win)
        {
            


            



       
            let temp = this.add.bitmapText(320, 100, 'atari', '', 38);
            temp.setText([currentFuel])
            var element = this.add.dom(400, 200).createFromCache('nameform');
     
            this.input.keyboard.on('keydown_ENTER', function()
            
            
            {
       
                var inputText = element.getChildByName('nameField');
        
                    //  Have they entered anything?
                    if (inputText.value.length<8 && inputText.value.length > 0 && win==true)
                    {
                        win = false;
                        $.post(NEW_URL,
                        {
                          username: inputText.value,
                          score: currentFuel.toString()
                        },
                        function(data, status) {
                            
          
                           data_entered = true;
                           highscore_scene.highscores = JSON.parse(data)
                           HS = JSON.parse(data)
                           element.setVisible(false)
                           temp.setText([""])
                           highscore_scene.showHighscore(0);

                            
                        });
                        
                    }


            }, this);
        
           

        }
        else
        {
        this.showHighscore(0);
        data_entered=true;
        }
		

	
}
   
	update(){
      
		
	}
	
	

    compare( a, b ) {
        if ( parseInt(a.score) < parseInt(b.score) ){
          return -1;
        }
        if ( parseInt(a.score )>parseInt( b.score) ){
          return 1;
        }
        return 0;
      }
	
	showHighscore(page) {
        this.highscores = HS
        this.highscores = this.highscores.sort(this.compare)
   
        let lineLength = 15;
        let sp = lineLength - 9;
        let t1 = "Name"+" ".repeat(sp) + "Score" + "\n";
        let t = ""
		for(var i =  this.highscores.length-1-(page*6); i > this.highscores.length-7 - (page*6); i--) {
            
            let l = this.highscores[i].username.length + this.highscores[i].score.toString().length;

            let spaces = lineLength - l;
            t+= this.highscores[i].username + " ".repeat(spaces) +  this.highscores[i].score.toString() + "\n";
            if(i==0)break;
				
			
        }
       
        this.text.setText([t1, t])
       
    }
    page_down()
    {
       
        if(6*this.currentPage<=this.highscores.length-6)
        this.currentPage+=1;
        
        this.showHighscore(this.currentPage)
    }

    page_up()
    {
       
        this.currentPage-=1;
        if(this.currentPage<0)this.currentPage=0;
        this.showHighscore(this.currentPage)
    }
	

	
 }

 
