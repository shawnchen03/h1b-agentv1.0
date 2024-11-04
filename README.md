# AI Agent Project

This is an AI Agent project built with Next.js, integrating Flowise API for advanced chatbot functionality.

## Project Structure

```
project-root/
│
├── .next/
├── node_modules/
├── public/
├── src/
│   ├── app/
│   │   ├── chatbot/
│   │   │   └── page.tsx
│   │   ├── control-panel/
│   │   │   └── page.tsx
│   │   ├── get-started/
│   │   │   └── page.tsx
│   │   ├── api/
│   │   │   ├── chat/
│   │   │   │   └── route.ts
│   │   │   ├── check-upload/
│   │   │   │   └── route.ts
│   │   │   └── upload/
│   │   │       └── route.ts
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/
│   │   │   ├── avatar.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── progress.tsx
│   │   │   ├── scroll-area.tsx
│   │   │   ├── select.tsx
│   │   │   ├── switch.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── textarea.tsx
│   │   │   └── tooltip.tsx
│   │   ├── ChatInterface.tsx
│   │   ├── FeatureCard.tsx
│   │   ├── Footer.tsx
│   │   ├── GetStartedForm.tsx
│   │   ├── Header.tsx
│   │   ├── HowItWorksStep.tsx
│   │   └── resume-upload.tsx
│   ├── lib/
│   ├── pages/
│   │   └── api/
│   └── types/
│
├── .eslintrc.json
├── .gitignore
├── next-env.d.ts
├── next.config.js
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
└── tsconfig.json
```

## Key Directories and Files

- `src/`: Source code directory
  - `app/`: Next.js app directory (App Router)
    - `chatbot/`: Chatbot-related components and logic
    - `control-panel/`: Control panel components and logic
    - `get-started/`: Get started page components and logic
  - `components/`: Reusable React components
    - `ui/`: UI-specific components
  - `lib/`: Library of utility functions and shared code
  - `pages/`: Next.js pages (Pages Router)
    - `api/`: API routes
  - `types/`: TypeScript type definitions

## Features

- AI-powered chatbot for personalized career advice
- Resume and cover letter enhancement
- Job match evaluation for H1B-friendly positions
- Career timeline planning
- User dashboard for tracking application progress

## Technologies Used

- Next.js 14
- React
- TypeScript
- Tailwind CSS
- Flowise (for AI agent backend)
- PostCSS

## Setup and Installation

1. Clone the repository:
   ```
   git clone [repository-url]
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Run the development server:
   ```
   npm run dev
   ```

## Integrating Flowise API

The project is set up to integrate with Flowise API. The API integration is handled in the `src/pages/api/` directory or within the `src/lib/` directory.

## Available Scripts

Check the `package.json` file for available scripts. Common scripts include:

- `npm run dev`: Run the development server
- `npm run build`: Build the production application
- `npm start`: Start the production server

## Styling

This project uses Tailwind CSS for styling. Tailwind configuration can be found in `tailwind.config.js`.

## Main Components

The `src/components/` directory contains reusable React components used throughout the application. These components are designed to be modular and easily maintainable.

## API Routes

API routes are located in the `src/pages/api/` directory, following the Pages Router convention.

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the [MIT License](LICENSE).

## Key Configuration Files

- `.eslintrc.json`: ESLint configuration
- `next.config.js`: Next.js configuration
- `package.json`: Project dependencies and scripts
- `postcss.config.js`: PostCSS configuration
- `tailwind.config.js`: Tailwind CSS configuration
- `tsconfig.json`: TypeScript configuration

For detailed information about each file's contents and purpose, please refer to the respective files in the project directory.
