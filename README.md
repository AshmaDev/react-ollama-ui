# React Ollama UI

React Ollama UI is a web interface for [ollama.ai](https://ollama.ai/download), a tool that enables running Large Language Models (LLMs) on your local machine.

<p align="center">
  <img src=".github/preview.png" alt="React Ollama UI preview">
</p>

## ⚙️ Installation

### Prerequisites

1. Download and install [Ollama CLI](https://ollama.ai/download).

2. Run your selected model [Ollama library](https://ollama.com/library).

```bash
ollama run <model-name>
```

3. Download and install [pnpm](https://pnpm.io/installation) and [node](https://nodejs.org/en/download).

### Getting Started

1. Clone the repository and start your dev server.

```bash
git clone https://github.com/AshmaDev/react-ollama-ui.git
cd react-ollama-ui
pnpm install
pnpm run dev
```

## 🐳 Quick Start with Docker

> [!NOTE]  
> The current Docker Compose configuration runs Ollama on CPU only. If you wish to use an NVIDIA or AMD GPU, you will need to modify the `docker-compose.yml` file. For more details, visit the [Ollama Docker Hub page](https://hub.docker.com/r/ollama/ollama).

```bash
docker compose up -d
```

---

## 🛠 Built With

- [Ollama.ai](https://ollama.ai/)
- [React.js](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [@phosphor-icons/react](https://phosphoricons.com)

---

## 📝 License

Licensed under the MIT License. See the [LICENSE](LICENSE.md) file for details.
