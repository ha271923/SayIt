<div align="center">

<img src="docs/images/readme/icon.png" width="80" height="80" alt="SayIt">

# SayIt（繁體中文版）

**隨口說，出色寫**

開源的 Windows 語音輸入工具。按下快捷鍵開始說話，SayIt 會把語音轉成文字、用 AI 整理成書面語，再直接輸入到游標所在的位置。

這個分支（fork）把介面和輸出都改成繁體中文（台灣），並預設以本機模式使用。上游專案是 [crosswk/SayIt](https://github.com/crosswk/SayIt)。

[![License: AGPL-3.0](https://img.shields.io/badge/License-AGPL--3.0-blue.svg)](./LICENSE)
[![Platform: Windows](https://img.shields.io/badge/Platform-Windows-0078D6)](https://github.com/ha271923/SayIt/releases/latest)
[![Latest release](https://img.shields.io/github/v/release/ha271923/SayIt?label=release)](https://github.com/ha271923/SayIt/releases/latest)

**[下載 Windows 安裝檔](https://github.com/ha271923/SayIt/releases/latest)** · **[上游專案](https://github.com/crosswk/SayIt)** · **[簡體中文說明（上游）](README.zh-CN.md)**

</div>

<div align="center">

<img src="docs/images/readme/demo-zh.gif" width="820" alt="SayIt 示範：按下快捷鍵、說話，整理好的文字出現在游標處">

*按下快捷鍵、說話，整理好的文字就會打在游標處，不用切換視窗。*

</div>

## 這個分支改了什麼

- **介面全面繁體中文**：介面文字、系統匣選單、安裝程式都是繁體中文。介面語言選單裡的「繁體中文」取代了原本的簡體中文，另有英文可選。
- **輸出自動轉成繁體**：語音辨識結果、AI 整理結果和即時字幕，都會經 [OpenCC](https://github.com/nk2028/opencc-js)（離線、`cn → twp`）轉成台灣用語的繁體中文，例如「软件视频」會轉成「軟體影片」。
- **自動發佈**：推送 `v` 開頭的 tag 時，GitHub Actions 會自動編譯並發佈安裝檔（見 [.github/workflows/release.yml](.github/workflows/release.yml)）。

## 功能

- **任何地方都能語音輸入**：編輯器、聊天軟體、瀏覽器等 Windows 應用程式都能用。
- **可編輯的 AI 整理**：去除贅字、修正辨識錯誤、整理格式，或保留逐字稿。每一段提示詞都能自己改。
- **上下文感知**（預設關閉）：讀取游標附近的文字，讓新輸入的內容語氣和用詞一致。先選取文字再說話，語音會變成編輯指令（翻譯、精簡、改寫或提問），直接取代選取內容。密碼欄位會略過。
- **彈性的語音辨識**：可用雲端 ASR 服務、在自己的 GPU 上跑本機 GGUF 模型，或連到自架的伺服器。
- **熱詞與個別應用程式規則**：提升人名和專有名詞的辨識率，並依不同應用程式自動切換整理方式。
- **浮動視窗回饋**：小型波形視窗顯示錄音狀態和經過時間，也可以開啟即時字幕。
- **資料流向透明**：app 會顯示目前的模式，以及音訊和文字在哪裡處理。
- **本機歷史紀錄與診斷**：可回顧錄音、重新辨識，並收集排查問題用的資訊。

## 運作模式

| 模式 | 適合 | 資料流向 |
| --- | --- | --- |
| **本地模式** | 重視隱私、離線使用 | 語音辨識完全在本機執行。AI 整理關閉時，資料不會離開電腦；AI 整理用本機 LLM（Ollama 等）時也不會。 |
| **雲 API 模式** | 個人日常使用 | 電腦直接連到你設定的 ASR 和 AI 服務商，不經過 SayIt 伺服器。 |
| **伺服器模式** | 團隊、自架部署 | 音訊送到 SayIt 後端處理。**預設位址是上游作者的公開伺服器 `sayitapp.site`**，不想讓音訊上傳到別人的伺服器，就不要用這個模式，或改成你自架的位址。 |

本機辨識內建七種 GGUF 模型，有 GPU 時會自動使用 GPU 加速：Parakeet Unified EN（英文最快最準）、SenseVoice Small、Fun-ASR Nano、Nemotron 3.5 ASR（32 種語言），以及三種大小的 Qwen3-ASR。

雲端辨識支援豆包、通義千問、OpenAI、Gemini、OpenRouter、小米 MiMo、Groq Whisper，以及任何你提供位址的 OpenAI 相容服務。AI 整理支援 DeepSeek、通義千問、豆包、智譜 GLM、小米 MiMo、Groq、OpenRouter、Ollama，以及任何 OpenAI 相容端點。

## 安裝

1. 到 [Releases](https://github.com/ha271923/SayIt/releases/latest) 下載 `SayIt_<版本>_x64-setup.exe`，支援 Windows 10 和 11。
2. 執行安裝檔。安裝檔沒有程式碼簽章，Windows SmartScreen 會跳出警告，選「其他資訊」→「仍要執行」即可。
3. 開啟 SayIt，依下面的「前置需求」選一種設定方式。
4. 在任何應用程式中按下快捷鍵開始說話。預設按一次開始、再按一次結束；另有一組按住說話的快捷鍵。

> ⚠️ **不要使用 app 內建的「檢查更新」**。它查詢的是上游作者的伺服器，更新後會被裝回上游的簡體中文版。要更新請到本分支的 [Releases](https://github.com/ha271923/SayIt/releases) 下載新的安裝檔。

## 前置需求

SayIt 的處理分成兩段：

1. **語音辨識（ASR）**：把聲音轉成文字。
2. **AI 整理（LLM）**：把口語整理成書面語，可以關閉。

這兩段都可以用雲端服務或本機模型，依需求選一種設定。

### 方案 A：Cloud LLM 設置（雲端）

適合不想佔用本機 GPU、或電腦效能較低的情況。需要網路，以及各服務商的 API Key（多數需付費）。

1. **語音辨識**：到「語音引擎」，工作模式選「雲 API 模式」，選一家 ASR 服務商並貼上 API Key。每個欄位旁都有服務商主控台的連結。
2. **AI 整理**：到「AI 供應商」，選一家服務商（DeepSeek、通義千問、OpenRouter、Groq、智譜 GLM 等），填入 API Key 和模型名稱，再按卡片上的測試按鈕確認連線和延遲。
3. 到「AI 整理」開啟整理，並選擇要用的預設提示詞。

用雲 API 模式時，音訊和文字會送到你設定的服務商處理。

### 方案 B：Local LLM 設置（本機，可完全離線）

音訊和文字都不會離開電腦。建議有獨立 GPU（支援 Vulkan）；只有 CPU 也能跑，只是比較慢。

#### 1. 本機語音辨識模型（GGUF）

到「語音引擎」，工作模式選「本地模式」，在模型清單中按「下載」即可。中文推薦 **Fun-ASR Nano**（中英日三語，約 850 MB，記憶體約 1.4 GB，速度和準確度都很好）。

如果 app 裡無法下載（例如公司網路擋住 Hugging Face），可以手動下載後放到指定位置：

1. 下載 [Fun-ASR-Nano-2512-Q8_0.gguf](https://huggingface.co/cswk/sayit-asr-gguf/resolve/main/Fun-ASR-Nano-2512-Q8_0.gguf)（891,270,912 bytes）。
2. 放到下面這個路徑，資料夾名稱和檔名都必須完全一致：

   ```text
   C:\Users\<username>\AppData\Local\com.sayit.app\models\funasr-nano-2512-gguf\Fun-ASR-Nano-2512-Q8_0.gguf
   ```

   `<username>` 是你的 Windows 使用者名稱。也可以在檔案總管的網址列輸入 `%LOCALAPPDATA%\com.sayit.app\models` 直接開啟。

3. 重新開啟 SayIt，或重新進入「語音引擎」頁面，模型會顯示為已下載，選取它即可使用。

可以用 PowerShell 確認檔案完整，結果應為 `681CAEF6DF15A2C0E153B40CA7FE4087FDF65751FA5E6FE605D8A75DFF969E61`：

```powershell
Get-FileHash "$env:LOCALAPPDATA\com.sayit.app\models\funasr-nano-2512-gguf\Fun-ASR-Nano-2512-Q8_0.gguf" -Algorithm SHA256
```

其他模型也是同樣的放法：`models\<資料夾>\<檔名>`。檔案都在 [cswk/sayit-asr-gguf](https://huggingface.co/cswk/sayit-asr-gguf/tree/main)：

| 模型 | 資料夾 | 檔名 | 大小 |
| --- | --- | --- | --- |
| Fun-ASR Nano | `funasr-nano-2512-gguf` | `Fun-ASR-Nano-2512-Q8_0.gguf` | 891 MB |
| SenseVoice Small | `sensevoice-small-gguf` | `SenseVoiceSmall-Q8_0.gguf` | 253 MB |
| Qwen3-ASR 0.6B | `qwen3-asr-0.6b-gguf` | `Qwen3-ASR-0.6B-Q8_0.gguf` | 850 MB |
| Qwen3-ASR 1.7B | `qwen3-asr-1.7b-q4-gguf` | `Qwen3-ASR-1.7B-Q4_K_M.gguf` | 1.32 GB |
| Qwen3-ASR 1.7B 高精度 | `qwen3-asr-1.7b-gguf` | `Qwen3-ASR-1.7B-Q5_K_M.gguf` | 1.52 GB |
| Parakeet Unified EN | `parakeet-unified-en-0.6b-gguf` | `parakeet-unified-en-0.6b-Q4_K_M.gguf` | 477 MB |
| Nemotron 3.5 ASR | `nemotron-asr-streaming-0.6b-gguf` | `nemotron-3.5-asr-streaming-0.6b-Q4_K_M.gguf` | 496 MB |

> 只能用上表這幾個檔案。其他來源的同名 GGUF（例如 FunAudioLLM 官方或給 llama.cpp 轉的版本）架構標籤不同，載入時會出現 `unsupported architecture` 錯誤。
>
> 如果在「語音引擎」→「進階」→「模型儲存位置」改過路徑，就要放到你設定的那個資料夾底下，而不是 `%LOCALAPPDATA%`。

#### 2. 本機 AI 整理模型（選用）

不需要 AI 整理的話可以跳過，這時只做語音辨識，完全離線。

**使用 Ollama：**

1. 安裝 [Ollama](https://ollama.com/download)，再下載一個模型，例如：

   ```powershell
   ollama pull qwen2.5:7b
   ```

2. 在 SayIt 的「AI 供應商」選「Ollama（本機）」。位址預設是 `http://127.0.0.1:11434`，不需要 API Key。模型填 `qwen2.5:7b`，或你已經下載的其他模型。
3. 按測試確認連線，再到「AI 整理」開啟整理。

**使用 LM Studio 或其他 OpenAI 相容的本機服務：**

在「AI 供應商」選「OpenAI 相容」：

- 位址填本機服務的位址，例如 LM Studio 的 `http://127.0.0.1:1234/v1`。
- API Key 隨便填一個值，例如 `lm-studio`。這個欄位不能留空。
- 模型填服務裡載入的模型名稱。

## 自架伺服器

後端使用 FastAPI、WebSocket 串流、Qwen3-ASR，以及可選的 OpenAI 相容整理模型。建議用 Docker Compose 部署。

```bash
git clone https://github.com/ha271923/SayIt.git
cd SayIt/server
cp config.example.yaml config.yaml
cp .env.example .env
# 在 .env / config.yaml 填入服務商和部署設定
docker compose up -d --build
```

GPU 語音辨識需要 NVIDIA GPU，預設伺服器模型建議 16 GB 以上 VRAM。設定、部署、安全性和 API 細節請看 [server/README.md](server/README.md)。部署後在 SayIt 的「伺服器模式」把位址改成你的伺服器。

## 效能參考

Qwen3-ASR-1.7B 搭配 vLLM，在 AWS EC2 `g5.xlarge`（NVIDIA A10G 24 GB）上：

| 音訊長度 | ASR 延遲 | RTF |
| --- | --- | --- |
| 30 秒 | ~0.8 s | 0.025 |
| 1 分鐘 | ~1.6 s | 0.026 |
| 2 分鐘 | ~2.1 s | 0.017 |
| 3 分鐘 | ~2.5 s | 0.014 |
| 5 分鐘 | ~3.0 s | 0.010 |

## 開發

### 桌面客戶端

需要：

- Node.js 18 以上（CI 使用 22）
- Rust stable
- CMake 3.20 以上
- [Vulkan SDK](https://vulkan.lunarg.com/sdk/home#windows)
- Visual Studio Build Tools（「使用 C++ 的桌面開發」工作負載）

```powershell
cd client
npm install
npm run tauri dev
```

編譯安裝檔：

```powershell
cd client
npm run tauri build -- --bundles nsis
```

第一次編譯會從原始碼建置 C++ 語音引擎，大約需要 20 分鐘；之後會使用快取。

在繁體中文等非英文語系的 Windows 上，編譯前要先設定 `CL=/utf-8`，MSVC 才能正確讀取 UTF-8 原始碼：

```powershell
$env:CL = '/utf-8'
```

### 發佈新版

推送 `v` 開頭的 tag，GitHub Actions 就會自動編譯並建立 Release：

```powershell
git tag v0.2.5-zhtw.2
git push fork v0.2.5-zhtw.2
```

安裝檔檔名裡的版本號來自 `client/src-tauri/tauri.conf.json` 的 `version`。

### 伺服器

```bash
cd server
python3 -m venv .venv
source .venv/bin/activate
pip install -r backend/requirements.txt
cd backend
uvicorn app.main:app --port 8000
```

需要 Python 3.10 以上；GPU 推論需要支援 CUDA 的 NVIDIA GPU。

## 專案結構

```text
SayIt/
├── client/       # Tauri + React 桌面客戶端
├── server/       # FastAPI 後端、閘道、網頁示範與部署檔
├── docs/         # 使用說明與圖片
└── dev-docs/     # 內部開發筆記
```

## 回報問題

- 繁體中文版本身的問題（翻譯、轉換、安裝檔），請到本分支的 [Issues](https://github.com/ha271923/SayIt/issues)。
- 功能或辨識引擎的問題，請到上游的 [crosswk/SayIt Issues](https://github.com/crosswk/SayIt/issues)。

## 貢獻者

<!-- ALL-CONTRIBUTORS-LIST:START -->
| [<img src="https://github.com/crosswk.png" width="60"><br><sub>crosswk</sub>](https://github.com/crosswk) | [<img src="https://avatars.githubusercontent.com/u/76263028" width="60"><br><sub>Claude (Anthropic)</sub>](https://claude.ai) |
|:---:|:---:|
<!-- ALL-CONTRIBUTORS-LIST:END -->

## 授權

[GNU Affero General Public License v3.0](./LICENSE)

你可以使用、修改和自架 SayIt。散布修改版或以網路服務形式提供時，必須以相同授權公開對應的原始碼。
