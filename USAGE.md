# User Guide: CV Builder

Welcome to the CV Builder user guide! This document will help you get the most out of our application.

---

## 🚀 Getting Started

1. **Open the App**: Visit our [Live Demo](https://vercel-deployment-url.com) or run it locally.
2. **Fill the Form**: Start by entering your personal information, work experience, education, and skills in the `EditorPanel`.
3. **Real-time Preview**: Watch your CV update in real-time in the `PreviewPanel`.
4. **Choose a Template**: Switch between our professional templates (Classic, Modern, Minimal) to find the perfect look for your CV.
5. **Customize Colors**: Select a theme color that matches your personal brand.
6. **Export Your CV**: Once you're happy with the result, export your CV as a PDF, JSON file, or plain text.

---

## 🎨 Using Templates

### Switching Templates
1. Click on the **Settings** button in the header.
2. Under **Template Selection**, choose your preferred template.
3. The preview will automatically update with the new template.

### Customizing Colors
1. In the **Settings** modal, under **Theme Color**, select a color.
2. The template will update its accents and backgrounds with the new color.

---

## 📤 Exporting Your CV

### Export as PDF
1. Click the **Download PDF** button in the header or the floating action button in the preview.
2. This will open your browser's print dialog.
3. Select **Save as PDF** as the destination.
4. Your CV will be saved as a high-quality PDF with all backgrounds and formatting preserved.

### Save as JSON (Backup)
1. Click the **Export JSON** button in the header.
2. This will download a `.json` file containing all your CV data.
3. You can use this file to restore your progress later or move it to another device.

### Copy as Plain Text
1. Click the **Copy Text** button in the header.
2. A clean, text-only version of your CV will be copied to your clipboard.
3. This is useful for quick applications or pasting into online forms.

### Share via Link
1. Click the **Share Link** button in the header.
2. A shareable URL containing your CV data will be copied to your clipboard.
3. Anyone with this link can view your CV in their browser.

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Z` / `Cmd+Z` | Undo last action |
| `Ctrl+Shift+Z` / `Cmd+Shift+Z` | Redo last action |
| `Ctrl+S` / `Cmd+S` | Export as JSON |
| `Ctrl+P` / `Cmd+P` | Print to PDF |
| `Esc` | Close modals |

---

## 🛠 Troubleshooting

### Data Not Saving?
- Ensure your browser's `localStorage` is not full.
- Check if you're in "Incognito" or "Private" mode, as some browsers restrict `localStorage` in these modes.

### Layout Looks Broken?
- Try resetting your data by clicking the **Reset** button in the header.
- Ensure you're using a modern, updated browser (Chrome, Firefox, Safari, Edge).

### PDF Backgrounds Not Printing?
- In the print dialog, ensure **Background Graphics** is checked.
- Our application uses `print-color-adjust: exact` to force background printing, but some browser settings may override this.

---

Thank you for using CV Builder! 🚀
