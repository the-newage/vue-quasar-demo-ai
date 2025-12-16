# Quasar Demo Application

This is a sample application built with Quasar, Vue 3, and TypeScript, showcasing a modern, scalable frontend architecture.

## Introduction

This project serves as a demonstration of best practices for building robust web applications with the Quasar framework. It includes features like authentication, data fetching with TanStack Query, form management with Vee-Validate and Zod, and global state management with Pinia.

## Features

- **Authentication**: Simple login and profile page.
- **Posts Management**: Create, read, update, and delete posts.
- **Todos**: A simple todo list.
- **Internationalization (i18n)**: Support for multiple languages.
- **Global Error Handling**: A centralized error handling mechanism.

## Theme

The application includes support for both light and dark modes. The theme can be toggled using the switch in the header. By default, it respects the user's system preferences.

## API

This project uses the [JSONPlaceholder](https://jsonplaceholder.typicode.com/) API for mock data. This means that while you can create and update posts, the data will not persist between sessions.

## Development

### Install the dependencies

```bash
npm install
```

### Start the app in development mode

This command starts the development server with hot-code reloading, error reporting, etc.

```bash
npm run dev
```

### Lint the files

This command checks the code for style and formatting issues.

```bash
npm run lint
```

### Run Tests

This command runs the unit and component tests.

```bash
npm test
```

### Build the app for production

This command builds the application for production deployment.

```bash
quasar build
```

### Customize the configuration

See [Configuring quasar.config.ts](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).
