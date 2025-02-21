const APILINK = "https://opentdb.com/api.php?amount=10"

document.addEventListener("DOMContentLoaded", function () {

    const gameGridCategories = document.getElementById("gameGridCategories")
    const gameGridQuestions = document.getElementById("gameGridQuestions")
    const restartButton = document.getElementById("restartButton")



    async function returnTrivia(url) {
        try {
            const response = await fetch(url);
            const data = await response.json();
            data.results.forEach(element => {
                console.log(element)
            })
        } catch (e) {
            console.error("Error fetching data:", error);
        }
    }

    async function createGrid(url) {
        try { 
            const response = await fetch(url);
            const data = await response.json();
            data.results.forEach(element => {
                console.log(element)
            })

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
                    const gridItem = document.createElement("div");
                    gridItem.classList.add("grid-item-questions");
                    gridItem.innerText = `\$${(row + 1) * 200}`;
                    gameGridQuestions.appendChild(gridItem);
                }
            }

        } catch (e) {

        }


    }



    restartButton.addEventListener("click", () => {
        console.log("restarting game")
        returnTrivia(APILINK)
    })

    createGrid(APILINK)

});