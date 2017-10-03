#pragma strict
var color : float;
function Start () {

}

function OnTriggerStay2D(other: Collider2D) {
	if(other.tag == "Player"){
		LevelMaster.inLight = true;
	}
}

function FixedUpdate () {

if (GetComponent(SpriteRenderer).color.a <= 0.2 || GetComponent(SpriteRenderer).color.a >= 0.8){
	LevelMaster.transitionSpeed = LevelMaster.fastTransition;
} else {
	LevelMaster.transitionSpeed = LevelMaster.slowTransition;
}

if (LevelMaster.inLight && GetComponent(SpriteRenderer).color.a >= 0)  {
	GetComponent(SpriteRenderer).color.a -= LevelMaster.transitionSpeed;
	}
if (!LevelMaster.inLight){
	GetComponent(SpriteRenderer).color.a += LevelMaster.transitionSpeed;
	if (GetComponent(SpriteRenderer).color.a >= 1) {
		GetComponent(SpriteRenderer).color.a = 1;
		}
	}
}