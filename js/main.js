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

// change GAME STATES --- STARt --- GAME ---- END/REPLAY
function beginGame() {
  // let gameStart = $(document.querySelector('start-screen').removeClass('active'));
  $('#start-screen').removeClass('active');
  $('#gameplay').addClass('active');
  // gameStart.appendTo('gameplay'); // wrong
}

$('.action-begin').click(beginGame);

// $('')
//write function with an event listener onclick to occur when button class="action-begin" is pressedv


// constructor SCORE
// const Score = function () {
//   this.score = $('#score');
// }

var score = $('#score');

// constructor ENEMY
const Enemy = function () { // each one of these enemy has properties holding health,
  this.health = 100;        // size of hitbox, and position
  this.hitbox = {
    width: 100,
    height: 100
  };
  this.position = {
    x: null,
    y: null
  };
};
// end

Enemy.prototype.shoot = function () {

};

// constructor PLAYER
const Player = function () { // holds instance of Darth Vader
  this.health = 100;
  this.hitbox = {
    width: 100,
    height: 100
  };
  this.position = {
    x: null,
    y: null
  };
};

Player.prototype.addListeners = function () {
  $(document).keypress(function (event) { // whenever user clicks these, do it
    if (event.which === 32) {
      // spacebar
      this.block();
    } else if (event.which === 49) {
      // 1
      this.attack();
    } else if (event.which === 37) {
      // left
      this.moveLeft();
    } else if (event.which === 38) {
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
  // $('player').
};

Player.prototype.moveRight = function () {
  // $('player').
};

// end

// constructor GAME
const Game = function () {
  this.score = 0;     //add this. -- and = Num;
  this.enemies = [];  //add this. -- and = [];
  this.player = new Player();
};

Game.prototype.addListeners = function () {
  $('.action-begin').click(function (event) {
    /* Act on the event */
    this.start(); //doesn't refer to Game constructor. instead, refers to the button
  }).bind(this); //makes refer to Game!!!!!!!111111!!
};

Game.prototype.start = function () { //turn into X.prototype.FUNCTION = function () {};
  var enemy = new Enemy(); //creates new bad guys!!!!
  this.enemies.push(enemy); //looks at Game constructor, and calls 1 new bad guy
};

Game.prototype.die = function () {
  this.player.remove(Player)
};

const game = new Game();
game.addListeners();
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
const player = 90;

var enemy = 900;
setInterval (() => {
  enemy -= 20;
  $('.enemy').css('left', `${enemy}px`);
  if (enemy === player) { // collision detection
    // alert('It`s Vader!');
    enemy = -enemy; // "die when touch"
  }
}, 200);

// if ($'.enemy'.pos = 800) {
//   console.log('you get hurt');
//   // REMOVE SCORE
// };

// movement of BOLT
var bolt = 900;
setInterval (() => {
  bolt -= 10;
  $('.bolt').css('left', `${bolt}px`);
  if (bolt === player) { // collision detection
    // alert('Pew pew (Deflect)');
    bolt = -bolt; // "disappate when touch"
  }
}, 30)

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
