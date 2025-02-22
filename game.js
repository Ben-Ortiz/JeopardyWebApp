document.addEventListener("DOMContentLoaded", function () {

    const APILINK = "https://opentdb.com/api.php?amount=50&type=multiple";
    const gameGridCategories = document.getElementById("gameGridCategories");
    const gameGridQuestions = document.getElementById("gameGridQuestions");
    const restartButton = document.getElementById("restartButton");

    //helper function, thats not used
    function incrementKey(map, key) {
        if (map.has(key)) {
            map.set(key, map.get(key) + 1);
        } else {
            map.set(key, 1);
        }
    }

    //sorts questions by difficulty after fetching from API
    async function sortQuestions(data) {
        // Define difficulty order for sorting
        const difficultyOrder = {
            easy: 1,
            medium: 2,
            hard: 3
        };

        // Sort the questions based on difficulty as you fetch them
        const sortedQuestions = data.results.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);

        // Save the sorted questions to localStorage
        localStorage.setItem("jeopardyQuestions", JSON.stringify(sortedQuestions));
    }

    // creates new questions
    async function newQuestions(url) {
        localStorage.clear();
        try {
            const response = await fetch(url);
            const data = await response.json();
            sortQuestions(data);

            // After sorting, we fetch the stored questions
            const storedQuestions = JSON.parse(localStorage.getItem("jeopardyQuestions"));
            console.log(storedQuestions);
        } catch (e) {
            console.error("Error fetching data:", e);
        }
    }

    //persistant data using local storage
    async function getJeopardyQuestions(url) {
        try {
            const storedQuestions = JSON.parse(localStorage.getItem("jeopardyQuestions"));
            if (!storedQuestions) {
                // Fetch questions from the API
                const response = await fetch(url);
                const data = await response.json();

                sortQuestions(data);

                console.log("Fetched and sorted questions:", sortedQuestions);
            } else {
                console.log(storedQuestions);
            }
        } catch (error) {
            console.error("error fetching data: ", error);
        }
    }

    //can only url because i cant too many requests to url
    async function createGrid(url1) {
        const categories = new Map();

        //this is for the category headers names
        for (let row = 1; row < 2; row++) {
            for (let col = 0; col < 6; col++) {



                const gridItem = document.createElement("div");
                gridItem.classList.add("grid-item-categories");
                gridItem.innerText = `Category`;

                gameGridCategories.appendChild(gridItem);
            }
        }

        //for the category questions
        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 6; col++) {
                let questionId = row * 6 + col;
                const link = document.createElement("a");


                const gridItem = document.createElement("div");
                gridItem.classList.add("grid-item-questions");
                gridItem.innerText = `\$${(row + 1) * 200}`;
                link.href = `questions.html?id=${questionId}&prize=${(row + 1) * 200}`

                // switch (col) {
                //     case 0:
                //         gridItem.style.backgroundColor = "green";
                //         break;
                //     case 1:
                //         gridItem.style.backgroundColor = "red";
                //         break;
                //     case 2:
                //         gridItem.style.backgroundColor = "yellow";
                //         break;
                //     case 3:
                //         gridItem.style.backgroundColor = "blue";
                //         break;
                //     case 4:
                //         gridItem.style.backgroundColor = "gray";
                //         break;
                //     case 5:
                //         gridItem.style.backgroundColor = "black";
                //         break;
                // }

                link.appendChild(gridItem);
                gameGridQuestions.appendChild(link);
            }
        }
    }


    //testing the restartbutton with an event listener
    restartButton.addEventListener("click", () => {
        console.log("restarting game");
        newQuestions(APILINK);
    })

    //calling the createGrid function to test it
    createGrid(APILINK);
    //grabs questions from API and sorts by difficulty
    getJeopardyQuestions(APILINK);

});