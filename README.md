# KopyScan Website

Static product website, user guide, and privacy-policy foundation for the KopyScan Android document scanner and PDF utility.

## Local preview

From this directory, run:

```bash
python3 -m http.server 8080
```

Then open [http://localhost:8080](http://localhost:8080).

## Structure

- `index.html` — landing page, feature overview, user guide, privacy summary, and FAQ
- `privacy.html` — full privacy policy
- `styles.css` — responsive Day/Night design system and layouts
- `script.js` — local-time theme, mobile navigation, and lightweight reveal behavior
- `Assets/` — existing KopyScan branding artwork

The site has no package installation, build step, framework, backend, or external JavaScript dependency.

## GitHub Pages

1. Create a repository and push these files to its `main` branch.
2. Open the repository's **Settings**.
3. Select **Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select `main` and `/ (root)`, then save.

All internal links and asset paths are relative, so the site supports a GitHub Pages project path such as `https://username.github.io/repository-name/`.
