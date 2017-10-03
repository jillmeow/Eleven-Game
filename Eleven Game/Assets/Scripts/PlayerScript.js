﻿#pragma strict
var speed : float;
var isGrounded : boolean;
var jumpHeight : float;
var charHeight : float;
var maxSpeed : float;
var maxJumps: int;
var walldrag: int;
var invincibilityTime: float = 2;
var canWallJump: boolean;
var animSprites: Sprite[];
var framesPerSecond: float;
var idleSprite: Sprite;
var jumpSprite: Sprite;
var wallSprite: Sprite;
var jumpSound: AudioClip = null;
var endLevel3Sound: AudioClip = null;
var enemyHitSound: AudioClip = null;
private var animRenderer: SpriteRenderer;
private var timeAtAnimStart: float;
private var animRunning: boolean = false;
private var jumps : int = 0;
private var atLeftWall: boolean = false;
private var atRightWall: boolean = false;
private var enemyDirection : int = 1;
private var isInvincible: boolean = false;
private var time: float = 20;
private var flickers: int = 100;
var direction: int = 1;

function Start () {
	animRenderer = GetComponent.<Renderer>() as SpriteRenderer;
}

// On collision with a trigger collider...
function OnTriggerEnter2D(other : Collider2D) {

	if(other.gameObject.tag == "Level3End") {
		if(endLevel3Sound != null) {
         AudioSource.PlayClipAtPoint(endLevel3Sound, transform.position);      
      }
	}
	
	if(other.gameObject.tag == "Health") {
		GameMaster.playerHealth ++;
		if(endLevel3Sound != null) {
         	 AudioSource.PlayClipAtPoint(endLevel3Sound, transform.position);      
      }
		Destroy(other.gameObject);
	}
	//If the player collides with the back or top of an enemy then destroy that enemy
      if(other.gameObject.tag == "ThreeBody" || other.gameObject.tag == "SixBody"){
      	if(!isInvincible){
      	 	Destroy(other.transform.parent.gameObject);
      	 	if(enemyHitSound != null) {
         AudioSource.PlayClipAtPoint(enemyHitSound, transform.position);      
      }
      	 	
      	 	
      	 }
      }
	//If the player collides with the weapon of the 3, then register a hit and apply a knockback effect
	  if(other.gameObject.tag == "ThreeWeapon"){
	  	if(!isInvincible) {
	  		      	 	if(enemyHitSound != null) {
         AudioSource.PlayClipAtPoint(enemyHitSound, transform.position);      
      }
   			GameMaster.PlayerHit();
   			enemyDirection = other.transform.parent.GetComponent(SecurityScript).direction;
   			GetComponent.<Rigidbody2D>().AddForce(Vector3(1*enemyDirection,2,0)*jumpHeight * 0.4);
   			isInvincible = true;
   			time = 0;
   		}

   	  }
   	  
	//If the player collides with the left hand side of a wall section
   if(other.tag == "LeftWall" && canWallJump) {
      // If collided with the left wall, set
      // the left wall flag to true
      atLeftWall = true;
      if(atLeftWall && Input.GetKey (KeyCode.RightArrow) && !isGrounded){
      	//reset jump
      	jumps = 0;
      	//change sprite
      	
      	//increase linear drag to walldrag
      	GetComponent.<Rigidbody2D>().drag = walldrag;
      }
      //If the player collides with the right hand side of a wall section
   } else if(other.tag == "RightWall" && canWallJump) {
      // If collided with the right wall, set
      // the right wall flag to true
      atRightWall = true;
      if(atRightWall && Input.GetKey (KeyCode.LeftArrow) && !isGrounded){
      	//reset jump
      	jumps = 0;
      	//change sprite
      	
      	//increase linear drag to walldrag
      	GetComponent.<Rigidbody2D>().drag = walldrag;
      }
    }
    if(other.tag == "TutorialEnd") {
    	GetComponent.<Rigidbody2D>().isKinematic = true;
    	GetComponent(SpriteRenderer).enabled = false;
    }
}

