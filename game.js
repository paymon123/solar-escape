
let public_URL = "https://solar-escape.herokuapp.com/";
let testing_multiplier = 10;
let power = 175 * testing_multiplier;
let game;
let turning_up = false;
let turning_down = false;
let planet;
let ship;
let cursors;
let spaceKey;
let moving = false;
let currentFuel = 10000;
let HS;
let HS_URL = public_URL + "highscores";
let NEW_URL = public_URL + "newscore";
let win = false;

let menu_scene;
let game_scene;
let game_scene_1;
let game_scene_2;
let game_scene_3;
let highscore_scene;
let start_fuel = 10000;
let data_entered = false;
let m = false;
let global_music;
let x_divisor = 4;
let y_divisor = 4;
let transitioning = false;
let newGame = function (){
    console.log("new phaser game")
    game.destroy();
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
  
    
    $.ajax({url: HS_URL, success: function(result){
        
        HS = JSON.parse(result);
        console.log("got highscores" + HS)
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



    //newGame();
    
    
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
        
        this.load.image('menu_art', 'assets/menu_art.jpg');
        this.load.bitmapFont('atari', 'assets/atari-smooth.png', 'assets/atari-smooth.xml');

    }
   
	create() {
        
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
    
        
        this.add.image(0, 0, 'menu_art').setOrigin(0).setScale(1);
        global_music = game.sound.add('menu_music', menu_config);
        var element = this.add.dom(game.config.width-50, game.config.height-50).createFromCache('button');
        $("#mute").css({"background": "url('../assets/unmute.png')"});
       
        $("#mute").click(function(){
            console.log("clicked")
            if(m){
                m= false;
                global_music.stop();
            $("#mute").css({"background": "url('../assets/unmute.png')"});
            }
            else{
                m=true;
                global_music.play();
                $("#mute").css({"background": "url('../assets/mute.png')"});
            }
    
        });
    
        
		this.cameras.main.setBackgroundColor('#000000')
		
		
	
		//this.text = this.add.bitmapText(100, 50, 'atari', '', 38);
       
        this.input.on('pointerdown', function(pointer)
        {
            console.log("highscore inp[ut down")
            global_music.stop();
            newGame()

        });

        //this.text.setText(["Menu"], 400, 200);
		
	
					
}
   
	update(){
        
        // if(music == false){
        //     console.log("playing")
        
        // music=true}

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

        

        

    }
    preload(){
        
        this.load.bitmapFont('atari', 'assets/atari-smooth.png', 'assets/atari-smooth.xml');
        this.cameras.main.setBackgroundColor('#000000')
        this.load.audio("game_music", ["assets/gameplay.mp3"]);
        this.load.image('planet', 'assets/planet.png');
        this.load.image('earth_art', 'assets/earth.jpg');

        this.load.spritesheet('ship', 
    'assets/spaceship.png',
    { frameWidth: 30, frameHeight: 30 }
);

    }


    create(){
        console.log("playgame create called")
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

        global_music= game.sound.add('game_music', game_music_config);
        var element = this.add.dom(game.config.width-50, game.config.height-50).createFromCache('button');
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
                m= false;
                global_music.stop();
            $("#mute").css({"background": "url('../assets/unmute.png')"});
            }
            else{
                m=true;
                global_music.play();
                $("#mute").css({"background": "url('../assets/mute.png')"});
            }
    
        });
    
        
      
 
    this.text = this.add.bitmapText(400, 200, 'atari', '', 38).setOrigin(0.5).setCenterAlign().setInteractive();

    this.text.setText([
        "Hold W - " + this.counter
    ]);
       
        
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
    // this.anims.create({
    //     key: 'noThrottle',
    //     frames: this.anims.generateFrameNumbers('ship', { start: 0, end: 0 }),
    //     frameRate: 10,
    //     repeat: -1
    // });

    }


   throttle (event) {

    
  
        ship.anims.play('throttle', true);
        moving = true;
       
       }
       stopThrottle (event) {
       
        
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
        this.stopThrottle();
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

        
        

        

    }
    preload(){
        
        this.load.bitmapFont('atari', 'assets/atari-smooth.png', 'assets/atari-smooth.xml');
        this.cameras.main.setBackgroundColor('#000000')
        
        this.load.image('planet', 'assets/planet.png');
        this.load.image('mars_art', 'assets/mars.jpg');


        this.load.spritesheet('ship', 
    'assets/spaceship.png',
    { frameWidth: 30, frameHeight: 30 }
);

    }
    create(){
        console.log("playgame1 create")
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

        
        var element = this.add.dom(game.config.width-50, game.config.height-50).createFromCache('button');
        if(m)
        {
          
        $("#mute").css({"background": "url('../assets/mute.png')"});

        }
        else
        {
        $("#mute").css({"background": "url('../assets/unmute.png')"});
        }

       
        $("#mute").click(function(){
            console.log("clicked")
            if(m){
                m= false;
                global_music.stop();
            $("#mute").css({"background": "url('../assets/unmute.png')"});
            }
            else{
                m=true;
                global_music.play();
                $("#mute").css({"background": "url('../assets/mute.png')"});
            }
    
        });
    
        
     
 
    this.text = this.add.bitmapText(400, 200, 'atari', '', 38).setOrigin(0.5).setCenterAlign().setInteractive();

    this.text.setText([
        "Hold W - " + this.counter
    ]);
       
        
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
    // this.anims.create({
    //     key: 'noThrottle',
    //     frames: this.anims.generateFrameNumbers('ship', { start: 0, end: 0 }),
    //     frameRate: 10,
    //     repeat: -1
    // });

    }


   throttle (event) {


  
        ship.anims.play('throttle', true);
        moving = true;
       
       }
       stopThrottle (event) {
        
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
        this.stopThrottle();
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


        

        

    }
    preload(){
        
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

        
        var element = this.add.dom(game.config.width-50, game.config.height-50).createFromCache('button');
        if(m)
        {
           
        $("#mute").css({"background": "url('../assets/mute.png')"});

        }
        else
        {
        $("#mute").css({"background": "url('../assets/unmute.png')"});
        }

       
        $("#mute").click(function(){
            console.log("clicked")
            if(m){
                m= false;
                global_music.stop();
            $("#mute").css({"background": "url('../assets/unmute.png')"});
            }
            else{
                m=true;
                global_music.play();
                $("#mute").css({"background": "url('../assets/mute.png')"});
            }
    
        });
    
        
       
 
    this.text = this.add.bitmapText(400, 200, 'atari', '', 38).setOrigin(0.5).setCenterAlign().setInteractive();

    this.text.setText([
        "Hold W - " + this.counter
    ]);
       
        
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
    // this.anims.create({
    //     key: 'noThrottle',
    //     frames: this.anims.generateFrameNumbers('ship', { start: 0, end: 0 }),
    //     frameRate: 10,
    //     repeat: -1
    // });

    }


   throttle (event) {


    
        ship.anims.play('throttle', true);
        moving = true;
       
       }
       stopThrottle (event) {

        
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
        this.stopThrottle();
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


        

        

    }
    preload(){
        
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

        
        var element = this.add.dom(game.config.width-50, game.config.height-50).createFromCache('button');
        if(m)
        {
        
        $("#mute").css({"background": "url('../assets/mute.png')"});

        }
        else
        {
        $("#mute").css({"background": "url('../assets/unmute.png')"});
        }

       
        $("#mute").click(function(){
            console.log("clicked")
            if(m){
                m= false;
                global_music.stop();
            $("#mute").css({"background": "url('../assets/unmute.png')"});
            }
            else{
                m=true;
                global_music.play();
                $("#mute").css({"background": "url('../assets/mute.png')"});
            }
    
        });
    
        
        
 
    this.text = this.add.bitmapText(400, 200, 'atari', '', 38).setOrigin(0.5).setCenterAlign().setInteractive();

    this.text.setText([
        "Hold W - " + this.counter
    ]);
       
        
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
    // this.anims.create({
    //     key: 'noThrottle',
    //     frames: this.anims.generateFrameNumbers('ship', { start: 0, end: 0 }),
    //     frameRate: 10,
    //     repeat: -1
    // });

    }


   throttle (event) {


    
        ship.anims.play('throttle', true);
        moving = true;
       
       }
       stopThrottle (event) {

        
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
       this.stopThrottle();
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
      
       
        // this.registry.destroy(); // destroy registry
        // this.events.off();
        // newGame();
        
    }
	create() {
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
		

		// this.element = this.add.dom(400, 225).createFromCache("nameform");
		// this.element.visible = true;
	    // this.element.addListener('click');
		// this.enterName();
					
}
   
	update(){
      
        //console.log("hello")
        //this.showHighscore();
		
		// if (!element.visible){
		// 	this.showHighscore();
		// }
		
		// if(element.visible){
		// 	this.input.keyboard.once("keydown-" + "ENTER", () =>{
		// 		this.enterName();
		// 	});
		// }
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
        console.log("show highscores" + this.highscores)
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

 
