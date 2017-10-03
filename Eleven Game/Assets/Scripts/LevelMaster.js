#pragma strict

static var inLight : boolean = true;
static var transitionSpeed : float = 0.01;
static var fastTransition : float = 0.008;
static var slowTransition : float = 0.002;
static var seenBySix: boolean = false;
var fadeoutSpeed: float = 0.005;

function Update() {
	if(seenBySix) {
		GetComponent(SpriteRenderer).color.a += fadeoutSpeed; 
	}
}