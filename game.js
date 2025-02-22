document.addEventListener("DOMContentLoaded", function () {

    const APILINK = "https://opentdb.com/api.php?amount=50&type=multiple";
    const gameGridCategories = document.getElementById("gameGridCategories");
    const gameGridQuestions = document.getElementById("gameGridQuestions");
    const restartButton = document.getElementById("restartButton");

    //helper function
    function incrementKey(map, key) {
        if (map.has(key)) {
            map.set(key, map.get(key) + 1);
        } else {
            map.set(key, 1);
        }
    }

    //testing api with this and not used
    async function returnTrivia(url) {
        const categories = new Map();
        let count = 0;
        try {
            const response = await fetch(url);
            const data = await response.json();
            localStorage.setItem("jeopardyQuestions", JSON.stringify(data.results))
            data.results.forEach(element => {
                console.log(element)
                incrementKey(categories, element.category)
                count++;

            })
            console.log(categories);
            console.log(count);
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
                const response = await fetch(url);
                const data = await response.json();
                localStorage.setItem("jeopardyQuestions", JSON.stringify(data.results));
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


        try {
            // const response1 = await fetch(url1);
            // const data1 = await response1.json();
            // data1.results.forEach(element => {
            //     console.log(element)
            //     incrementKey(categories, element.category)
            // })

            console.log(categories);

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
                    link.href = `questions.html?id=${questionId}`

                    const gridItem = document.createElement("div");
                    gridItem.classList.add("grid-item-questions");
                    gridItem.innerText = `\$${(row + 1) * 200}`;

                    switch (col) {
                        case 0:
                            gridItem.style.backgroundColor = "green";
                            break;
                        case 1:
                            gridItem.style.backgroundColor = "red";
                            break;
                        case 2:
                            gridItem.style.backgroundColor = "yellow";
                            break;
                        case 3:
                            gridItem.style.backgroundColor = "blue";
                            break;
                        case 4:
                            gridItem.style.backgroundColor = "gray";
                            break;
                        case 5:
                            gridItem.style.backgroundColor = "black";
                            break;
                    }

                    link.appendChild(gridItem);
                    gameGridQuestions.appendChild(link);
                }
            }

        } catch (e) {

        }


    }


    //testing the restartbutton with an event listener
    restartButton.addEventListener("click", () => {
        console.log("restarting game");
        returnTrivia(APILINK);
    })

    //calling the createGrid function to test it
    createGrid(APILINK);
    getJeopardyQuestions(APILINK);

});