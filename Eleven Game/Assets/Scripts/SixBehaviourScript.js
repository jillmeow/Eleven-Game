#pragma strict

var hasCollided: boolean = false;
private var time: float = 100;
var fadeoutTime: float = 2;
var playerSeenSix: Sprite;
var fadeoutSpeed: float = 0.007;
var childSprite: Transform;
var playerSeen: Sprite;
var seenBySixSound: AudioClip = null;

function Start () {

}

function OnCollisionEnter2D(other : Collision2D) {
	if(other.gameObject.tag == "Player" && !hasCollided) {
		hasCollided = true;
		time = 0;
		other.gameObject.GetComponent.<Rigidbody2D>().isKinematic = true;
		other.gameObject.GetComponent(PlayerScript).enabled = false;
		other.gameObject.GetComponent(SpriteRenderer).sprite = playerSeen;
		childSprite.GetComponent(SpriteRenderer).sprite = playerSeenSix;
		if(seenBySixSound != null) {
         AudioSource.PlayClipAtPoint(seenBySixSound, transform.position);      
      }
	}
}

function Update () {
	if(hasCollided) {
	
		if(time < fadeoutTime) {
			time += Time.deltaTime;
		} else {
			Application.LoadLevel(GameMaster.currentLevel);
			GameMaster.playerHealth = 3;
		}
			if(hasCollided) {
		GetComponent(SpriteRenderer).color.a += fadeoutSpeed; 
	}
	}
}