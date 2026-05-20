// Import CSS so Vite can process it
import './style.css';
import posthog from 'posthog-js';
import * as Sentry from '@sentry/browser';

// Р†РЅС–С†С–Р°Р»С–Р·Р°С†С–СЏ PostHog (РљСЂРѕРє 1)
posthog.init('phc_CWvdonji7TCZCjywXkrVLmsSy8sDVhLce2ocd2jLNKyP', {
  api_host: 'https://us.i.posthog.com',
  person_profiles: 'identified_only'
});

// РџРµСЂРµРІС–СЂРєР° Feature Flag (РљСЂРѕРє 5)
posthog.onFeatureFlags(() => {
  if (posthog.isFeatureEnabled('show-urgent-filter')) {
    document.getElementById('urgent-btn').style.display = 'inline-block';
  }
});

// 1. Р’РёРІРµРґРµРЅРЅСЏ Р·РјС–РЅРЅРѕС— РѕС‚РѕС‡РµРЅРЅСЏ
const envStatusElement = document.getElementById('env-status');
const appStatus = import.meta.env.VITE_APP_STATUS || 'Unknown';
envStatusElement.textContent = `Mode: ${appStatus}`;

// Р”РѕРґР°С”РјРѕ РІС–Р·СѓР°Р»СЊРЅРёР№ РєР»Р°СЃ Р·Р°Р»РµР¶РЅРѕ РІС–Рґ СЂРµР¶РёРјСѓ
if (appStatus === 'Production') {
  envStatusElement.classList.add('prod-mode');
} else {
  envStatusElement.classList.add('dev-mode');
}

// 2. Р›РѕРіС–РєР° Р·Р°РІРґР°РЅСЊ (LocalStorage)
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// РћС‚СЂРёРјСѓС”РјРѕ Р·Р°РІРґР°РЅРЅСЏ Р· LocalStorage Р°Р±Рѕ СЃС‚РІРѕСЂСЋС”РјРѕ РїРѕСЂРѕР¶РЅС–Р№ РјР°СЃРёРІ
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

      // PostHog event: task deleted (РљСЂРѕРє 2)
      posthog.capture('task_deleted', {
        reason: 'user_action'
      });
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

    // PostHog event: task created (РљСЂРѕРє 2)
    posthog.capture('task_created', {
      priority: 'high',
      category: 'work',
      is_authenticated: true
    });
  }
});

// Р†РЅС–С†С–Р°Р»С–Р·Р°С†С–СЏ
renderTasks();

// Р†РЅС–С†С–Р°Р»С–Р·Р°С†С–СЏ Sentry (РљСЂРѕРє 1 С‚Р° РљСЂРѕРє 4)
Sentry.init({
  dsn: "https://f221f30d15f8d4b57a0eb9979c93f607@o4511450220462080.ingest.de.sentry.io/4511450300088400",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0, // Р”Р»СЏ РјРѕРЅС–С‚РѕСЂРёРЅРіСѓ РїСЂРѕРґСѓРєС‚РёРІРЅРѕСЃС‚С– (РљСЂРѕРє 4)
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  environment: "development",
});

// РќР°Р»Р°С€С‚СѓРІР°РЅРЅСЏ РєРѕРЅС‚РµРєСЃС‚Сѓ РєРѕСЂРёСЃС‚СѓРІР°С‡Р° (РљСЂРѕРє 3)
Sentry.setUser({
  id: "1",
  email: "ivan@example.com",
  segment: "student"
});

// РљРЅРѕРїРєР° РіРµРЅРµСЂР°С†С–С— РїРѕРјРёР»РѕРє (РљСЂРѕРє 2)
const breakWorldBtn = document.getElementById('break-world-btn');
breakWorldBtn.addEventListener('click', () => {
  throw new Error("Sentry Test Error: Something went wrong!");
});