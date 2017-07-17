//   |:::::::::::::;;::::::::::::::::::| ////////     ///     ///     //
//   |:::::::::::'~||~~~``:::::::::::::| /////////     ///     ///     //
//   |::::::::'   .':     o`:::::::::::| ///   ///     ///     ///     //
//   |:::::::' oo | |o  o    ::::::::::| ////////      ///     ///     //
//   |::::::: 8  .'.'    8 o  :::::::::| ///////       ///////////     //
//   |::::::: 8  | |     8    :::::::::| ///  ///      ///     ///     //
//   |::::::: _._| |_,...8    :::::::::| ///   ///     ///     ///     //
//   |::::::'~--.   .--. `.    ::::::::| ///    ///    ///     ///     //
//   |:::::'     =8     ~  \ o ::::::::| ///     /// o ///     /// o   //
//   |::::'       8._ 88.   \ o::::::::|                               //
//   |:::'   __. ,.ooo~~.    \ o`::::::| ////////   /////    /////     //
//   |:::   . -. 88`78o/:     \  `:::::|    //     ///      ///        //
//   |::'     /. o o \ ::      \88`::::|    //     //////   //////     //
//   |:;     o|| 8 8 |d.        `8 `:::|    //         //       //     //
//   |:.       - ^ ^ -'           `-`::|    //         //       //     //
//   |::.                          .:::|    //   o /////  o /////  o   //
//   |:::::.....           ::'     ``::|    //               ^         //
//   |::::::::-'`-        88          `|                    | |        //
//   |:::::-'.          -       ::     |     ~||     ||     | |        //
//   |:-~. . .                   :.    |     ~||-(O)-||     | |        //
//   | .. .   ..:   o:8      88o       |     ~||     ||     | |        //
//   |. .     :::   8:P     d888. . .  |                    | |        //
//   |.   .   :88   88      888'  . .  |              \\    | |        //
//   |   o8  d88P . 88   ' d88P   ..   |       ~\\ (O) \\   | |        //
//   |  88P  888   d8P   ' 888       . |        ~\\         | |        //
//   |   8  d88P.'d:8  .- dP~ o8     o |                    | |        //
//   |      888   888    d~ o888    88 |_UNIT 1 GAME LOGIC__|_|________//
//   |                                 |                   {d*]        //
//   |                                 |                    [.]b       //
//___|_________________________________|____________________[ ]________//

