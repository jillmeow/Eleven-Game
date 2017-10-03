#pragma strict
private var startFading: boolean = false;
var fadeSpeed: float = 0.005;

function Start () {

}

function OnTriggerEnter2D (other : Collider2D) {
	startFading = true;
}

function Update () {
	if(startFading) {
		GetComponent(SpriteRenderer).color.a += fadeSpeed; 
	}

}