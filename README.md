# Performance Insights | div.zone

Static HTML/CSS/JS project generated as a complete folder. It does not require a build step or dependency installation for preview.

## Why not double-click `index.html`?

This project loads local JSON data with JavaScript. Most browsers block those requests from `file://` URLs, so preview it through `http://localhost` instead.

## Preview locally

Open a terminal in this folder, the same folder that contains `index.html`, and run one of these commands:

```bash
npx serve .
```

or:

```bash
python -m http.server 8080
```

Then open the local URL shown by the command. If the second command is not available, try `python3 -m http.server 8080`.

You may need internet access if the project uses remote images, fonts, scripts, or icons.

## Project files

- `index.html`: main page shell and site entry point.
- `styles.css`: project styles.
- `script.js`: browser JavaScript for interactions.
- `data.json`: structured project data.

## Deploy online

Upload the entire folder as a static site. Keep `index.html` at the root and preserve the `styles/`, `js/`, `data/`, and other folders exactly as generated.

Use HTTPS for the public URL. If the host lets you choose a publish directory, select this folder itself.

## Troubleshooting

- Blank page: make sure the browser URL starts with `http://localhost`, not `file://`.
- Missing content: run the local server command from the folder that contains `index.html`.
- Data errors: open the browser console and check that JSON paths such as `data/site.json` are loading successfully.
- Styling or icons missing: confirm you are online if the project references remote assets.

## Checklist

- [ ] Run a local static server from this folder.
- [ ] Open the site through `http://localhost`.
- [ ] Keep all generated folders together when deploying.
