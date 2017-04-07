var inquirer = require('inquirer');
var answer = "";
var fullQuestion = "";
var clozeQuestion = "";
var partialText = "";
var numOfWordsInAnswer = 0;
var theTerminator = true;

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
    fullQuestion = answers.question;
    answer = answers.answer.toString();
    // console.log(".then: " + fullQuestion);

    var firstPresidentCloze = new ClozeCard(fullQuestion, answer);
    // console.log("firstPresidentCloze: " + firstPresidentCloze.cloze);
    
    clozeCardObj.init(fullQuestion, answer);
    // console.log("term before 2nd inquirer: " + theTerminator);
    if (theTerminator){
    inquirer.prompt([
        {
        name: "finalQuestion",
        message: "What would you like to see (cloze, partial, full question)?"
        }
    ]).then(function(answer){
        
        answer = answer.finalQuestion;
        // console.log(answer);
        // console.log("firstPresidentCloze: " + firstPresidentCloze.cloze);

        clozeCardObj.printClozePartialFull(answer, firstPresidentCloze);
    })
    }
});



function ClozeCard(fullQuestion, answer) {
    this.cloze = answer;
    this.fullText = fullQuestion;
    this.partial = clozeCardObj.addNumOfUnderlines(fullQuestion, answer);
}
var clozeCardObj = {
    fullQuestionFun: function() {
        // console.log(fullQuestion);
        numOfWordsInAnswer = answer.split(" ").length;
        // console.log(partialText);
    },

       checkIfWordsAreTogether: function(questionArray, answerArray){
        //  console.log(questionArray);
         if (theTerminator){
            if (answerArray.length > 1){  
            for (i = 0; i < questionArray.length; i++){
                // console.log(answerArray[i]);
                if (questionArray[i].includes(answerArray[0])){
                    // console.log(questionArray[i] + ", " + answerArray[0]);
                    if(answerArray[1] != questionArray[i + 1]){
                        console.log("Words aren't next to each other!");
                        
                        theTerminator = false;
                        return false;
                            }
                        }
                    }
                }
           }
        clozeCardObj.addNumOfUnderlines(questionArray.join(" "), answerArray.join(" "));

       },

    checkForBlankFields: function(questionArray, answerArray){
        // var theTerminator = true;
            if (questionArray[0] === "" && answerArray[0] ==="") {
                console.log("You forgot to add both a question and an answer!");
                theTerminator = false;
                // return false;
            }
            else if (questionArray[0] === "") {
                console.log("You forgot to enter a question!");
                theTerminator = false;
                // return false;
            }
            else if (answerArray[0] === "") {
                console.log("You forgot to enter an answer!");
                theTerminator = false;
                // return false;
            }
            else {
                // console.log("correct input");
                // console.log(questionArray.join(" "));
                clozeCardObj.checkIfWordsAreTogether(questionArray, answerArray);
                // return true;
            }
    },
    
    // Gets the answer from the 2nd inquirer from the user
    // Then prints the appropriate response
    printClozePartialFull: function(answer, firstPresidentCloze){
        if (answer === "cloze"){
            console.log("Cloze: ");
            console.log(firstPresidentCloze.cloze);
        }
        else if (answer === "partial"){
            console.log("Partial answer: ");
            console.log(firstPresidentCloze.partial);
        }
        else if (answer === "full question"){
            console.log("Full Question: ");
            console.log(firstPresidentCloze.fullText);
        }
        else {
            console.log('Invalid answer. Please enter "cloze", "partial", or "full question".');

        }
    },

    // This function is not scaleable (will not work if the user's answer has more than 
    // three words) but will work for the time being
    addNumOfUnderlines: function(fullQuestion, answer) {
        // console.log("addNumoflines");
        if (theTerminator){
            numOfWordsInAnswer = answer.split(" ").length;
            var answerCheck = fullQuestion.replace(answer," ");
            var tempBlanks = ""
            var questionArray = fullQuestion.split(" ");
            // console.log("questionArray length: " + questionArray.length);
            var answerArray = answer.split(" ");

            for (i = 0; i < numOfWordsInAnswer; i++){
                var tmp = fullQuestion
                // partialText = fullQuestion.replace(answerArray[i], "_____");
                fullQuestion = fullQuestion.replace(answerArray[i], "_____");
            }
        }
        // console.log(fullQuestion);
    return fullQuestion;
    },

    setValues: function(){

    },
    
        init: function(fullQuestion, answer){
            // console.log("init fullQuestion: " + fullQuestion);

            var answerArray = answer.split(" ");
            // console.log(answerArray);
            var questionArray = fullQuestion.split(" ");
            // console.log("init questionArray: " + questionArray);
            // console.log(questionArray);
            // var theTerminator = true;
            this.checkForBlankFields(questionArray, answerArray);
            // console.log(theTerminator);
        }  
    }