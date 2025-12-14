# TypeScript Node.js Template

A minimal TypeScript Node.js project template with Fastify, featuring hot-reload development, path aliases, and integrated linting.

## Features

- TypeScript for type safety
- Fastify web framework
- Hot reload with Nodemon
- Path aliases (`@/` for `src/`)
- Prettier for code formatting
- ESLint for code quality and linting
- Environment variable support with dotenv

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Important: Remove Global TypeScript

If you have TypeScript installed globally, it may conflict with the local project version and cause unexpected behavior. Remove it before starting:

```bash
npm remove -g typescript
```

This ensures the project uses the TypeScript version specified in `package.json`, preventing version conflicts and build issues.

## Quick Start

Use this template to create a new project instantly:

```bash
npx degit maliciousmuffins3/fastify-app new-project-name
cd new-project-name
npm install
```

## Getting Started

### 1. Clone the Repository

If you prefer to clone directly:

```bash
git clone https://github.com/maliciousmuffins3/fastify-app.git
cd fastify-app
```

Or use the template (recommended):

```bash
npx degit maliciousmuffins3/fastify-app my-project
cd my-project
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory (if not already present):

```bash
cp .env.example .env
```

Or create it manually with:

```env
PORT=3000
HOST=localhost
```

### 4. Run the Development Server

Start the development server with hot reload:

```bash
npm run dev
```

The server will start at `http://localhost:3000` (or the port specified in your `.env` file).

### 5. Build for Production

Compile TypeScript to JavaScript:

```bash
npm run build
```

This will generate compiled JavaScript files in the `dist/` directory.

### 6. Run Production Build

After building, run the production server:

```bash
npm start
```

## Available Scripts

| Script             | Description                              |
| ------------------ | ---------------------------------------- |
| `npm run dev`      | Start development server with hot reload |
| `npm run build`    | Compile TypeScript to JavaScript         |
| `npm start`        | Run the production build                 |
| `npm run lint`     | Lint code with ESLint                    |
| `npm run lint:fix` | Lint and auto-fix issues                 |

## Project Structure

```
fastify-app/
├── src/
│   ├── config/
│   │   └── index.ts       # Configuration management
│   └── server.ts          # Fastify server entry point
├── dist/                  # Compiled JavaScript (generated)
├── node_modules/          # Dependencies
├── .env                   # Environment variables (not tracked)
├── .gitignore             # Git ignore rules
├── .prettierrc            # Prettier configuration
├── .prettierignore        # Prettier ignore rules
├── eslint.config.mjs      # ESLint configuration
├── nodemon.json           # Nodemon configuration
├── package.json           # Project metadata and dependencies
├── tsconfig.json          # TypeScript configuration
└── README.md              # This file
```

## Path Aliases

This template uses path aliases for cleaner imports:

```typescript
// Instead of relative paths
import config from '../../../config';

// Use path aliases
import config from '@/config';
```

The `@/` alias maps to the `src/` directory.

## Adding New Routes

Create route files in `src/routes/`:

```typescript
// src/routes/users.ts
import { FastifyInstance } from 'fastify';

export default async function userRoutes(fastify: FastifyInstance) {
  fastify.get('/', async (request, reply) => {
    return { message: 'Users route' };
  });
}
```

Then register in `server.ts`:

```typescript
import userRoutes from '@/routes/users';
fastify.register(userRoutes, { prefix: '/users' });
```

## Code Quality Tools

### ESLint

This project uses ESLint with TypeScript support and Prettier integration. The configuration includes:

- TypeScript recommended rules
- Prettier integration (conflicts disabled)
- Node.js globals

Lint your code:

```bash
# Check for issues
npm run lint

# Auto-fix issues
npm run lint:fix
```

### Prettier

The ESLint configuration automatically runs Prettier and reports formatting issues as linting errors, so running `npm run lint:fix` will format your code.

You can also run Prettier directly if needed:

```bash
# Format all files
npx prettier --write .

# Check formatting without modifying files
npx prettier --check .
```

## Environment Variables

Available environment variables:

| Variable | Description     | Default     |
| -------- | --------------- | ----------- |
| `PORT`   | Server port     | `3000`      |
| `HOST`   | Server hostname | `localhost` |

## Troubleshooting

### Port Already in Use

If you get an error that the port is already in use, either:

1. Change the `PORT` in your `.env` file
2. Kill the process using that port:

```bash
# Find the process
lsof -i :3000

# Kill it
kill -9 <PID>
```

### Module Not Found

If you encounter module resolution errors:

1. Delete `node_modules/` and `package-lock.json`
2. Run `npm install` again
3. Restart your development server

### TypeScript Errors

Ensure your TypeScript version is up to date:

```bash
npm install typescript@latest --save-dev
```

**Note:** If you're still experiencing TypeScript issues after updating, verify that you don't have a global TypeScript installation that might be conflicting:

```bash
# Check if TypeScript is installed globally
npm list -g typescript

# If it shows a version, remove it
npm remove -g typescript
```

### Docker: "tsc: command not found"

If you encounter a `tsc: command not found` error when building in Docker, this is a sign that the global TypeScript installation is interfering with the local one. There are two solutions:

**Solution 1: Remove Global TypeScript (Recommended)**

```bash
npm remove -g typescript
```

Then rebuild your Docker image.

**Solution 2: Use Local TypeScript Binary in Dockerfile**

Modify your Dockerfile to use the local TypeScript compiler directly:

```dockerfile
# Instead of:
RUN npm run build

# Use:
RUN ./node_modules/.bin/tsc
```

This bypasses npm scripts and uses the local TypeScript installation directly.

### ESLint Errors

If ESLint reports errors after updating:

1. Clear ESLint cache: `npx eslint --clear-cache`
2. Restart your editor/IDE
3. Run `npm run lint:fix` to auto-fix issues

## License

This project is licensed under the Apache-2.0 License.

## Author

Matthew Roxas

## Support

For issues and questions, please open an issue in the GitHub repository.