function Update () {

//If the player is on the ground and the player presses spacebar then make the player jump
	if (Input.GetKeyDown (KeyCode.Space) && isGrounded)
   {
     GetComponent.<Rigidbody2D>().AddForce(Vector3.up * jumpHeight);
     if(jumpSound != null) {
         AudioSource.PlayClipAtPoint(jumpSound, transform.position);      
      }
     Debug.Log("NormalJump");
   }
   //Checks if the player is in the air and they haven't jumped a second time in the air
    if (Input.GetKeyDown(KeyCode.Space) && !isGrounded && jumps < maxJumps) {
    	GetComponent.<Rigidbody2D>().AddForce(Vector3.up * jumpHeight * 0.75);
    	if(jumpSound != null) {
         AudioSource.PlayClipAtPoint(jumpSound, transform.position);      
      }
    	jumps++;
    	Debug.Log("double Jump");
    }
    //Checks if the player is on the left side of the wall and if they are gripping the wall and the player has pressed the jump button
	if(atLeftWall && !isGrounded && Input.GetKeyDown(KeyCode.Space) && canWallJump){
			//makes the player jump out and up
			if (direction == 1) {
					rotatePlayer();
				}
			GetComponent.<Rigidbody2D>().drag = walldrag;
    		GetComponent.<Rigidbody2D>().AddForce(Vector3(-1,1.9,0) * jumpHeight * 1.5);
    		if(jumpSound != null) {
         AudioSource.PlayClipAtPoint(jumpSound, transform.position);      
      }
    		Debug.Log("wall jump left wall");
   		}
   	//Checks if the player is on the left side of the wall and if they are gripping the wall and the player has pressed the jump button
	if(atRightWall && !isGrounded && Input.GetKeyDown(KeyCode.Space) && canWallJump){
		//makes the player jump out and up
			if (direction == -1) {
					rotatePlayer();
				}
			GetComponent.<Rigidbody2D>().drag = walldrag;
    		GetComponent.<Rigidbody2D>().AddForce(Vector3(1,1.9,0) * jumpHeight* 1.5);
    		if(jumpSound != null) {
         AudioSource.PlayClipAtPoint(jumpSound, transform.position);      
      }
    		Debug.Log("wall jump right wall");
   		}

	if(time < invincibilityTime) {
		time += Time.deltaTime;
		if (flickers % 8 == 0) {
			GetComponent(SpriteRenderer).color.a = 1;
			flickers --;
		} else {
			GetComponent(SpriteRenderer).color.a = 0;
			flickers --;
		}
	} else{
		isInvincible = false;
		GetComponent(SpriteRenderer).color.a = 1;
	}
	//Animation for 1
	if(animRunning) {
		var timeSinceAnimStart: float = Time.timeSinceLevelLoad - timeAtAnimStart;
		
		var frameIndex: int = timeSinceAnimStart * framesPerSecond;
		
		if(frameIndex < animSprites.Length) {
			animRenderer.sprite = animSprites [frameIndex];
		} else {
			animRenderer.sprite = animSprites[0];
			animRunning = false;
		}
	}
	
	if(GetComponent.<Rigidbody2D>().velocity.magnitude == 0 && !GetComponent.<Rigidbody2D>().isKinematic) {
		GetComponent(SpriteRenderer).sprite = idleSprite;
	}
	
	if(!isGrounded) {
		if (!(atLeftWall || atRightWall)) {
			GetComponent(SpriteRenderer).sprite = jumpSprite;
		} else {
			GetComponent(SpriteRenderer).sprite = wallSprite;
		}
	}
}

