#pragma strict

// Variable poitning to object prefab
var enemyPrefab : Transform;

var isSix: boolean;

var playerSeen: boolean = false;

// Speed of the wave movement
var speed : float;

// Set patrol range of enemy
var range : float;

// Get enemies starting position
private var startPosition : float;

// Direction of the enemy (-ve means left, +ve is right)
var direction: int = 1;

function Start () {
	startPosition = transform.position.x;
}

function FixedUpdate () {
if(!playerSeen) {
   // Find enemies present position
   var currentPosition = transform.position.x;
   
   // Check if enemy is still within patroling range
   if((currentPosition >= startPosition+range) || (currentPosition <= startPosition-range)){  		
		
   		// Change Direction to left if delay is not in place
   		transform.Rotate(0, 4, 0);
   		//indicate what direction the enemy is moving in
   		if(direction == 1) {
   			direction = -1;
   		} else {
   			direction = 1;
   		}
   }  
   // Move the enemy on the horisonatal axis
  	 transform.Translate( new Vector3(Time.deltaTime * speed,0,0));
	}
}

function OnCollisionEnter2D (other : Collision2D) {
	if (isSix && other.gameObject.tag == "Player") {
		playerSeen = true;
	}
}