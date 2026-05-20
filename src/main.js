// Import CSS so Vite can process it
import './style.css';

// Feature flag configuration
const FEATURE_FLAGS = {
  showUrgentFilter: false
};

// 1. Display environment variable
const envStatusElement = document.getElementById('env-status');
const appStatus = import.meta.env.VITE_APP_STATUS || 'Unknown';
envStatusElement.textContent = `Mode: ${appStatus}`;

if (appStatus === 'Production') {
  envStatusElement.classList.add('prod-mode');
} else {
  envStatusElement.classList.add('dev-mode');
}

if (FEATURE_FLAGS.showUrgentFilter) {
  document.getElementById('urgent-btn').style.display = 'inline-block';
}

// 2. Task logic (LocalStorage)
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

let tasks = JSON.parse(localStorage.getItem('unidone_tasks')) || [];

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.textContent = task.title;
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.onclick = () => {
      tasks.splice(index, 1);
      saveAndRender();
    };
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

function saveAndRender() {
  localStorage.setItem('unidone_tasks', JSON.stringify(tasks));
  renderTasks();
}

addTaskBtn.addEventListener('click', () => {
  const title = taskInput.value.trim();
  if (title) {
    tasks.push({ title });
    taskInput.value = '';
    saveAndRender();
  }
});

renderTasks();