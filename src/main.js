// Import CSS so Vite can process it
import './style.css';
import posthog from 'posthog-js';
import * as Sentry from '@sentry/browser';

// Р†РЅС–С†С–Р°Р»С–Р·Р°С†С–СЏ PostHog
posthog.init('phc_CWvdonji7TCZCjywXkrVLmsSy8sDVhLce2ocd2jLNKyP', {
  api_host: 'https://us.i.posthog.com',
  person_profiles: 'identified_only'
});

// РџРµСЂРµРІС–СЂРєР° Feature Flag
posthog.onFeatureFlags(() => {
  if (posthog.isFeatureEnabled('show-urgent-filter')) {
    document.getElementById('urgent-btn').style.display = 'inline-block';
  }
});

// 1. Р’РёРІРµРґРµРЅРЅСЏ Р·РјС–РЅРЅРѕС— РѕС‚РѕС‡РµРЅРЅСЏ
const envStatusElement = document.getElementById('env-status');
const appStatus = import.meta.env.VITE_APP_STATUS || 'Unknown';
envStatusElement.textContent = `Mode: ${appStatus}`;

if (appStatus === 'Production') {
  envStatusElement.classList.add('prod-mode');
} else {
  envStatusElement.classList.add('dev-mode');
}

// 2. Р›РѕРіС–РєР° Р·Р°РІРґР°РЅСЊ (LocalStorage)
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
      posthog.capture('task_deleted', { reason: 'user_action' });
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
    posthog.capture('task_created', { priority: 'high', category: 'work', is_authenticated: true });
  }
});

renderTasks();

// Р†РЅС–С†С–Р°Р»С–Р·Р°С†С–СЏ Sentry
Sentry.init({
  dsn: "https://f221f30d15f8d4b57a0eb9979c93f607@o4511450220462080.ingest.de.sentry.io/4511450300088400",
  tracesSampleRate: 1.0,
  environment: "development",
});