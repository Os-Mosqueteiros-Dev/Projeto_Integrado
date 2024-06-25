const btnAdd = document.querySelector('.btn-add');
const task = document.querySelector('.input');
const list = document.querySelector('.tasks-list');

btnAdd.addEventListener('click', () => {
    if(!task.value) return;
    createTask(task.value);
});

task.addEventListener('keypress', function(e) {
    if(e.keyCode === 13) {
        if(!task.value) return;
        createTask(task.value);
    }
});

function clearInput() {
    task.value = '';
    task.focus(); 
}

function createTask(texto) {
    const li = createLi();
    li.innerHTML = texto; 
    list.appendChild(li);
    clearInput();
    createDeleteButton(li);
    createEditButton(li);
    saveTasks();
};

function createLi() {
    const li = document.createElement('li');
    return li;
};

function createDeleteButton(li) {
    li.innerHTML += ' ';
    const btnDelete = document.createElement('button');
    btnDelete.innerText = "Apagar";
    btnDelete.setAttribute('class', 'delete');
    btnDelete.setAttribute('title', 'Apagar esta tarefa!');
    li.appendChild(btnDelete);
};

function createEditButton(li) {
    li.innerHTML += ' ';
    const btnEdit = document.createElement('button');
    btnEdit.innerText = "Editar";
    btnEdit.setAttribute('class', 'edit');
    btnEdit.setAttribute('title', "Editar esta tarefa!");
    li.appendChild(btnEdit);
};

document.addEventListener('click', function(e) {
    const el = e.target;
    if(el.classList.contains('delete')) {
        el.parentElement.remove();
        saveTasks();
    } else if (el.classList.contains('edit')) {
        editTask(el.parentElement);
    }
});

function saveTasks() {
    const liTasks = list.querySelectorAll('li');
    const taskList = [];

    for (let task of liTasks) {
        let taskText = task.innerText;
        taskText = taskText.replace('Apagar', '').replace('Editar', '').trim();
        taskList.push(taskText);
    }

    const tasksJSON = JSON.stringify(taskList);
    localStorage.setItem('tasks', tasksJSON);
};

function addSavedTasks() {
    const tasks = localStorage.getItem('tasks');
    const listOfTasks = JSON.parse(tasks);
    
    for (let task of listOfTasks) {
        createTask(task);
    }
}

function editTask(li) {
    const currentText = li.firstChild.textContent.trim();
    const newText = prompt('Editar tarefa: ', currentText);

    if(newText !== null) {
        li.firstChild.textContent = newText;
        saveTasks();
    }
}

addSavedTasks();