# Note Taker

## Description
This application uses an Express.js back-end to write, save, and delete notes from JSON file.

## User Story
AS A small business owner  
I WANT to be able to write and save notes  
SO THAT I can organize my thoughts and keep track of tasks I need to complete  

## Acceptance Criteria
GIVEN a note-taking application  
WHEN I open the Note Taker, THEN I am presented with a landing page with a link to a notes page.  
WHEN I click on the link to the notes page, THEN I am presented with a page with existing notes listed in the left-hand column, plus empty fields to enter a new note title and the note’s text in the right-hand column.  
WHEN I enter a new note title and the note’s text, THEN a "Save Note" button and a "Clear Form" button appear in the navigation at the top of the page.  
WHEN I click on the Save button, THEN the new note I have entered is saved and appears in the left-hand column with the other existing notes and the buttons in the navigation disappear.  
WHEN I click on an existing note in the list in the left-hand column, THEN that note appears in the right-hand column and a "New Note" button appears in the navigation.  
WHEN I click on the "New Note" button in the navigation at the top of the page, THEN I am presented with empty fields to enter a new note title and the note’s text in the right-hand column and the button disappears.

## Installation for developers
Install Node.js, if needed.     

Create a .gitignore file and include "node_modules", ".vscode", and "package-lock.json" in it, so that these files aren't tracked or uploaded to GitHub. Be sure to create your .gitignore file before installing any npm dependencies.     

Make sure that your repo includes a package.json with the required dependencies. You can create one by running "npm init" when you first set up the project, before installing any dependencies.     

This application requires the Express.js module. To install express, navigate to your terminal and enter "npm install express".    

## Usage for developers
Right-click on the "server.js" file and select "Open in Integrated Terminal". To initiate application, type "node server.js" and press enter. 

## The following video demonstrates the application's functionality
![Demonstration of application that allows users to enter, modify, and delete notes.](https://github.com/Meowlory3579/note-taker/blob/main/assets/note-taker.gif)

## Deployed URL
https://note-taker-2fdz.onrender.com/

## Credits
Starter Code sourced from: https://github.com/coding-boot-camp/miniature-eureka | Delete request help from: https://www.youtube.com/watch?v=00NNuZHF56A