# Architecture Guide: CV Builder

This document describes the architectural decisions and data flow of the CV Builder application.

---

## 🏗 High-Level Architecture

CV Builder is a **Next.js** application built with **TypeScript** and **Tailwind CSS**. It is designed to be **offline-first**, meaning it does not rely on any external APIs or databases for its core functionality.

### Core Principles
1. **Privacy-First**: No user data is ever sent to a server.
2. **Offline-First**: The application works completely offline after the initial load.
3. **Zero-Config**: No setup required for users.
4. **Customizable**: Easy to add new templates, themes, and languages.

---

## 🔄 Data Flow

The application follows a simple, unidirectional data flow:

1. **User Input**: Users enter their information into the `EditorPanel`.
2. **React State**: The input is captured in the React state of the `CVBuilder` component.
3. **Persistence**: The state is automatically synchronized with the browser's `localStorage` on every change (debounced).
4. **Preview**: The `PreviewPanel` renders the CV in real-time based on the current state.
5. **Export**: Users can export their CV as a PDF, JSON file, or plain text.

---

## 📂 Component Tree

```
App
└── CVBuilder
    ├── Header (Undo/Redo, Theme, Export)
    ├── EditorPanel
    │   ├── PersonalInfoForm
    │   ├── ExperienceForm
    │   ├── EducationForm
    │   ├── SkillsForm
    │   └── ...
    └── PreviewPanel
        ├── TemplateSelector
        ├── TemplateRenderer
        │   ├── ClassicTemplate
        │   ├── ModernTemplate
        │   └── MinimalTemplate
        └── FloatingControls (Print/Download)
```

---

## 🛠 Key Decisions

### Why localStorage?
`localStorage` provides a simple, synchronous way to persist data in the user's browser without requiring a backend. This ensures the application remains offline-first and privacy-focused.

### Why TypeScript?
TypeScript provides static type checking, which helps catch errors early and improves the developer experience, especially as the application grows.

### Why Tailwind CSS?
Tailwind CSS allows for rapid UI development with zero-config themes. It's easy to customize and ensures a consistent design throughout the application.

---

## 🚀 How to Add Features

### Adding a New Language
1. Create a new JSON file in `/locales/[lang].json`.
2. Register the new language in the `useAvailableLanguages` hook in `hooks/useLocale.ts`.
3. Ensure the `LanguageSwitcher` component is updated to include the new language.

### Adding a New Template
1. Create a new component in `components/Templates/[TemplateName].tsx`.
2. Register the new template in the `Preview` component's `renderTemplate` function.
3. Update the `TemplateSelector` to include the new template option.

### Adding a New Theme
1. Add the new theme color to the `themeColors` mapping in each template component.
2. Update the `ThemeSelector` in the `CVBuilder` settings to include the new theme.

---

## 🧪 Testing Strategy

We use **Jest** and **React Testing Library** for unit and integration testing.
- **Hooks**: Test state management and side effects.
- **Parsers**: Test CV parsing logic with various inputs.
- **Utilities**: Test helper functions like `escapeRegExp` and `sharing`.
- **Components**: Test UI rendering and user interactions.

---

## 📦 Deployment

The application is deployed as a static site.
- **GitHub Pages**: Automatically deployed via GitHub Actions on every push to `main`.
- **Vercel**: Connected to the repository for automatic previews and production deployments.

---

Thank you for exploring the architecture of CV Builder! 🚀
