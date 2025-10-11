<div align="center">
    <img src="/docs/image.png" alt="second brain" width="100%" style="border-radius: 16px;"/>
    <h1>second brain</h1>
</div>

second brain is your personal AI bookmark manager that combines the power of vector search and AI embeddings to organize and retrieve information from your saved bookmarks seamlessly

## Features

- **Vector Database**: Utilizes Pinecone for efficient vector storage and retrieval
- **AI Embeddings**: Uses GenAI embeddings for high-quality text representation
- **Browser Extension**: Plasmo-based Chrome extension for seamless web clipping
- **Modern Web Interface**: Next.js-powered user-friendly dashboard
- **Semantic Search**: Find bookmarks using natural language queries
- **Automatic Categorization**: AI-powered bookmark organization

## Tech Stack

### Frontend

- **Next.js** - React framework for the web interface
- **Shadcn/UI** - Utility-first CSS framework

### Backend

- **Node.js** - Runtime environment
- **Pinecone** - Vector database for embeddings storage
- **GenAI** - Embedding generation

### Extension

- **Plasmo Framework** - Browser extension SDK
- **Chrome Extension APIs** - Browser integration

## Installation

### Prerequisites

- Node.js (v20 or higher)
- pnpm
- Chrome browser (v88+)

### Extension Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/jabedzaman/second-brain.git
    cd second-brain
   ```

2. Navigate to the extension directory:

   ```bash
   cd packages/extension
   ```

3. Install dependencies:

   ```bash
   pnpm install
   ```

4. Build the extension:
   ```bash
   pnpm build
   ```
5. Load the extension in Chrome:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" (toggle in the top right)
   - Click "Load unpacked" and select the `packages/extension/build` directory
