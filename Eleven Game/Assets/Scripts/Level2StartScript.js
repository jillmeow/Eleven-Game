#pragma strict
var dialogueSprites: Sprite[];
var nextLevel: String;
private var dialogueIndex: int = 0;

function Start () {

}

function Update () {
	if (Input.anyKeyDown) {
		if(dialogueIndex < dialogueSprites.Length){
			GetComponent(SpriteRenderer).sprite = dialogueSprites[dialogueIndex];
			dialogueIndex++;
			} else {
				GameMaster.currentLevel = nextLevel;
				Application.LoadLevel(GameMaster.currentLevel);
			}
	}

}