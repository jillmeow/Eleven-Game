#pragma strict

// Rate of the 'bob' movement
var bobRate: float;
// Scale of the 'bob' movement
var bobScale: float;

function Update () {
	
	// Change in vertical distance 
	var dy : float = bobScale * Mathf.Sin(bobRate*Time.time);

	// Move the game object on the vertical axis
	transform.Translate(new Vector3(0,dy,0));
}