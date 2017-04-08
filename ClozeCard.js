var inquirer = require('inquirer');
var answer = "";
var fullQuestion = "";
var clozeQuestion = "";
var partialText = "";
var numOfWordsInAnswer = 0;
var theTerminator = true;
// Exports both the init function and the ClozeCard constructor which creates an object
module.exports = {
    userInput: function(){
        userInput();
    },
    ClozeCard: ClozeCard
};

// Gets the initial question and answer
function userInput(){
inquirer.prompt([
    {
    name: "question",
    message: "Please enter the full question with the answer: "
    },
    {
        name: "answer",
        message: "Please enter the answer(case sensitive): "
    }
]).then(function(answers){
    // Save the two answers to variables
    fullQuestion = answers.question;
    answer = answers.answer.toString();
    
    // Creates a new object by passing the answers as arguments to the constructor 
    var firstPresidentCloze = new ClozeCard(fullQuestion, answer);
    
    // Calls the init function which starts the data analysis and subsequent function calls
    clozeCardObj.init(fullQuestion, answer);
    // Only executes if the user has correctly answer the fields
    if (theTerminator){
    // Inquirer module for the final question: cloze, partial, full question
    inquirer.prompt([
        {
        name: "finalQuestion",
        message: "What would you like to see (cloze, partial, full question)?",
        type: "list",
        choices: ["Cloze", "Partial", "Full Question"]
        }
    ]).then(function(answer){
        
        answer = answer.finalQuestion;
        // Calls a function that will display a string based upon what the user chose
        clozeCardObj.printClozePartialFull(answer, firstPresidentCloze);
    });
    }
});
}

// Constructor that has properties of the full question, the answer, and then using the 
// addNumOfUnderlines function, calculates the partial text
var ClozeCard =  function(fullQuestion, answer) {
    this.cloze = answer;
    this.fullText = fullQuestion;
    this.partial = clozeCardObj.addNumOfUnderlines(fullQuestion, answer);
};


// Encapsulate all functions that use the constructor's created object into an object
var clozeCardObj = {
       // Checks if the words the user entered via inquirer are next to each other
       checkIfWordsAreTogether: function(questionArray, answerArray){
        // Will only execute this function if the user's input has passed the functions called
        // before this one
         if (theTerminator){
            //  Will only check if the answer has more than one word
            if (answerArray.length > 1){
            // Executes for loop for each word in the full question
            for (var i = 0; i < questionArray.length; i++){
                // If the specific word in the full question array matches the first answer
                if (questionArray[i].includes(answerArray[0])){
                    // Checks if the next word in the answer array is the same as the next work
                    // in the full question array
                    if(answerArray[1] != questionArray[i + 1]){
                        console.log("Words aren't next to each other!");
                        // Sets theTerminator to false so that the other functions do not execute
                        theTerminator = false;
                            }
                        }
                    }
                }
           }
        // Once it is confirmed that the question and answer were input correctly, start
        // the actual data processing
        clozeCardObj.addNumOfUnderlines(questionArray.join(" "), answerArray.join(" "));
       },
    // This function will check if the user one or both of the first fields blank   
    checkForBlankFields: function(questionArray, answerArray){
            // First check if both fields were left blank
            if (questionArray[0] === "" && answerArray[0] ==="") {
                console.log("You forgot to add both a question and an answer!");
                // Set theTerminator to false so that the program logs error and exits
                theTerminator = false;
            }
            // Checks if the question field was left blank
            else if (questionArray[0] === "") {
                console.log("You forgot to enter a question!");
                theTerminator = false;
            }
            // Checks if the answer field was left blank
            else if (answerArray[0] === "") {
                console.log("You forgot to enter an answer!");
                theTerminator = false;
            }
            // Else, info was entered correctly.  Call the next function
            else {
                clozeCardObj.checkIfWordsAreTogether(questionArray, answerArray);
            }
    },
    
    // Gets the answer from the 2nd inquirer from the user
    // Then prints the appropriate response
    printClozePartialFull: function(answer, firstPresidentCloze){
        // If they chose cloze, display the necessary info
        if (answer.toLowerCase() === "cloze"){
            console.log("Cloze: ");
            console.log(firstPresidentCloze.cloze);
        }
        // If they entered partial, display the partial answer with blanks where the 
        // missing words are
        else if (answer.toLowerCase() === "partial"){
            console.log("Partial answer: ");
            console.log(firstPresidentCloze.partial);
        }
        // If they entered full question, display info
        else if (answer.toLowerCase() === "full question"){
            console.log("Full Question: ");
            console.log(firstPresidentCloze.fullText);
        }
    },

    // This function is not scaleable (will not work if the user's answer has more than 
    // three words) but will work for the time being
    addNumOfUnderlines: function(fullQuestion, answer) {
        // If all other info has been entered correctly up to this point
        if (theTerminator){
            // Find the number of words in the answer
            numOfWordsInAnswer = answer.split(" ").length;
            
            // Put the question into an array, where each word is at a specific index
            var questionArray = fullQuestion.split(" ");
            // Same as above but with the answer
            var answerArray = answer.split(" ");

            // Do this for the number of words in the answer
            for (var i = 0; i < numOfWordsInAnswer; i++){
                // replace the specific word in the answer with an blank
                fullQuestion = fullQuestion.replace(answerArray[i], "_____");
            }
            // Call the next function
            clozeCardObj.checkIfAnswerInQuestion(questionArray, answerArray);
            // Return the overwritten fullQuestion which is the answer for the partial answer
            return fullQuestion;
        }        
    },

    // Checks if the answer entered is in the question
    checkIfAnswerInQuestion: function(questionArray, answerArray){
        var correctAnswerCounter = 0;
        
        // Iterate for the number of words in answer
        for (var i = 0; i < numOfWordsInAnswer; i++){
            // Iterate for the number of words in the full question
            for (var j = 0; j < questionArray.length; j++){
                // If the specific word in answer is the same as a word in the question
                if (answerArray[i] === questionArray[j]){
                    // Increment the counter
                    correctAnswerCounter++;
                }
            }
        }
        // If the counter is less than the number of words in answer, the answer entered is missing
        // one or more word from the question
        if (correctAnswerCounter < numOfWordsInAnswer){
            console.log("Answer is not in word!");
            // Exit the program
            theTerminator = false;
        }
    },
        // Initial function being called that takes the full question and answer as arguments and
        // puts them into arrays where each word is an index, to be checked and modified as other
        // functions are called at a later time
        init: function(fullQuestion, answer){
            // Put both the answer and full question into arrays
            var answerArray = answer.split(" ");
            var questionArray = fullQuestion.split(" ");
            // Call the next function that will be the first check on the user's inputs
            this.checkForBlankFields(questionArray, answerArray);
            
        }  
    }