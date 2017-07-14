GAMENOTES.md

7/12/2017

Ari's Notes:

//
Randomly spawning:

 - Can’t really use set interval
Can’t change interval
In order to make it random, you have to make a loop (like while (true) or 
while (is alive) {
	set timeOut {
		function (random time)
	}
Boxes first
Collision detection
On keypress, consider  distance
set DISTANCE on PIXELS
EX. If x 10 - 20, if 30-100 hits, else sprite hits and you lose points
Challenge is to figure out how to get people keep coming 
Coming in “WAVES”
They come in “ROWS”
Offscreen
Use Z-index
Have them in “memory”
Iterate over them
Store them in the background

Start with boxes
Every time X do SCORE ++ in Var
Update SCORE at the bottom
Score = 0, EVERY TIME KILLS do SCORE ++
Inside click event, few things ->

PS
When click, 
CHECK HIT EVENT
IF YES {
	remove man, 
	score ++
	updateScore ++

SET INTERVAL
	WITH JQ or CSS move the elements (use MDN)
	Anything you get online, you have to link exactly

 MVP:
GET THE GAME LOGIC WORKING

GOALS:
	*Not so important, but MVP
ALERT (you lose, score, just that) **
HAVE A MENU ***
END SCREEN **
HAVE OTHER TYPES OF “MEN” *****
OTHER TYPES OF “ATTACKS” *****
SOUND **
	
COMMIT OFTEN/USE MESSAGES THAT MAKE SENSE
//

//
Using jquery TO: detect the keys
- when hit 1, looks @ player position, looks @ 100px in front of player, loop through all enemies to see if that hitspace (light saber) is inside the enemy's hitbox - if match, kill enemy, add score. Remove enemies in array (maybe have them stay dead)

- use CSS/JS to move the characters around

X_X --- hitbox, block instances of <==, 1 instances of rebels  bolts= <==  <== <==  rebels x 5 <<<<

7/13/2017
X0___VADER___10 <10 (collide) _20(REBEL)___30(REBEL)___40(REBEL__....100
