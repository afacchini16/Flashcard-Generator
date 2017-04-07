var fs = require('fs');
var inquirer = require('inquirer');


inquirer.prompt([{
        name: "question",
        message: "Enter a question: "
      },
      {
          name: "answer",
          message: "Enter the answer: "
      }
        ]).then(function(answers){
        // Saves the inputs in variables to be used by the subsequent functions
        // userInputQuestion = answers.question;
        // userInputAnswer = answers.answer;

        // Checks if the user forgot to enter one or both of the fields
        if (cardObj.inputChecker(answers.question, answers.answer)) {
        
            // Creates a new instance of tha BasicCard constructor
            var newUserBasicCard = new BasicCard(answers.question, answers.answer);
            
            // Prints the user's inputs to the screen
            cardObj.printToScreen(newUserBasicCard.front, newUserBasicCard.back);
            // Updates the log.txt file with the user's inputs
            cardObj.updateFile(newUserBasicCard.front, newUserBasicCard.back);
        }
});

// Constructor to make basic cards
function BasicCard(question, answer) {
    this.front = question;
    this.back = answer;
}

var cardObj = {
    inputChecker: function(question, answer){
        // If both fields are left blank
        if (!question && !answer){
            console.log("Come on man, you left both blank... Enter a QUESTION and ANSWER");
            return false;
        } 
        // If the user didn't enter a question
        if (!question) {
            console.log("Please enter a QUESTION!");
            return false;
        }
        // If the user didn't enter an answer
        if (!answer){
            console.log("Please enter an ANSWER!");
            return false;
        }

        return true;
    },
    // Prints the question and answer to the terminal
    printToScreen: function (question, answer){
    console.log(`
        Question: ${question}
        Answer: ${answer}
        `);
    },

    // Updates log.txt which contains a history of past inputs 
    updateFile: function (question, answer){
        fs.appendFile("log.txt", " " + (question + ", " +  answer + "."), 
        function(error, data){
            // If error then alert the user and display the error
            if(error) {
                console.log("ERROR: " + error);
            }
        })
    }

}