// logic for random spawning
function getRandomInt(min, max) { // >>>https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

// constructor ENEMY
const Enemy = function () { // each enemy has properties holding health,
  this.element = null;      // exists or not
  // this.health = 100;     // enemy just dies on hit, maybe add health in the future
  this.position = {         // observes enemy position on X
    x: 1080                 // starts off the map to look more seamless
  };
  this.intervalId = null;   // exists or not
  this.create();            // summons enemy agents
  this.move();              // forces enemies to move and spawn at random
};

Enemy.prototype.create = function () {
  $('.rebel-holder').append('<div class="rebel-soldier"></div>'); // create divs inside class rebel-holder
  this.element = $('.rebel-soldier').last(); // recognizes existing instances of rebel-soldier; returns the last element of existence
};                                           // https://www.w3schools.com/jquery/traversing_last.asp

Enemy.prototype.move = function () { // makes the bad guys move
  this.intervalId = setInterval (() => {
    this.position.x -= 4; // still can't decide on a good rhythm; decided between 2 and 10
    this.element.css('left', this.position.x + 'px'); // tells
  }, 20); // still can't decide on a good rhythm; decided between 40 and 200
};

Enemy.prototype.die = function () {
  // >>>https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/clearInterval
  clearInterval(this.intervalId); // 'stop moving' so to speak; eliminates them from the world/variable intervalId
  this.element.remove(); // this was important to add as not doing so kept
};                       // the enemy 'ghosted' and player keeps getting points as result

//constructor BOLT
const Bolt = function () { // each one of these are blaster bolts
  this.element = null;
  this.position = {        // starts off the map to look more seamless
    x: 1080
  };
  this.intervalId = null;

  this.create(); // same as notes in Enemy constructor
  this.move();
};

Bolt.prototype.create = function () {
  $('.bolt-holder').append('<div class="bolt"></div>'); // create divs inside class bolt-holder
  this.element = $('.bolt').last();
};

Bolt.prototype.move = function () { // see notes on Rebel mover
  this.intervalId = setInterval (() => {
    this.position.x -= 5;
    this.element.css('left', this.position.x + 'px');
  }, 5);
};

Bolt.prototype.die = function () {
  // >>>https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/clearInterval
  clearInterval(this.intervalId); // stop moving
  this.element.remove();
};

// constructor PLAYER
const Player = function () { // holds instance of Darth Vader
  this.element = $('#darth-vader');
  this.health = 100; // starting health - can deplete to 0
  this.position = { // starting position of vader
    x: 0
  };
};

Player.prototype.moveLeft = function () {
  if (this.position.x > 0) { // stops vader from going LEFT off screen
    this.position.x -= 30; // allows all other movement to left direction to follow this speed
    this.element.css('left', this.position.x + 'px');
  }
};

Player.prototype.moveRight = function () {
  if (this.position.x < 903) { // stops vader from going RIGHT off screen
    this.position.x += 30; // allows all other movement to right direction to follow this speed
    this.element.css('left', this.position.x + 'px');
  }
};
// end

// constructor GAME
const Game = function () {
  this.score = 0;     // add this. -- and = Num;
  this.enemies = [];  // add this. -- and = []; holds enemy instances.
  this.bolts = [];  // holds bolt instances.
  this.player = new Player();
  this.addListeners(); // listens for movements
  this.listenForBolts(); // listens for bolts
};

// player start and replay buttons set here
Game.prototype.addListeners = function () { // starts THE GAME!
  $('.action-begin').click(() => {
    $('.screen').removeClass('active');
    $('#game-screen').addClass('active');
    this.start();
  });

  $('.action-again').click(() => { // returns to THE GAME after it ended (need to make a way to pause)
    $('game-screen div').html('');
    $('.screen').removeClass('active');
    $('#game-screen').addClass('active');
    this.start();
  });

  // return to main
  $('.action-main').click(function () { // returns to the main menu and resets the world
    history.go();
  });

  $(document).on('keypress', (event) => { // whenever user clicks these, do it (pretty self-explanatory)
    if (event.which === 32) {             // each instance of this exists in the constructor player,
      // spacebar                         // can be changed to be other keys as well
      this.playerAttacks();
    } else if (event.which === 49) {
      // 1
      this.playerBlocks();
    } else if (event.which === 97) {
      // left
      this.player.moveLeft();
    } else if (event.which === 100) {
      // right
      this.player.moveRight();
    }
  });
};

Game.prototype.listenForBolts = function () { // first piece of collision logic
  const boltWidth = 100;                      // sets the size of the bolt, approx. to it's size in CSS
  const vaderWidth = 177;                     // sets the size of Vader's hitbox
  setInterval(() => {
    let vaderA = this.player.position.x; // holds player initial poisition
    let vaderB = vaderA + vaderWidth; // player's hitbox size
    for (var i = 0; i < this.bolts.length; i++) { // applies to each instance of bolt that is produced by game constructor
      let boltA = this.bolts[i].position.x; // starting position of bolt
      let boltB = boltA + boltWidth; // bolt's hitbox size
      let isVaderAWithinBolt = vaderA >= boltA && vaderA <= boltB; // compares area position of player and bolt
      let isVaderBWithinBolt = vaderB >= boltA && vaderB <= boltB; // compares area position of player and bolt
      if (isVaderAWithinBolt || isVaderBWithinBolt ) { // if collision
        this.bolts[i].die(); // bolt disappears from DOM
        this.bolts.splice(i, 1); // lose an item in the array bolts
        this.subtractHealth(10); // player loses HP - cant' decide but a good range is 3 - 20
      }
    }
  }, 250); // time of collision checking
};

Game.prototype.playerAttacks = function () { // holds player attacks initial position
  const enemyWidth = 120; // sets the size of the enemy, approx. to it's size in CSS
  const vaderWidth = 177;
  const hitboxWidth = 60; // how big vader's lightsaber swing is
  let hitboxA = this.player.position.x + vaderWidth; // this is where player is at any given time
  let hitboxB = hitboxA + hitboxWidth; // size of Vader's lightsaber swing kill box
  for (var i = 0; i < this.enemies.length; i++) { // loops through all instances of enemies
    let enemyA = this.enemies[i].position.x; // holds instances of Rebel soldiers
    let enemyB = enemyA + enemyWidth; // size of Rebel soldier's hitbox
    let isHitboxAWithinEnemy = hitboxA >= enemyA && hitboxA <= enemyB; // compares attack to position of enemy
    let isHitboxBWithinEnemy = hitboxB >= enemyA && hitboxB <= enemyB; // compaes attack to position of enemy
    if (isHitboxAWithinEnemy || isHitboxBWithinEnemy ) { // if collision
      this.enemies[i].die(); // enemy disappears from DOM
      this.enemies.splice(i, 1); // https://stackoverflow.com/questions/5767325/how-do-i-remove-a-particular-element-from-an-array-in-javascript
      this.addToScore(1000);
    }
  }
  // >>> LETS ADD: https://stackoverflow.com/questions/14290424/game-programming-how-to-add-delay-between-attacks
};

Game.prototype.playerBlocks = function () { // works the same as player blocks but eliminates bolts
  const boltWidth = 100;
  const vaderWidth = 177;
  const hitboxWidth = 40;
  let hitboxA = this.player.position.x + vaderWidth;
  let hitboxB = hitboxA + hitboxWidth;

  for (var i = 0; i < this.bolts.length; i++) {
    let boltA = this.bolts[i].position.x;
    let boltB = boltA + boltWidth;
    let isHitboxAWithinBolt = hitboxA >= boltA && hitboxA <= boltB;
    let isHitboxBWithinBolt = hitboxB >= boltA && hitboxB <= boltB;
    if (isHitboxAWithinBolt || isHitboxBWithinBolt ) { // if collision
      this.bolts[i].die(); // bolt disappears from DOM
      this.bolts.splice(i, 1);
      this.addToScore(250);
    }
  }
  // >>> LETS ADD: https://stackoverflow.com/questions/14290424/game-programming-how-to-add-delay-between-attacks
};

Game.prototype.addToScore = function (points) { // rewards the player's well-timed moves
  this.score += points; // adds points
  let inGame = $('#game-score span').text(this.score); // updates gameplay's score
  $('#game-score-end span').text(inGame); // doesn't work as of yet
};

Game.prototype.subtractHealth = function (damage) { // punish player for getting shot by bolts
  this.player.health -= damage; // deduct health
  $('#game-health span').text(this.player.health); // updates player health
  if (this.player.health <= 0) { // sets condition for "death" or game end. But Vader can't really die so it just ends
    $('.screen').removeClass('active'); // changes game state
    $('#end-screen').addClass('active'); // see above ^
  }
};

Game.prototype.start = function () { // occurs at start of game
  this.createEnemy(); // spawn Rebels
  this.createBolt(); // spawn blaster fire
};

Game.prototype.createEnemy = function () {
  var enemy = new Enemy(); // creates new bad guys
  this.enemies.push(enemy); // looks at Game constructor, and calls 1 new bad guy

  let randomTime = getRandomInt(1000, 5000); // sets interval of Rebel spawn
  setTimeout(() => {
    this.createEnemy();
  }, randomTime); // >>>https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#Recursion
};

Game.prototype.createBolt = function () {
  var bolt = new Bolt(); // creates new bolts
  this.bolts.push(bolt); // looks at Game constructor, and calls 1 new blaster bolt

  let randomTime = getRandomInt(500, 1000);
  setTimeout(() => {
    this.createBolt();
  }, randomTime); // >>>https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#Recursion
};

const game = new Game(); // gives birth to a new instance of the game


// random notes of the week
// const audio = new Audio('../RebelHunterv1/breathing.mp3');
// audio.play();
// end

// background

// movement of PLAYER
// can move RIGHT AND LEFT
// can BLOCK
// can ATTACK
// advanced goals: can THROW LIGHTSABER "3" ---> KILLS ALL ENEMIES ON FIELD in RADIUS of BLADE
              // : can FORCE CRUSH "5" ---> KILLS ALL ENEMIES/LASERBEAMS ON FIELD, stops spawns for 5 seconds
              //  (cont.) and get points for each spawn blocked,
              // pause/ingame menu
              // add sounds/SFX for saber throw, crush, etc.
              // improved playability

// movement of ENEMY
// enemy DIE

// add SCORE when kill ENEMY
// add SCORE when block BOLT
// lose HEALTH when ENEMY COLLIDE

//


// if ($'.enemy'.pos = 800) {
//   console.log('you get hurt');
//   // REMOVE SCORE
// };

// movement of BOLT
// var bolt = 900;
// setInterval (() => {
//   bolt -= 10;
//   $('.bolt').css('left', `${bolt}px`);
//   if (bolt === player) { // collision detection
//     // alert('Pew pew (Deflect)');
//     bolt = -bolt; // "disappate when touch"
//   }
// }, 30)

// if bolt position

// const playerPos = 270 + 'px';

// let enemyPos;

// //
// if (enemyPos = playerPos) {
//   console.log('Do something here');
// }

// if ($'.laser-beam'.pos = 800) {
//   console.log('you get hurt');
//   REMOVE SCORE
// };

// collision detection
// if (player.position = {100px, 100px})
// if (enemy.position - {100px, 100px})
// COLLISION!!! ->//   ENEMY DIE && ADD TO SCORE
                  //or ENEMY DIE && REMOVE HEALTH, ADD TO SCORE
                  //or DEFLECT && ADD TO SCORE
                  //or PLAYER DIE
                  //GAME WIN AND DISPLAY FINAL SCREEN

// document.querySelector('#game').innerHTML += `<div></div>`;
