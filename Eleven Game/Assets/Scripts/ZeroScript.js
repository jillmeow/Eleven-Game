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
private var endPosition : float;
private var anim: Animator;
// Direction of the enemy (-ve means left, +ve is right)
var direction: int = 1;

function Start () {
	startPosition = transform.position.x;
	anim = GetComponent(Animator);
}

function FixedUpdate () {
if(!playerSeen) {
   // Find enemies present position
   var currentPosition = transform.position.x;
   
   // Check if enemy is still within patroling range
   if(currentPosition >= startPosition+range){  		
		//Stop
		Debug.Log("stop");
		endPosition = currentPosition;
		anim.SetTrigger("Defeated");
   }  
   // Move the enemy on the horisonatal axis
   else{
  	 transform.Translate( new Vector3(Time.deltaTime * speed,0,0));
  	}
}
}