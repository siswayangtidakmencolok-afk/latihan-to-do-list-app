// Tahap 1: Seleksi DOM elements
const taskInput = document.querySelector('#task-input');
const taskForm = document.querySelector('#task-form');
const taskList = document.querySelector('#task-list');

// Function reusable buat bikin task element
function createTaskElement(taskText) {
  const taskItem = document.createElement('li');
  
  // Span untuk text task
  const taskSpan = document.createElement('span');
  taskSpan.textContent = taskText;
  taskSpan.classList.add('task-text');
  
  // Button Done
  const doneButton = document.createElement('button');
  doneButton.textContent = 'Done';
  doneButton.classList.add('done-btn');
  doneButton.addEventListener('click', function() {
    taskItem.classList.toggle('completed');
    doneButton.textContent = taskItem.classList.contains('completed') ? 'Undone' : 'Done';
    saveTasksToLocalStorage();
  });
  
  // Button Delete
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.classList.add('delete-btn');
  deleteButton.addEventListener('click', function() {
    taskList.removeChild(taskItem);
    saveTasksToLocalStorage();
  });
  
  taskItem.appendChild(taskSpan);
  taskItem.appendChild(doneButton);
  taskItem.appendChild(deleteButton);
  
  return taskItem;
}

// Tahap 2: Event listener untuk submit form
taskForm.addEventListener('submit', function(event) {
  event.preventDefault();
  
  const taskText = taskInput.value.trim();
  
  if (taskText !== '') {
    const taskItem = createTaskElement(taskText);
    taskList.appendChild(taskItem);
    
    taskInput.value = '';
    taskInput.focus();
    
    saveTasksToLocalStorage();
  }
});

// Tahap 4: LocalStorage functions
function saveTasksToLocalStorage() {
  const tasks = Array.from(taskList.children).map(function(taskItem) {
    return {
      text: taskItem.querySelector('.task-text').textContent,
      completed: taskItem.classList.contains('completed')
    };
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
  tasks.forEach(function(task) {
    const taskItem = createTaskElement(task.text);
    
    // Restore completed state
    if (task.completed) {
      taskItem.classList.add('completed');
      taskItem.querySelector('.done-btn').textContent = 'Undone';
    }
    
    taskList.appendChild(taskItem);
  });
}

// Load tasks saat halaman pertama kali dibuka
loadTasksFromLocalStorage();
