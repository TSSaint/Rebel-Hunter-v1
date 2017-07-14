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

//constructor ENEMY
const Enemy = function () { //each one of these enemy has properties holding health,
  this.health = 100;        //size of hitbox, and position
  this.hitbox = {
    width: 100,
    height: 100
  };
  this.position = {
    x: null,
    y: null
  };
};
//end

Enemy.prototype.shoot = function () {

};

//constructor PLAYER
const Player = function () { //holds instance of Darth Vader
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
  $(document).keypress(function (event) { //whenever user clicks these, do it
    if (event.which === 32) {
      //spacebar
      this.block();
    } else if (event.which === 49) {
      //1
      this.attack();
    } else if (event.which === 37) {
      //left
      this.moveLeft();
    } else if (event.which === 38) {
      //right
      this.moveRight();
    }
  });
};

Player.prototype.attack = function () {

};

Player.prototype.block = function () {

};

Player.prototype.moveLeft = function () {

};

Player.prototype.moveRight = function () {

};

//end

//constructor GAME
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
//end
console.log('use the force');

//collision detection
// if (player.position = {100px, 100px})
// if (enemy.position - {100px, 100px})
// COLLISION!!! ->//   ENEMY DIE && ADD TO SCORE
                  //or ENEMIE DIE && REMOVE HEALTH, ADD TO SCORE
                  //or DEFLECT && ADD TO SCORE
                  //or PLAYER DIE

// document.querySelector('#game').innerHTML += `<div></div>`;
