document.addEventListener("DOMContentLoaded", async () => {
    const APILINK = "https://opentdb.com/api.php?amount=50&type=multiple";
    const url = new URL(location.href);
    const questionId = url.searchParams.get("id");
    const prizeAmount = url.searchParams.get("prize"); 
    const questionContainer = document.getElementById("question-container");

    // Check if questionId exists
    // this block temporary
    if (questionId) {
        console.log(`Question ID: ${questionId}`);  // If found, log it
    } else {
        console.log("No 'id' parameter found in the URL.");
    }

    //grab the responses from local storage
    const jeopardyQuestionsList = JSON.parse(localStorage.getItem("jeopardyQuestions"));

    console.log("getting from local") //temporary
    console.log(jeopardyQuestionsList); //temporary

    /*
    note: each element has the properties
    category: "vehicles"
    correct_answer: "1UZ-FE"
    difficulty: "hard"
    incorrect_answers: ["asbdf", "sadf", "asdf"]
    question: "what engine is in the Lexus SC400?"
    type: "multiple" 
    */
    let element = null;
    for (let i = 0; i < jeopardyQuestionsList.length; i++) {
        const temp = jeopardyQuestionsList[i];
        if (i == questionId) {
            element = temp;
        }
    }

    console.log(element);
    console.log(element.question)

    // fixes html to readable string
    function decodeHTML(str) {
        const doc = new DOMParser().parseFromString(str, 'text/html');
        return doc.documentElement.textContent || doc.body.textContent;
    }
    
    // make input field
    questionContainer.innerText = decodeHTML(element.question);
    const input = document.createElement("input");
    input.setAttribute("id", "answerField")
    input.type = "text";
    input.placeholder = "Enter answer here";
    
    // make button
    const submitAnswerButton = document.createElement("button");
    submitAnswerButton.setAttribute("id", "submitAnswerButton")
    submitAnswerButton.innerText = "Submit";

    //add it to the questionContainer
    questionContainer.appendChild(input);
    questionContainer.appendChild(submitAnswerButton);




});