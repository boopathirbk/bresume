# Boopathi R - Visionary Developer Portfolio

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)
![Accessibility](https://img.shields.io/badge/accessibility-WCAG_2.1_AA-green.svg)

A high-performance, accessible, and aesthetically premium personal portfolio website. Built with **Vanilla JavaScript, HTML5, and CSS3** to ensure maximum speed and minimal resource usage.

## 🌟 Features

### 🎨 Premium Design
- **Modern Aesthetic**: Dark/Light mode support with a "Vercel-like" grid design system.
- **Fluid Reponsiveness**: Mobile-first architecture that scales perfectly to 4K screens.
- **Micro-Interactions**: Smooth hover states, glowing shadows, and a custom **Spinning Rainbow Border** button.

### ♿ Advanced Accessibility
Includes a dedicated Accessibility Widget (`Alt+A` or Floating Button) offering:
- **Text Resizing**: Granular control over font size.
- **Grayscale Mode**: For visual processing assistance.
- **High Contrast**: Neon/Black theme for low-vision users.
- **Readable Font**: One-click switch to dyslexia-friendly fonts (Arial/Helvetica).
- **Link Highlighting**: Clear visual indicators for all interactive elements.
- **Reduce Motion**: Respects system preferences and offers a manual toggle.

### ⚡ Performance
- **Zero Dependencies**: No React, Vue, or jQuery overhead.
- **Preloaded Assets**: Critical fonts and styles are prioritized.
- **IntersectionObserver**: Efficient scroll-triggered animations.

## 🛠️ Tech Stack

- **Core**: HTML5, CSS3 (Variables + Flexbox/Grid), ES6+ JavaScript.
- **Icons**: FontAwesome 6 (CDN).
- **Fonts**: 'Inter' and 'Outfit' via Google Fonts.
- **Data**: Separation of concerns via `data.js` for easy content updates.

## 🚀 Deployment

This project is designed for static hosting.

### GitHub Pages (Recommended)
1. Fork this repository.
2. Go to **Settings** > **Pages**.
3. Select `main` branch as source.
4. Your site will be live at `https://<username>.github.io/<repo-name>/`.

### Local Development
No build steps required. Just serve the files:

```bash
# Using Python
python -m http.server 8080

# Using Node (http-server)
npx http-server .
```

## 📁 Project Structure

```
├── index.html       # Semantic DOM structure
├── style.css        # Global styles & Design Tokens
├── script.js        # Logic (Theme, A11y, Rendering)
├── data.js          # Content Source (Edit this!)
└── README.md        # Documentation
```

## 📝 License

This project is open-source and available under the MIT License.
Crafted with ❤️ by **Boopathi R**.
