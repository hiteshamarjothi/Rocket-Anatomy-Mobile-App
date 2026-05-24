# Rocketry Anatomy — Interactive Rocket Education App

A cross-platform mobile application for learning the anatomy of modern rockets, spacecraft, and satellites.

Status: Complete (Sept. 2022 - Aug. 2024)

---

## Overview

Rocketry Anatomy is an educational mobile app built to fill a gap that didn't exist anywhere else: a dedicated, interactive reference for understanding the components of next-generation rockets and aerospace vehicles. Inspired by anatomy apps, the idea was to apply the same chapter-based, component-level learning model to rocketry.

Built solo from concept to MVP using React Native and Expo Go, the project covered the full product development cycle — from initial Figma wireframes and prototypes through to a fully functioning cross-platform application on iOS and Android.

---

## Features

- Rocket and aerospace vehicle catalogue with organised entries
- Chapter-based structure dividing each vehicle into logical, digestible sections
- Dedicated home page and high-contrast UI optimised for readability
- Search functionality for quick access to specific vehicles or components
- Cross-platform support (iOS and Android) from a single codebase

---

## Development Process

### 1. Design (Figma)

Started with a minimum viable feature set and built initial wireframes in Figma. Core layout decisions made at this stage:

- Catalogue section for rockets and aerospace vehicles
- Chapter-based content organisation per vehicle
- Navigation structure and screen hierarchy

Iterated through multiple color schemes and layout approaches. Moved from an initial white/blue compact catalogue design to a final version with a dedicated home page, higher contrast palette, and a cleaner visual hierarchy.

### 2. Prototyping (Figma)

Used Figma's built-in prototyping tools to define app navigation and interaction flows before writing any code. This served as a direct blueprint for the React Native implementation and significantly reduced ambiguity during development.

### 3. Development (React Native + Expo Go)

Implemented the full front-end and back-end in React Native using Visual Studio Code. Expo Go was used throughout for rapid on-device testing — catching bugs, previewing UI changes, and iterating on features without a full build cycle.

React Native's cross-platform model meant the same codebase ran on both iOS and Android with no platform-specific rewrites.

---

## Tech Stack

| Layer | Tool |
|-------|------|
| Framework | React Native |
| Dev & Testing | Expo Go |
| Editor | Visual Studio Code |
| Design & Prototyping | Figma |

---

## Repository Structure

    RocketryAnatomyV3/
    ├── app/
    │   ├── assets/
    │   └── screens/
    │       ├── Artemis 1/
    │       │   ├── screens.js.....
    │       ├── Falcon 9/
    │       └── Falcon Heavy/
    │   └── FlatlistPage.js
    ├── App.js
    ├── app.json
    ├── babel.config.js
    ├── eas.json
    ├── package.json
    └── package-lock.json

Each vehicle has its own folder under screens/, with a dedicated JS file per section (component, stage, or subsystem). FlatlistPage.js drives the main catalogue view.

---

## Design Evolution

Initial version: white and blue color scheme, compacted catalogue layout.

Final MVP: dedicated home page, higher contrast color scheme for readability, refined visual design, dedicated search function.

---

## Skills & Tools

React Native, Expo Go, Figma, Visual Studio Code, UI/UX Design, Cross-Platform Development, Front-End Development, Back-End Development

---

## Current Status

MVP complete and functional on iOS and Android. Serves as a proof of concept for the core learning experience.