# LlamaGram - World's First Open-Source 3D Holographic Science Teacher

LlamaGram is an open-source educational tool designed to bring 3D holographic models into classrooms, breaking down spatial ability barriers (SAB) for students. This project combines the power of LLMs, 3D holographic technology, and open-source 3D science models to create an interactive teacher avatar that explains complex scientific concepts in real-time.

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

### API KEYS

Set Groq Key in LlamaGram/app/services/GroqService.ts (line 5)







