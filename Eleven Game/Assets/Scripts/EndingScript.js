#pragma strict
private var anim: Animator;
private var script: ZeroScript;

function Start () {
 	anim = GetComponent(Animator);
}

function OnTriggerEnter2D (other : Collider2D) {
	//script = GetComponent(ZeroScript);
	//script.enabled = false;
	if (other.gameObject.tag == "Player") {
		anim.SetTrigger("Freed");
		GetComponent(SpriteRenderer).enabled = true;
		
		script = GetComponent(ZeroScript);
		script.enabled = true;
	}
}
