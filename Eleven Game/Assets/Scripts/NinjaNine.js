#pragma strict
private var anim: Animator;

function Start () {
 	anim = GetComponent(Animator);
}

function OnTriggerEnter2D (other : Collider2D) {
	if (other.gameObject.tag == "Player") {
		anim.SetTrigger("GameStart");
		GetComponent(SpriteRenderer).enabled = true;
	}
}
