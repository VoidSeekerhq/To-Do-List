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
            listItem.classList.add("unchecked")
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
            const firstChecked = document.querySelector(".list-item.checked");

            if (firstChecked) {
                list.insertBefore(listItem, firstChecked);
            } else {
                list.appendChild(listItem);
            }
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
            listItem.classList.add("unchecked")
            listItem.innerHTML = `
        <div class="left">
            <input class="check" type="checkbox" name="" id="">
            <p>${task}</p>
        </div>
        <div class="right">
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
        </div>
        `
            const firstChecked = document.querySelector(".list-item.checked");

            if (firstChecked) {
                list.insertBefore(listItem, firstChecked);
            } else {
                list.appendChild(listItem);
            }
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
    document.querySelectorAll(".edit").forEach((btn) => {
        btn.addEventListener("click", () => {
            const listItem = btn.closest(".list-item")
            const label = listItem.querySelector(".task")
            const input = listItem.querySelector(".task-input")

            function saveTask() {
                const newValue = input.value.trim();

                if (newValue) {
                    label.innerText = newValue;
                }

                input.classList.add("hidden");
                label.classList.remove("hidden");
                btn.innerText = "Edit";

                input.removeEventListener("keydown", handleEnter);
            }

            function handleEnter(e) {
                if (e.key === "Enter") {
                    saveTask();
                }
            }

            if (input.classList.contains("hidden")) {
                input.value = label.innerText;
                input.classList.remove("hidden");
                label.classList.add("hidden");
                btn.innerText = "Save";
                input.focus();
                input.addEventListener("keydown", handleEnter);
            }


            else {
                saveTask()
            }
        })
    })
}

editTask()

function check() {
    const list = document.querySelector(".list");

    list.addEventListener("change", (e) => {
        if (!e.target.classList.contains("check")) return;

        const check = e.target;
        const listItem = check.closest(".list-item");

        if (check.checked) {
            listItem.classList.add("checked");
            listItem.classList.remove("unchecked");
            list.appendChild(listItem);
        } else {
            listItem.classList.add("unchecked");
            listItem.classList.remove("checked");
            list.prepend(listItem);
        }
    });
}

check()

function taskSort() {
    const pills = document.querySelectorAll(".pill")

    pills.forEach((pill) => {
        pill.addEventListener("click", (e) => {
            pills.forEach((pill) => {
                pill.classList.remove("active");
            })
            const targetPill = e.target.closest(".pill")
            const list = document.querySelector(".list")
            targetPill.classList.add("active");
            
            if (targetPill.classList.contains("all")) {
                const listItems = document.querySelectorAll(".list-item");
                listItems.forEach((listItem) => {
                    listItem.classList.remove("hidden");
                });
            }
            
            else if (targetPill.classList.contains("pending")) {
                const listItems = document.querySelectorAll(".list-item")
                const uncheckeds = document.querySelectorAll(".unchecked")
                listItems.forEach((listItem) => {
                    listItem.classList.add("hidden");
                })
                uncheckeds.forEach((unchecked) => {
                    unchecked.classList.remove("hidden");
                })
            }

            else if (targetPill.classList.contains("completed")) {
                const checkeds = document.querySelectorAll(".checked");
                const listItems = document.querySelectorAll(".list-item")

                listItems.forEach((listItem) => {
                    listItem.classList.add("hidden");
                })
                checkeds.forEach((checked) => {
                    checked.classList.remove("hidden");
                })
                
            }
        })
    })


}

taskSort()