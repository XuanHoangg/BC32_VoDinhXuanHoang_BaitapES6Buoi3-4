//hàm dom
function dom(selector) {
    return document.querySelector(selector);
}
let listTask = [];
let completeTask = [];
// thêm task
dom("#addItem").addEventListener("click", () => {
    let newTask = dom("#newTask").value;
    if (!newTask) {
        return false;
    } else {
        listTask.push(newTask);
    }
    displayTodo(listTask)
})
// hiển thị task
function displayTodo(listTask) {
    let output = listTask.reduce((result, task, index) => {
        return result + `
        <ul>
            <li> ${task}  
                 <button class="buttons btnTrash" ><i class="fa-regular fa-trash-can remove" data-type="trash" data-index = "${index}"></i></button>
                 <button class="buttons btnCheck"><i class="fa-regular fa-circle-check complete" data-type="check" data-index = "${index}"></i></button>
            </li>
         </ul>
        `
    }, "")
    dom("#todo").innerHTML = output;
}

// hiển thị task đã hoàn thành
function displayCompleted(completeTask) {
    let output = completeTask.reduce((result, task, index) => {
        return result + `
        <ul>
            <li> 
                 <span>${task}</span> 
                 <button class="buttons btnTrash"><i class="fa-regular fa-trash-can remove" data-type="trash" data-index = "${index}"></i></button>
                 <button class="buttons btnCheck "><i class="fa-regular fa-circle-check changeColor fas"></i></button>
            </li>
         </ul>
        `
    }, "")
    dom("#completed").innerHTML = output;
}
//xóa task chưa hoàn thành và click nút check để hoàn thành
dom("#todo").addEventListener("click", (evt) => {
    let elementType = evt.target.getAttribute("data-type");
    let index = evt.target.getAttribute("data-index");
    if (elementType === "trash") {
        console.log("index của trash: ", index);
        listTask.splice(index, 1);
    }

    if (elementType === "check") {
        console.log("index của check: ", index);
        completeTask.push(listTask[index]);
        listTask.splice(index, 1);
    }
    displayTodo(listTask);
    displayCompleted(completeTask);
})
//xóa task đã hoàn thành
dom("#completed").addEventListener("click", (evt) => {
    let elementType = evt.target.getAttribute("data-type");
    let index = evt.target.getAttribute("data-index");
    if (elementType === "trash") {
        completeTask.splice(index, 1);
    }
    displayCompleted(completeTask);
})
// sắp xếp theo thứ tự bảng chữ cái  a -> z
dom("#two").addEventListener("click", () => {
    let increase = listTask.sort();
    displayTodo(increase);
})
// sắp xếp theo thứ tự bảng chữ cái z -> a
dom("#three").addEventListener("click", () => {
    let decrease = listTask.reverse();
    displayTodo(decrease);
})