//Player movement goes in here
function FixedUpdate () {
//If the player is on a left wall section and they are no longer holding down the right arrow key, then make them fall down at normal speed
//if(atLeftWall && !Input.GetKey (KeyCode.RightArrow) && !isGrounded){
//      	//change sprite
//      	
//      	//increase linear drag to walldrag
//      	rigidbody2D.drag = 1;
//      }
//If the player is on a left hand wall section and they hold down the right arrow key, make the player slow down(grip the wall)
if(atLeftWall && Input.GetKeyDown (KeyCode.RightArrow) && !isGrounded && canWallJump){
      	//reset jump
      	jumps = 0;
      	//change sprite
      	
      	//increase linear drag to walldrag
      	GetComponent.<Rigidbody2D>().drag = walldrag;
      }
//If the player is on a right wall section and they are no longer holding down the right arrow key, then make them fall down at normal speed
if((atRightWall || atLeftWall) && Input.GetKeyDown (KeyCode.DownArrow) && !isGrounded){
      	//change sprite
      	
      	//increase linear drag to walldrag
      	GetComponent.<Rigidbody2D>().drag = 1;
      }
//If the player is on a right hand wall section and they hold down the right arrow key, make the player slow down(grip the wall)
if(atRightWall && Input.GetKeyDown (KeyCode.LeftArrow) && !isGrounded && canWallJump){
      	//reset jump
      	jumps = 0;
      	//change sprite
      	
      	//increase linear drag to walldrag
      	GetComponent.<Rigidbody2D>().drag = walldrag;
      }
//The player presses the right arrow key and moves right
if(Input.GetKey (KeyCode.LeftArrow) && (!(atLeftWall || atRightWall) || isGrounded)) {
	if(GetComponent.<Rigidbody2D>().velocity.magnitude < maxSpeed) {
		if (direction == 1) {
			rotatePlayer();
		}
		GetComponent.<Rigidbody2D>().AddForce(Vector3.left * speed * -direction);
	}
	//Animation
	if(!animRunning) {
		animRunning = true;
		timeAtAnimStart = Time.timeSinceLevelLoad;
	}
}
//The player presses the left arrow key and moves left
if(Input.GetKey (KeyCode.RightArrow) && (!(atLeftWall || atRightWall) || isGrounded)) {
	if(GetComponent.<Rigidbody2D>().velocity.magnitude < maxSpeed) {
		if (direction == -1) {
			rotatePlayer();
		}
		GetComponent.<Rigidbody2D>().AddForce(Vector3.left * speed * -direction);
	}
	//Animation
	if(!animRunning) {
		animRunning = true;
		timeAtAnimStart = Time.timeSinceLevelLoad;
	}
}
	//Checks if the player is on the ground
	isGrounded = false;
        var hits : RaycastHit2D[];
        hits = Physics2D.RaycastAll (transform.position, Vector3(0,-1,0), charHeight);
        for (var i=0;i<hits.length;i++)
        {
                 if (hits[i].collider.tag == "platform")
                 {                          
                      isGrounded = true;
                      jumps = 0;               
 
                  }     
         }
	
   
}

// When no longer colliding with an object...
function OnTriggerExit2D(other : Collider2D) {
   // Check the tag of the object the player
   // has ceased to collide with
   if(other.tag == "LeftWall") {
      // If collided with the left wall, set
      // the left wall flag to true
      atLeftWall = false;
      //change sprite back
      
      //reset linear drag to 1
      GetComponent.<Rigidbody2D>().drag = 1;
   } else if(other.tag == "RightWall") {
      // If collided with the right wall, set
      // the right wall flag to true
      atRightWall = false;
      //change sprite back
            
      //reset linear drag to 1
      GetComponent.<Rigidbody2D>().drag = 1;
   }
}

function rotatePlayer() {
	transform.Rotate(0,180,0);
	GetComponentInChildren(Camera).transform.Rotate(0,180,0);
	GetComponentInChildren(Camera).transform.Translate(0,0,-11.9);
	direction *= -1;
}
      
      

