#pragma strict
private var anim: Animator;
function Start () {
 	anim = GetComponent(Animator);
}

function OnCollisionEnter2D (other : Collision2D) {
	if (other.gameObject.tag == "Player") {
		anim.enabled = false;
		Debug.Log("Player Seen");
	}
}
