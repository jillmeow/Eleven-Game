#pragma strict

function StartGame () {
	// Load the game
	GameMaster.currentLevel = "LevelOne";
	Application.LoadLevel(GameMaster.currentLevel);
}

function QuitGame () {
	// Quit the game
	Application.Quit();
}