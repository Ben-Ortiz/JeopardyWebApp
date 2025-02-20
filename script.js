const button1 = document.getElementById("button1")
const counter = document.getElementById("counter")


let count = 0;
button1.addEventListener("click", () => {
    count++;
    counter.innerText = count
});