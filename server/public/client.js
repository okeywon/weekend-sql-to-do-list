$(document).ready(onReady);

function onReady() {
    console.log("Let's do this!");
    
    getTasks();

    $(document).on('click', '#submitBtn', addNewTask);
    $(document).on('click', ".delete", deleteTask);
    $(document).on('click', ".complete", completeTask);
}

function addNewTask(e){
    e.preventDefault();
    console.log('click');
    let newTask = {
        task: $('#taskName').val(),
        description: $('#taskDescription').val(),
        due: $('#taskDate').val(),
        isComplete: $('#isComplete').val()
    };
    saveNewTask(newTask);
}

function getTasks(){
    console.log("in getTasks");

    $.ajax({
      type: "GET",
      url: "/todo",
    })
      .then((response) => {
        console.log(response);
        displayTable(response);
      })
      .catch((err) => {
        console.log("GET fail client side", err);
      });
}

function saveNewTask(newTask){
    console.log('in saveNewTask/POST client side');
    $.ajax({
        type: "POST",
        url: "/todo",
        data: newTask,
      })
        .then((response) => {
          console.log("POST from server:", response);
          getTasks();
        })
        .catch((error) => {
          console.log("Error in POST on client side", error);
        });
}

function displayTable(response){
    for (let i = 0; i < response.length; i++){
        let task = response[i];
        $('#table').append(`
        <tr data-id=${task.id} data-isComplete=${task.isComplete}>
            <td>${task.task}</td>
            <td>${task.description}</td>
            <td>${task.due}</td>
            <td class="complete"><button>No</button></td>
            <td class="delete"><button>Delete</button></td>
        </tr>
        `);
    }
    if ('task.isComplete' === false){
        $('.complete').empty();
        $('.complete').last().append(`
        <button class="completeBtn">No</button>
        `);
    }
    else if ('task.isComplete' === true){
        $('.complete').empty();
        $('.complete').last().append(`
        <button class="completeBtn">Yes</button>
        `);
    }
}

function completeTask(){

}

function deleteTask(){
    console.log('click');
}