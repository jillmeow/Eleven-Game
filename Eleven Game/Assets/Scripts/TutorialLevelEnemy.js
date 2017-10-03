#pragma strict

private var hasCollided: boolean = false;
private var time: float = 100;
var fadeoutTime: float = 2;
var playerSeen: Sprite;
var fadeoutSpeed: float = 1;
var nextLevel: String;
var endLevelSound: AudioClip = null;

function Start () {

}

function OnTriggerEnter2D(other : Collider2D) {
	if(other.tag == "Player" && !hasCollided) {
		hasCollided = true;
		time = 0;
		GetComponent(SpriteRenderer).sprite = playerSeen;
		if(endLevelSound != null) {
         AudioSource.PlayClipAtPoint(endLevelSound, transform.position);      
      }
	}
}

function Update () {
	if(hasCollided) {
		if(time < fadeoutTime) {
			time += Time.deltaTime;
		} else {
			GameMaster.currentLevel = nextLevel;
			Application.LoadLevel(GameMaster.currentLevel);
		}
	}
}