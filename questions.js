document.addEventListener("DOMContentLoaded", async () => {
    const APILINK = "https://opentdb.com/api.php?amount=50&type=multiple";
    const url = new URL(location.href);
    const questionId = url.searchParams.get("id");

    // Check if questionId exists
    if (questionId) {
        console.log(`Question ID: ${questionId}`);  // If found, log it
    } else {
        console.log("No 'id' parameter found in the URL.");
    }

    const jeopardyQuestionsList = JSON.parse(localStorage.getItem("jeopardyQuestions"));

    console.log("getting from local")
    console.log(jeopardyQuestionsList);
    
    /*
    note: each element has the properties
    category: "vehicles"
    correct_answer: "1UZ-FE"
    difficulty: "hard"
    incorrect_answers: ["asbdf", "sadf", "asdf"]
    question: "what engine is in the Lexus SC400?"
    type: "multiple" 
    */
   
    for(let i = 0; i < jeopardyQuestionsList.length; i++) {
        const element = jeopardyQuestionsList[i];
        if(i == questionId) {
            console.log(element);
            console.log(element.question);
        }
    }


});