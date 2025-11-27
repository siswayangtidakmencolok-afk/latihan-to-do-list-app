// Tahap 1: Seleksi DOM elements
const taskInput = document.querySelector('#task-input');
const taskForm = document.querySelector('#task-form');
const taskList = document.querySelector('#task-list');

// Tahap 2: Bikin fungsi tambah task
taskForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    const taskItem = document.createElement('li');
    taskItem.innerText = taskText;
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click', function() {
      taskList.removeChild(taskItem);
      saveTasksToLocalStorage();
    });
    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);
    taskInput.value = '';
    taskInput.focus();
    saveTasksToLocalStorage();
  }
});

// Tahap 3: Bikin fungsi hapus task
taskList.addEventListener('click', function(event) {
  if (event.target.tagName === 'BUTTON') {
    const taskItem = event.target.parentElement;
    taskList.removeChild(taskItem);
    saveTasksToLocalStorage();
  }
});

// Tahap 4: LocalStorage
function saveTasksToLocalStorage() {
  const tasks = Array.from(taskList.children).map(function(taskItem) {
    return taskItem.innerText.trim();
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(function(taskText) {
    const taskItem = document.createElement('li');
    taskItem.innerText = taskText;
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click', function() {
      taskList.removeChild(taskItem);
      saveTasksToLocalStorage();
    });
    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);
  });
}

loadTasksFromLocalStorage();
