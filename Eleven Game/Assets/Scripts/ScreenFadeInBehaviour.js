#pragma strict
var startFading: boolean = false;
var fadeSpeed: float = 0.01;

function Start () {
	startFading = true;

}

function Update () {
	if(startFading) {
		GetComponent(SpriteRenderer).color.a -= fadeSpeed; 
	}

}