# Offline CV Builder

A professional, standalone CV builder that works completely in your browser. No APIs, no backend, no database, no auth, and no external services.

## Features

- **Fully Offline**: Works without internet after the first load.
- **Privacy First**: All your data is saved in your browser's `localStorage`. No data ever leaves your device.
- **Built-in Smart Logic**:
  - **Text Improver**: Enhances your bullet points with action verbs and better phrasing.
  - **Skills Suggester**: Recommends relevant skills based on your job title.
  - **ATS Scorer**: Analyzes your CV and gives a score with improvement suggestions.
- **Templates & Themes**: 3 professional templates (Classic, Modern, Minimal) and 4 color themes.
- **Export Options**:
  - **Print to PDF**: High-quality PDF export using your browser's print feature.
  - **JSON Export/Import**: Save your progress as a file and restore it later.
  - **Plain Text**: Copy a clean, text-only version for quick applications.
- **Undo/Redo**: 20 steps of history to safely experiment with your content.
- **Auto-save**: Never lose your work with automatic local saving.

## How to Run Locally

1. Clone or download this repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## How to Build Static

To generate a fully standalone version that can be opened as a file:

1. Run the build command:
   ```bash
   npm run build
   ```
2. The static files will be generated in the `/out` folder.
3. You can now open `/out/index.html` directly in any browser, or host it on any static hosting service.

## Deployment

### GitHub Pages (3 Steps)

1. Push your code to a GitHub repository.
2. Go to **Settings > Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions** and use the "Next.js" template.

### Vercel / Netlify

Simply connect your repository and set the build command to `npm run build` and the output directory to `out`.

## License

Free forever. Unlimited users. No strings attached.
