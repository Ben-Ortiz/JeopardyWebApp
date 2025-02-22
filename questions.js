document.addEventListener("DOMContentLoaded", async () => {
    const APILINK = "https://opentdb.com/api.php?amount=50&type=multiple";
    const url = new URL(location.href);
    const questionId = url.searchParams.get("id");
    const prizeAmount = url.searchParams.get("prize");

    // Check if questionId exists
    // this block temporary
    if (questionId) {
        console.log(`Question ID: ${questionId}`);  // If found, log it
    } else {
        console.log("No 'id' parameter found in the URL.");
    }

    //grab the responses from local storage
    const jeopardyQuestionsList = JSON.parse(localStorage.getItem("jeopardyQuestions"));

    //sort the local storage by difficulty
    const difficultyOrder = {
        easy: 1,
        medium: 2,
        hard: 3
    }
    jeopardyQuestionsList.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);

    //put the sorted list back in local storage
    localStorage.setItem("jeopardyQuestions", JSON.stringify(jeopardyQuestionsList));


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


});