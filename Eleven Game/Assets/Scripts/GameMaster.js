#pragma strict

static var playerHealth: int = 3;
static var currentLevel: String;

function Awake (){
	DontDestroyOnLoad(this);
}

static function PlayerHit(){
	playerHealth--;
	if(playerHealth > 0){
		Debug.Log("lose 1 life");
	} else {
		Application.LoadLevel(currentLevel);
		playerHealth = 3;
	}
}
