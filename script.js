console.log("JavaScript Initializing...")

function indexRecorder(index) {
    return index;
}

function indexFinder(callback) {
    let list = document.querySelector(".list")

    list.addEventListener("click", (e) => {

        const isButton = e.target.closest('button');
        const isCheckbox = e.target.type === 'checkbox';

        if (isButton || isCheckbox) {

            const listItem = e.target.closest(".list-item")

            const index = Array.from(list.children).indexOf(listItem);

            // console.log("clicked item index: ", index);

            callback(index);
        }
    })
}

indexFinder(indexRecorder) // finds the index value

function addTask() {
    const input = document.querySelector(".input")
    const add = document.querySelector(".add")
    const list = document.querySelector(".list")
    const form = document.querySelector("form")

    form.addEventListener("submit", (event) => {
        event.preventDefault();
    })

    input.addEventListener("keydown", (e) => {
        if (input.value === "") {
            return;
        }
        else if (e.target.value === "Enter") {
            const task = input.value;
            const listItem = document.createElement("li")
            listItem.classList.add("list-item")
            listItem.innerHTML = `
            <div class="left">
                <input type="checkbox" name="" id="">
                <p>${task}</p>
            </div>
            <div class="right">
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            </div>
            `
            list.appendChild(listItem)
            input.value = ""
        }
    })

    add.addEventListener("click", () => {
        if (input.value === "") {
            return;
        }

        else {
            const task = input.value;
            const listItem = document.createElement("li")
            listItem.classList.add("list-item")
            listItem.innerHTML = `
        <div class="left">
            <input type="checkbox" name="" id="">
            <p>${task}</p>
        </div>
        <div class="right">
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
        </div>
        `
            list.appendChild(listItem)
            input.value = ""
        }
    })

}

addTask()

function deleteTask() {
    const list = document.querySelector(".list")

    list.addEventListener("click", (e) => {
        if (e.target.closest('.delete')) {
            const listItem = e.target.closest('.list-item')
            listItem.remove()
        }
    });
}

deleteTask()

function editTask() {
    const list = document.querySelector(".list")

    list.addEventListener("click", (e) => {
        if (e.target.closest('.edit')) {
            const input = document.createElement("input")
            const left = e.target.closest('.left')
            input.classList.add("temp-input")
            input.setAttribute("type", "text")
            left.appendChild(input)
        }
    })

}

editTask()