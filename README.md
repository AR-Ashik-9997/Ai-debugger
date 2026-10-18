# DebugAI.Studio

DebugAI.Studio is a web interface for analyzing code screenshots with an AI debugging service. Upload up to three screenshots, choose a debugging strategy, and review the returned issue analysis and suggested solution.

This repository contains the frontend application. The analysis service is a separate backend and must be available for debugging requests to succeed.

## Features

- Upload or drag and drop up to three PNG, JPG, or WebP screenshots.
- Choose a **Hints**, **Solution**, or **Security** analysis mode.
- View the returned issue report, suggested fix, and a formatted response log.
- Load the sample screenshot from the upload panel.
- Copy the suggested solution to the clipboard.

## Requirements

- Node.js 20.9 or later
- Yarn 4.12.0 (the package manager declared by this project)
- Access to a compatible debugging backend

## Getting started

Install dependencies:

```bash
yarn install
```

Configure the backend URL as described below, then start the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Backend configuration

The frontend sends analysis requests to `POST /debug`. Set `NEXT_PUBLIC_API_BASE_URL` to the backend's base URL, without a trailing slash:

```env
NEXT_PUBLIC_API_BASE_URL=https://your-backend.example.com
```

If this variable is omitted, requests go to `/debug` on the same origin as the frontend. For local development, create a `.env.local` file in the project root and set the variable there. Restart the development server after changing environment variables.

The request uses `multipart/form-data` with:

| Field | Type | Description |
| --- | --- | --- |
| `files` | File, repeated | Uploaded screenshot images |
| `option` | String | Selected mode: `Hint`, `Solution`, or `Security` |

The backend should return a JSON object containing `issues` and `solution` values for the results view:

```json
{
  "issues": "Description of the detected issues",
  "solution": "Suggested code fix"
}
```

The frontend expects a successful response for the request to complete. A non-success HTTP response is shown as an analysis error.

## Available commands

| Command | Description |
| --- | --- |
| `yarn dev` | Start the Next.js development server |
| `yarn build` | Create a production build |
| `yarn start` | Start the production server (after building) |
| `yarn lint` | Run ESLint |

## Project structure

```text
src/
  app/
    globals.css       Global styles and theme
    layout.tsx        Root layout, metadata, and providers
    page.tsx          Main application state and API request
    providers.tsx     React Query provider
  components/
    ControlPanel/     Screenshot upload and analysis controls
    Navbar/           Application header and share action
    ResultView/       Analysis, solution, and response-log views
  lib/
    utils.ts          Shared utility exports
```

## Technology

The frontend is built with Next.js 16, React 19, and TypeScript. Styling uses Tailwind CSS 4 and shadcn conventions; Lucide provides the interface icons.

## Deployment

Build and run the application with:

```bash
yarn build
yarn start
```

Set `NEXT_PUBLIC_API_BASE_URL` in the deployment environment to the public base URL of a compatible backend. The backend must permit requests from the frontend origin and accept the multipart request described above.
