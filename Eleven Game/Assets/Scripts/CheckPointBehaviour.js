#pragma strict
var reachedCheckpoint : Sprite;
var checkPoint: String;

function Start () {

}

function OnTriggerEnter2D(other : Collider2D) {
	if(other.tag == "Player") {
		GameMaster.currentLevel = checkPoint;
		GetComponent(SpriteRenderer).sprite = reachedCheckpoint;
	}
}

function Update () {

}