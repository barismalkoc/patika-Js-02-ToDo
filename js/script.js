const inclusiveList = document.getElementById("list");
let todos = JSON.parse(localStorage.getItem("todos") || "[]");

function localStorageDisplay() {


    for (let i = 0; i < todos.length; i++) {
        if (todos[i].isChecked == true) {
            makeNewHTMLDisplay(todos[i].text, true)
        } else {
            makeNewHTMLDisplay(todos[i].text, false)
        }
    }
}


function newElement() {

    let inputValue = document.getElementById("task").value;

    if (inputValue === "" || inputValue.replace(/^\s+|\s+$/g, "").length == 0) {
        $(".error").toast("show");
    }
    else {
        $(".success").toast("show");
        makeNewHTMLDisplay(inputValue);
    }


    const todo = {
        text: inputValue,
        isChecked: false
    }


    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));


}

inclusiveList.addEventListener("click", function (event) {

    if (event.target.tagName === "LI") {
        event.target.classList.toggle("checked");
    }

    let contentText = event.target.innerText;
    contentText = contentText.split("\n")[0]

    if (event.target.classList.value == "checked") {
        todos.forEach(toDo => {
            if (contentText == toDo.text) {
                toDo.isChecked = true;
            }
            localStorage.setItem("todos", JSON.stringify(todos));
        })
    } else {
        todos.forEach(toDo => {
            if (contentText == toDo.text) {
                toDo.isChecked = false;
            }
        })
        localStorage.setItem("todos", JSON.stringify(todos));

    }
})

function makeNewHTMLDisplay(inputValue, boolean = false) {


    let newListElement = document.createElement("li");
    let inputValueText = document.createTextNode(inputValue);
    let newSpan = document.createElement("span");
    let deleteBtn = document.createTextNode("X");

    document.getElementById("task").value = "";
    newListElement.appendChild(inputValueText);
    newSpan.className = "close";
    newSpan.appendChild(deleteBtn);
    newListElement.appendChild(newSpan);

    if (boolean) {
        newListElement.classList.add("checked")
    }

    inclusiveList.appendChild(newListElement);
    closeListElement();

}


function closeListElement() {

    let close = document.getElementsByClassName("close");
    for (var i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            let div = this.parentElement;

            let contentText = div.innerText;
            contentText = contentText.split("\n")[0]
            todos = todos.filter(item => item.text != contentText);
            localStorage.setItem("todos", JSON.stringify(todos));
            div.style.display = "none";

        }
    }


}


function controlEmpty() {
    todos = todos.filter(item => item.text != "");
    localStorage.setItem("todos", JSON.stringify(todos));
}

controlEmpty();
localStorageDisplay();