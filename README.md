| Language |
|----------|
| [**English**](README.md) |
| [**Русский**](README.ru.md) |


# 📁 Upload Plus — Advanced Upload Plugin for NodeBB

**Upload Plus** supercharges NodeBB’s file uploader:



- Stores files in **scalable sub-folders** (hash or date) so you never hit a single-directory bottleneck.  
- Optionally **auto-converts images to WebP**, shrinking size without quality loss.  
- Fully translated into **English and Russian**.

---

## 🚀 Quick Start

```bash
cd /path/to/nodebb
npm install nodebb-plugin-upload-plus
```

Activate in ACP → Plugins → Upload Plus.

---

## ⚙️ Settings

Visit ACP → Plugins → Upload Plus

| Option | Values | Default |
|---|---|---|
| **Path strategy** | `hash` – sub-folders by file-name hash<br>`date` – YYYY/MM/DD | `hash` |
| **Directory depth** | `2` or `3` levels (hash only) | `2` |
| **Convert images to WebP** | on / off | `off` |

---

## 📂 Storage Layout

| Strategy | Depth 2 | Depth 3 |
|---|---|---|
| **hash** | `uploads/files/a/b/filename.ext` | `uploads/files/a/b/c/filename.ext` |
| **date** | `uploads/files/2024/09/02/filename.ext` | — |

SHA-256 of the file name → first 2 or 3 chars become folder names.

---

## 🖼️ WebP Conversion

- Runs **only on images**.  
- Produces `filename.webp` next to the original.  
- Returns the **WebP URL** to the client.  
- Quality set to 80 %.

---

## 🌐 Languages

Bundled translations:

- English (en-GB)  
- Russian (ru)

ACP language is taken from NodeBB’s locale.

---

## 🛠️ Development / Fork

```bash
git clone https://github.com/yourname/nodebb-plugin-upload-plus.git
cd nodebb-plugin-upload-plus
npm install
npm link          # inside NodeBB folder
```

Code map:

- `lib/uploader.js` – core logic  
- `languages/` – translations  
- `templates/` – ACP settings template  
- `static/admin.js` – ACP JS

---

## 📄 License

MIT © 2024 Upload Plus Contributors

---

## How to split README into two languages

### Option 1 – separate files
```
README.md
README.ru.md
```

In the root `README.md` add links:

```md
## 🌍 Languages
- [English](README.md)  
- [Русский](README.ru.md)
```

### Option 2 – single file with toggles
```md
<details open>
  <summary>🇬🇧 English</summary>

  …English text…
</details>

<details>
  <summary>🇷🇺 Русский</summary>

  …Russian text…
</details>
```

Pick whichever style you prefer; both work on GitHub.