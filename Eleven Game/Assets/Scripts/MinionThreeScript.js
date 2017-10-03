#pragma strict

// Variable poitning to object prefab
var enemyPrefab : Transform;

// Speed of the wave movement
var speed : float;

// Set patrol range of enemy
var range : int;

// Get enemies starting position
private var startPosition : float;
// Direction of the enemy (-ve means left, +ve is right)
private var direction: int = -1;

function Start () {
	startPosition = transform.position.x;
}

function FixedUpdate () {
   // Find enemies present position
   var currentPosition = transform.position.x;
   
   // Check if enemy is still within patroling range
   if((currentPosition >= startPosition+range) || (currentPosition <= startPosition-range)){  		

   		// Change Direction to left if delay is not in place
   		if(direction == 1){
   			direction = -1;
   		}
   		// Change Direction to right if delay is not in place
   		else if(direction == -1){
   			direction = 1;
   		}
   }   
   // Move the enemy on the horisonatal axis
   transform.Translate( new Vector3(Time.deltaTime * direction * speed,0,0));
}