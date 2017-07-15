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
  this.hitbox = {
    width: 100,
    height: 100
  };
  this.position = {
    x: 1080
  };

  this.create();
  this.move();
};

Enemy.prototype.create = function () {
  $('.rebel-holder').append('<div class="rebel-soldier"></div>');
  this.element = $('.rebel-soldier').last();
};

Enemy.prototype.move = function () {
  setInterval (() => {
    this.position.x -= 20;
    this.element.css('left', this.position.x + 'px');
    // if (enemy === player) { // collision detection
    //   // alert('It`s Vader!');
    //   enemy = -enemy; // "die when touch"
    // }
  }, 200);
};

// constructor PLAYER
const Player = function () { // holds instance of Darth Vader
  this.element = $('#darth-vader');
  this.health = 100;
  this.hitbox = {
    width: 100,
    height: 100
  };
  this.position = {
    x: 0
  };

  this.addListeners();
};

Player.prototype.addListeners = function () {
  $(document).on('keypress', (event) => { // whenever user clicks these, do it
    if (event.which === 32) {
      // spacebar
      this.block();
    } else if (event.which === 49) {
      // 1
      this.attack();
    } else if (event.which === 97) {
      // left
      this.moveLeft();
    } else if (event.which === 100) {
      // right
      this.moveRight();
    }
  });
};

Player.prototype.attack = function () {
  // $('player').
};

Player.prototype.block = function () {
  // $('player').
};

Player.prototype.moveLeft = function () {
  this.position.x -= 40;
  this.element.css('left', this.position.x + 'px');
};

Player.prototype.moveRight = function () {
  this.position.x += 40;
  this.element.css('left', this.position.x + 'px');
};
// end

// constructor GAME
const Game = function () {
  this.score = 0;     // add this. -- and = Num;
  this.enemies = [];  // add this. -- and = [];
  this.player = new Player();

  this.addListeners();
};

Game.prototype.start = function () {
  this.createEnemy();
};

Game.prototype.createEnemy = function () {
  var enemy = new Enemy(); // creates new bad guys!!!!
  this.enemies.push(enemy); // looks at Game constructor, and calls 1 new bad guy

  let randomTime = getRandomInt(1000, 5000);
  setTimeout(() => {
    this.createEnemy();
  }, randomTime); // >>>https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#Recursion
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
};

Game.prototype.die = function () {
  this.player.remove(Player)
};

const game = new Game();
// end

// background

// movement of PLAYER && ATTACKS
// can move RIGHT AND LEFT
// can BLOCK
// can ATTACK
// advanced goals: can THROW LIGHTSABER "3" ---> KILLS ALL ENEMIES ON FIELD in RADIUS of BLADE
              // : can FORCE CRUSH "5" ---> KILLS ALL ENEMIES/LASERBEAMS ON FIELD, stops spawns for 5 seconds
              //  (cont.) and get points for each spawn blocked,

// movement of ENEMY


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
