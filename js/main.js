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

function getRandomInt(min, max) { // >>>https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

// constructor ENEMY
const Enemy = function () { // each one of these enemy has properties holding health,
  this.element = null;
  this.health = 100;        // size of hitbox, and position
  this.position = {
    x: 1080
  };
  this.intervalId = null;

  this.create();
  this.move();
};

Enemy.prototype.create = function () {
  $('.rebel-holder').append('<div class="rebel-soldier"></div>');
  this.element = $('.rebel-soldier').last();
};

Enemy.prototype.move = function () {
  this.intervalId = setInterval (() => {
    this.position.x -= 20;
    this.element.css('left', this.position.x + 'px');
  }, 200);
};

Enemy.prototype.die = function () {
  // >>>https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/clearInterval
  clearInterval(this.intervalId); // stop moving
  this.element.remove();
};

//constructor BOLT
const Bolt = function () { // each one of these enemy has properties holding health,
  this.element = null;
  this.position = {
    x: 1080
  };
  this.intervalId = null;

  this.create();
  this.move();
};

Bolt.prototype.create = function () {
  $('.bolt-holder').append('<div class="bolt"></div>');
  this.element = $('.bolt').last();
};

Bolt.prototype.move = function () {
  this.intervalId = setInterval (() => {
    this.position.x -= 5;
    this.element.css('left', this.position.x + 'px');
  }, 10);
};

Bolt.prototype.die = function () {
  // >>>https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/clearInterval
  clearInterval(this.intervalId); // stop moving
  this.element.remove();
};

// constructor PLAYER
const Player = function () { // holds instance of Darth Vader
  this.element = $('#darth-vader');
  this.health = 100;
  this.position = {
    x: 0
  };
};

Player.prototype.moveLeft = function () {
  if (this.position.x > 0) { // stop vader from going LEFT off screen
    this.position.x -= 30;
    this.element.css('left', this.position.x + 'px');
  }
};

Player.prototype.moveRight = function () {
  if (this.position.x < 903) { // stop vader from going RIGHT off screen
    this.position.x += 30;
    this.element.css('left', this.position.x + 'px');
  }
};
// end

// constructor GAME
const Game = function () {
  this.score = 0;     // add this. -- and = Num;
  this.enemies = [];  // add this. -- and = [];
  this.bolts = [];
  this.player = new Player();
  this.addListeners();
  this.listenForBolts();
};

// player start and replay buttons set here
Game.prototype.addListeners = function () {
  $('.action-begin, .action-again').click(() => {
    $('.screen').removeClass('active');
    $('#game-screen').addClass('active');
    this.start();
  });

  // replay button only
  $('.action-main').click(function () {
    $('.screen').removeClass('active');
    $('#start-screen').addClass('active');
  });

  $(document).on('keypress', (event) => { // whenever user clicks these, do it
    if (event.which === 32) {
      // spacebar
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

Game.prototype.listenForBolts = function () {
  const boltWidth = 100;
  const vaderWidth = 177;
  setInterval(() => {
    let vaderA = this.player.position.x;
    let vaderB = vaderA + vaderWidth;
    for (var i = 0; i < this.bolts.length; i++) {
      let boltA = this.bolts[i].position.x;
      let boltB = boltA + boltWidth;
      let isVaderAWithinBolt = vaderA >= boltA && vaderA <= boltB;
      let isVaderBWithinBolt = vaderB >= boltA && vaderB <= boltB;
      if (isVaderAWithinBolt || isVaderBWithinBolt ) { // if collision
        this.bolts[i].die();
        this.bolts.splice(i, 1);
        this.subtractHealth(10);
      }
    }
  }, 250);
};

Game.prototype.playerAttacks = function () {
  const enemyWidth = 120;
  const vaderWidth = 177;
  const hitboxWidth = 40;
  let hitboxA = this.player.position.x + vaderWidth;
  let hitboxB = hitboxA + hitboxWidth;
  for (var i = 0; i < this.enemies.length; i++) {
    let enemyA = this.enemies[i].position.x;
    let enemyB = enemyA + enemyWidth;
    let isHitboxAWithinEnemy = hitboxA >= enemyA && hitboxA <= enemyB;
    let isHitboxBWithinEnemy = hitboxB >= enemyA && hitboxB <= enemyB;
    if (isHitboxAWithinEnemy || isHitboxBWithinEnemy ) { // if collision
      this.enemies[i].die();
      this.enemies.splice(i, 1); // https://stackoverflow.com/questions/5767325/how-do-i-remove-a-particular-element-from-an-array-in-javascript
      this.addToScore(500);
    }
  }
  // >>> LETS ADD: https://stackoverflow.com/questions/14290424/game-programming-how-to-add-delay-between-attacks
};

Game.prototype.playerBlocks = function () {
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
      this.bolts[i].die();
      this.bolts.splice(i, 1);
      this.addToScore(100);
    }
  }
  // >>> LETS ADD: https://stackoverflow.com/questions/14290424/game-programming-how-to-add-delay-between-attacks
};

Game.prototype.addToScore = function (points) {
  this.score += points;
  $('#game-score span').text(this.score);
};

Game.prototype.subtractHealth = function (damage) {
  this.player.health -= damage;
  $('#game-health span').text(this.player.health);
  if (this.player.health <= 0) {
    $('.screen').removeClass('active');
    $('#end-screen').addClass('active');
  }
};

Game.prototype.start = function () {
  this.createEnemy();
  this.createBolt();
};

Game.prototype.createEnemy = function () {
  var enemy = new Enemy(); // creates new bad guys!!!!
  this.enemies.push(enemy); // looks at Game constructor, and calls 1 new bad guy

  let randomTime = getRandomInt(500, 5000);
  setTimeout(() => {
    this.createEnemy();
  }, randomTime); // >>>https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#Recursion
};

Game.prototype.createBolt = function () {
  var bolt = new Bolt(); // creates new bad guys!!!!
  this.bolts.push(bolt); // looks at Game constructor, and calls 1 new bad guy

  let randomTime = getRandomInt(500, 2000);
  setTimeout(() => {
    this.createBolt();
  }, randomTime); // >>>https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#Recursion
};

const game = new Game();
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
