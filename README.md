# LlamaGram - World's First Open-Source 3D Holographic Science Teacher

LlamaGram is an open-source educational tool designed to bring 3D holographic models into classrooms, breaking down spatial ability barriers (SAB) for students. This project combines the power of LLMs, 3D holographic technology, and open-source 3D science models to create an interactive teacher avatar that explains complex scientific concepts in real-time.

Try out our app: **[Demo](https://drive.google.com/file/d/1NIrYcJn5Ly_EsVQm-wn0kmn7yj0MmtHE/view?usp=sharing)**

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Introduction

**LlamaGram** bridges the gap between open-source 3D science models from projects like NIH3D and the classroom. It features an interactive holographic avatar powered by Llama 3.1 (70B), which fetches and loads 3D models to explain scientific concepts such as stereochemistry, pharmacology, and drug design. The holographic avatar is beamed into the LemurBox, an open-source DIY kit for creating frugal 3D holographic displays.

## Features

- **LLM-powered interactive teacher avatar**: Uses Llama 3.1 (70B) to engage with students.
- **3D model integration**: Fetches science models from open-source libraries like NIH3D.
- **Speech Recognition and TTS**: Voice-based interaction using state-of-the-art open-source Text-to-Speech and Speech-to-Text libraries.
- **Lip-syncing and rigged 3D model**: Synchronizes avatar speech with 3D facial animations.
- **Holographic display support**: Compatible with the LemurBox, a frugal 3D holographic hardware unit.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- A mobile device or emulator with Expo Go installed.

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/Hal51AI/LlamaGram.git
    cd LlamaGram
    ```

2. **Install dependencies** (using **npm** or **yarn**):

    Using npm:

    ```bash
    npm install
    ```

    Using yarn:

    ```bash
    yarn install
    ```

### Running the App

1. **Run Expo Prebuild** (necessary if you are adding native code):

    Using npm:

    ```bash
    npx expo prebuild
    ```

    Using yarn:

    ```bash
    yarn expo prebuild
    ```

    This will generate the necessary native code for your Expo project (iOS and Android folders). Use this if you are integrating native modules that require a custom build.

2. **Start the Expo development server**:

    Using npm:

    ```bash
    npm start
    ```

    Using yarn:

    ```bash
    yarn start
    ```

3. **Open the project in Expo Go**:

    - In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

### API Keys

Set Groq Key in LlamaGram/app/services/GroqService.ts (line 5)

## Project Structure

    ├── .expo               # Expo configuration files
    ├── .idea               # IDE settings (for JetBrains IDEs)
    ├── .vscode             # VS Code settings and configuration
    ├── android             # Android-specific code and settings
    ├── app                 # Main app logic
    │   ├── constants       # Global constants for the app
    │   ├── navigation      # Navigation-related code (React Navigation)
    │   ├── screens         # App screens/views
    │   ├── services        # API calls and backend services
    │   └── utils           # Utility functions and helpers
    ├── assets              # Static assets (avatar, images, fonts, etc.)
    ├── constants           # Additional global constants
    ├── hooks               # Custom React hooks
    ├── ios                 # iOS-specific code and settings
    ├── node_modules        # Project dependencies
    ├── scripts             # Custom scripts for project automation
    ├── .gitignore          # Git ignored files
    ├── app.json            # App configuration
    ├── App.tsx             # Main App entry component (TypeScript)
    ├── babel.config.js     # Babel configuration
    ├── expo-env.d.ts       # TypeScript types for Expo environment
    ├── index.tsx           # Main entry point for the app
    ├── metro.config.js     # Metro bundler configuration
    ├── package.json        # Project dependencies and scripts
    ├── tsconfig.json       # TypeScript configuration
    ├── yarn.lock           # Yarn lockfile for dependency management
    └── README.md           # Project documentation

## Tech Stack

- **App**: React Native (Expo)
- **Backend**: [Open-source Objaverse Semantic Search](https://github.com/Hal51AI/ObjaverseSemanticSearch)
- **LLM**: Llama 3.1 (70B) via Groq Inference (App/Services -> GroqService)
- **Avatar**: [ReadyPlayerMe](https://readyplayer.me/)
- **3D Models**: Open-source NIH3D, HRA 3D Reference Object Library
- **3D Rendering**: [Open-source Three.JS](https://github.com/Hal51AI/three-gltf-viewer)
- **Text-to-Speech**: Open-source Native TTS libraries
- **Speech-to-Text**: Open-source Native STT libraries
- **Holographic Hardware**: [Open-source DIY KIT - LemurBox](https://d3b22vktv1fs1m.cloudfront.net/assets/stl_files.zip)

## Troubleshooting

**EACCESS Error Fix:** If you encounter a permissions issue (EACCESS error), run the following commands to adjust file permissions:

    ```bash
    sudo chmod -R u+rwx .
    sudo chown -R $(whoami) PATH_TO_LlamaGram
    ```

## Contributing

We welcome contributions! Please fork the repository and submit a pull request.

### Steps to Contribute

1. Fork the repository.

2. Create a new branch
    ```bash
    git checkout -b feature-branch
    ```

3. Make your changes.

4. Commit your changes

    ```bash
    git commit -m 'Add some feature'
    ```
5. Push to the branch

    ```bash
    git push origin feature-branch
    ```

6. Create a new pull request.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
