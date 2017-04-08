// Link the other files and inquirer module
var ClozeCard = require("./ClozeCard.js");
var BasicCard = require("./Basic-Card.js");
var inquirer = require("inquirer");

// Ask the user if they want to create a basic or cloze flash card
inquirer.prompt([
    {
        name: "initialQuestion",
        message: "Which type of flash card would you like to make?",
        type: "list",
        choices: ["Basic", "Cloze"]
    }
// After the answer is obtained from the above inquirer module
]).then(function(answer){
    // If the user picked "Basic"
    if (answer.initialQuestion === "Basic"){
        // Execute the first function in the Basic-Card.js file which calls another
        // inquirer module
        BasicCard.userInput();
    }
    // Else if the user picked "Cloze"
    else if (answer.initialQuestion === "Cloze"){
        // Call the function in "ClozeCard.js" that gets the user's input and starts calling
        // the necessary functions
        ClozeCard.userInput();
    }
})