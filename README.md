# Project Name

This project is built using **React**, **TypeScript**, and **Vite**. It incorporates modern tools and frameworks to streamline development and provides a solid foundation for building scalable and high-performance web applications.

## Features

- React 19.1.0 with TypeScript for robust and type-safe component development.
- Vite 7.0.0 for fast builds and Hot Module Replacement (HMR).
- ESLint 9.29.0 for maintaining code quality and consistency.
- TailwindCSS for utility-first CSS styling.
- Auto deployment triggered on pushes to the `master` branch.

## Getting Started

### Prerequisites

- Node.js and Yarn must be installed on your system.

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

### Development

To start the development server with HMR:
```bash
yarn dev
   ```

## Deployment

All pushes to the `master` branch will **automatically trigger a deployment** through the configured CI/CD pipeline. Ensure your changes are committed and tested locally before pushing.
