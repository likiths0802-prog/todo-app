
const taskInput = document.getElementById('taskInput');
const addBtn    = document.getElementById('addBtn');
const taskList  = document.getElementById('taskList');
const emptyMsg  = document.getElementById('emptyMsg');

loadTasks();



addBtn.addEventListener('click', function () {
  addTask();
});

taskInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    addTask();
  }
});

function addTask() {

  const text = taskInput.value.trim();


  if (text === '') {
    alert('Please enter a task first!');
    return;
  }

  const task = {
    text: text,
    completed: false
  };


  saveTask(task);


  renderTask(task);


  taskInput.value = '';
  taskInput.focus();


  updateEmptyMessage();
}


function renderTask(task) {

  const li = document.createElement('li');


  if (task.completed) {
    li.classList.add('completed');
  }

  const span = document.createElement('span');
  span.textContent = task.text;


  const completeBtn = document.createElement('button');
  completeBtn.textContent = task.completed ? 'Undo' : 'Done';
  completeBtn.className = 'complete-btn';

  completeBtn.addEventListener('click', function () {
    li.classList.toggle('completed');
    task.completed = !task.completed;


    completeBtn.textContent = task.completed ? 'Undo' : 'Done';


    updateStorage();
  });


  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.className = 'delete-btn';

  
  deleteBtn.addEventListener('click', function () {
    taskList.removeChild(li);
    updateStorage();
    updateEmptyMessage();
  });

  li.appendChild(span);
  li.appendChild(completeBtn);
  li.appendChild(deleteBtn);

 
  taskList.appendChild(li);
}



function saveTask(task) {

  const tasks = getTasksFromStorage();

 
  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}


function loadTasks() {
  const tasks = getTasksFromStorage();

 
  tasks.forEach(function (task) {
    renderTask(task);
  });

  updateEmptyMessage();
}


function getTasksFromStorage() {

  const stored = localStorage.getItem('tasks');
  return stored ? JSON.parse(stored) : [];
}



function updateStorage() {
  const tasks = [];


  const items = taskList.querySelectorAll('li');
  items.forEach(function (li) {
    tasks.push({
      text:      li.querySelector('span').textContent,
      completed: li.classList.contains('completed')
    });
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}


function updateEmptyMessage() {
  const hasTasks = taskList.querySelectorAll('li').length > 0;
  emptyMsg.style.display = hasTasks ? 'none' : 'block';
}
