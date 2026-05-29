# AI Resume Builder

Учебный frontend-проект для портфолио junior frontend-разработчика. Приложение помогает собрать текст резюме: пользователь вводит данные в форму, а справа сразу видит live-preview и готовый текст для копирования.

## Demo

https://ai-resume-builder-eta-teal.vercel.app/

## Стек

- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React

## Возможности

- Форма для имени, профессии, навыков, описания о себе, опыта или учебных проектов и контактов.
- Live-preview резюме справа.
- Локальная функция улучшения текста без настоящего AI API.
- Копирование готового резюме в буфер обмена.
- Очистка формы.
- Тёмная тема, grid background, glow-эффекты и glassmorphism.
- Адаптивная верстка для телефона, планшета и desktop.

## Запуск

```bash
npm install
npm run dev
```

## Сборка

```bash
npm run build
npm run preview
```

## Деплой на Vercel

Для Vercel подойдут стандартные настройки Vite:

- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

## Как улучшить проект дальше

- Добавить экспорт в PDF.
- Добавить несколько шаблонов дизайна резюме.
- Добавить сохранение данных в localStorage.
- Подключить настоящий AI API через безопасную serverless-интеграцию.
- Добавить выбор языка резюме.

Проект работает как статическое frontend-приложение и не использует внешние API.

## Для публикации на GitHub

В репозиторий не должны попадать `node_modules`, `dist`, `.vercel`, `.env` и системные файлы. Это уже настроено в `.gitignore`.
