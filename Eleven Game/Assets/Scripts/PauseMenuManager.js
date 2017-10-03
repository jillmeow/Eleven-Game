/*
 Created by: Lech Szymanski
 lechszym@cs.otago.ac.nz
 Dec 17, 2014			
*/
#pragma strict

import UnityEngine.UI;

// References to text objects on the panel
var resumeText : Text = null;
var quitText : Text = null;

// Array storing text objct with index
// indicating the current selection
private var optionIdx: int = 0;
private var optionArray: Text[];

// Indicates whether the game in paused mode
private var pauseGame: boolean;

function Start () {
	// We have two text object in the panel,
	// so create an array with 2 references
	// and set the first referect ot resumeText
	// and second reference to quitText
	optionArray = new Text[2]; 
	optionArray[0] = resumeText;
	optionArray[1] = quitText;
}

// Show the pause menu in pause mode (the
// first option will say "Resume")
function ShowPause() {
	// Pause the game
	pauseGame = true;
	// Set the text of the first option
	// to "Resume"
	resumeText.text = "Resume";
	// Show the panel
	gameObject.SetActive(true);
}

// Show the pause menu in game over mode (the
// first option will say "Restart"
function ShowGameOver() {
	// Set the text of the first option
	// to "Restart"
	resumeText.text = "Restart";
	// Show the panel
	gameObject.SetActive(true);
}

// Hide the menu panel
function Hide() {
	// Deactivate the panel
	gameObject.SetActive(false);
	// Resume the game (if paused)
	pauseGame = false;
	Time.timeScale = 1.0;
}

// Execute a command base on command string (that string
// corresponds to text of the entered option
function ExecuteCommand(command: String) {

	switch(command) {
	
		// For resume option, just hide the panel
		// (the pausegame flag will be set to false)
		case "Resume":
			Hide();
			break;

		// For the restart option just reload current scene
		case "Restart":
			Application.LoadLevel(Application.loadedLevel);
			break;

		// For the quit option load the main menu scene			
		case "Quit":
			Application.LoadLevel("MainMenu");
			break;
					
	}
}

function Update () {
	// Get a reference to the currently selected text box	
	var currentSelection: Text = optionArray[optionIdx];

	if(Input.GetKey(KeyCode.DownArrow)) {
		// When user presses down arrow, go to next option
		optionIdx++;
	} else if(Input.GetKey(KeyCode.UpArrow)) {
		// When user presses up arrow, go to previous option
		optionIdx--;
	} else if(Input.GetKey(KeyCode.Return) || Input.GetAxis("Jump")) {
		// If uses presses Enter or "Jump" key (Space), execute
		// the command corresponding to the current option
		ExecuteCommand(currentSelection.text);
	}
	// Click the resume box
	if(Input.mousePosition.x >= 324.4 && Input.mousePosition.x <= 437.6 &&
		Input.mousePosition.y >= 217.6 && Input.mousePosition.y <= 238.1){
		currentSelection = optionArray[0];
		if(Input.GetMouseButton(0) || Input.GetKey(KeyCode.Return) || Input.GetAxis("Jump")){
			ExecuteCommand(currentSelection.text);
		}
	// Click quit box
	} else if(Input.mousePosition.x >= 354.9 && Input.mousePosition.x <= 410.0 &&
		Input.mousePosition.y >= 149.0 && Input.mousePosition.y <= 171.0){
		currentSelection = optionArray[1];
		if(Input.GetMouseButton(0) || Input.GetKey(KeyCode.Return) || Input.GetAxis("Jump")){
			ExecuteCommand(currentSelection.text);
		
		}
	}
	// Make sure that the option index indicator is within the range
	// of the number of options
	if(optionIdx < 0) {
		optionIdx = 0;
	} else if(optionIdx >= optionArray.Length) {
		optionIdx = optionArray.Length-1;
	}

	// Set the font colour of the all option text boxes to white	
	for(var i : int = 0; i < optionArray.Length; i++)
    {
		optionArray[i].color = Color.white;
    }
    // Set the font colour of the currently selected text box
    // to yellow
	currentSelection.color = Color.yellow;
		
	// If game is in pause mode, stop the timeScale value to 0
	if(pauseGame) {
		Time.timeScale = 0;
	}	
}