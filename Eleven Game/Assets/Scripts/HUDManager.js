/*
 Created by: Lech Szymanski
 lechszym@cs.otago.ac.nz
 Dec 17, 2014			
*/
#pragma strict

import UnityEngine.UI;

// Reference to UI panel that is our pause menu
var pauseMenuPanel: GameObject;
var hudHealth : Text;

// Reference to panel's script object 
private var pauseMenu: PauseMenuManager;

function Start () {
	// Initialise the reference to the script object, which is a
   // component of the pause menu panel game object
   pauseMenu = pauseMenuPanel.GetComponent(PauseMenuManager);
   pauseMenu.Hide(); 
}

function Update () {;
	  hudHealth.text = "HP: " + GameMaster.playerHealth;
	  if(Input.GetKey(KeyCode.Escape)) {
      // If user presses ESC, show the pause menu in pause mode
      pauseMenu.ShowPause();
   }
}