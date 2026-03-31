| 语言 |
|----------|
| [**English**](README.md) |
| [**Русский**](README.ru.md) |
| [**中文**](README.zh-CN.md) |

 # 📤 Upload Plus — NodeBB 高级上传插件

**Upload Plus** 增强了 NodeBB 的文件上传功能：

- 将文件存储在 **可扩展的子文件夹**（哈希或日期）中，避免单目录文件过多导致的性能瓶颈；
- 可选 **自动将图片转换为 WebP**，在几乎不损失画质的情况下缩小文件体积；
- 支持 **随机文件名**，防止文件名冲突并保护用户隐私；
- 支持 **中文、英文和俄文** 多语言。

---

## ⚙️ 安装

```bash
cd /path/to/nodebb
npm install nodebb-plugin-upload-plus
```

在管理面板中激活：  
ACP → Plugins → **Activate** → Upload Plus

---

## 🔧 设置

激活后前往：  
ACP → Plugins → **Upload Plus**

| 参数 | 可选值 | 默认值 |
|---|---|---|
| **路径结构类型** | `hash` — 按文件名哈希生成子文件夹<br>`date` — YYYY/MM/DD | `hash` |
| **目录深度** | `2` 或 `3` 级（仅限 hash） | `2` |
| **随机文件名** | 开启 / 关闭 | `关闭` |
| **将图片转换为 WebP** | 开启 / 关闭 | `关闭` |

---

## 📂 存储路径结构

| 策略 | 示例 |
|---|---|
| **none** | `uploads/files/filename.ext` |
| **hash 2** | `uploads/files/a1/b2/filename.ext` |
| **hash 3** | `uploads/files/a1/b2/c3/filename.ext` |
| **date** | `uploads/files/2024/09/02/filename.ext` |

基于文件名的 SHA-256 哈希值 → 取前 2 或 3 个字符作为文件夹名称。

---

## 🔀 随机文件名

- 上传时 **自动重命名** 文件为随机文件名。
- 使用 `SHA-256(时间戳 + 原始文件名).扩展名` 生成新文件名。
- 保留原始文件的扩展名。
- 有效防止文件名冲突，同时保护用户隐私。

---

## 🖼️ WebP 转换

- **仅对图片生效**。
- 在原文件旁边生成 `filename.webp`。
- WebP 质量：83 %。
- 客户端收到的是 `.webp` 文件的 URL。

---

## 🌐 多语言支持

插件内置以下语言翻译：

- English (en-GB)
- Русский (ru)
- 中文 (zh-CN)

管理面板语言跟随 NodeBB 的语言设置。

---

## 🛠️ 开发 / Fork

```bash
git clone https://github.com/mysteren/nodebb-plugin-upload-plus.git
cd nodebb-plugin-upload-plus
npm install
npm link            # 在 NodeBB 目录下执行
```

---

## 📄 许可证

MIT © 2025 Upload Plus Contributors
