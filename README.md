# Risk Calculator

A professional web application for calculating and assessing risk levels using probability, exposure, and consequence factors. Built with [Next.js](https://nextjs.org/) and React.

## What It Does

The Risk Calculator helps users evaluate risk by combining three key factors:

- **Probability** - Likelihood of an event occurring
- **Exposure** - Frequency or duration of exposure to the risk
- **Consequence** - Potential impact or severity if the event occurs

Users select values for each factor, and the application calculates a comprehensive risk score with corresponding risk level (Low, Medium, High, Critical).

## Features

- Interactive risk assessment interface
- Real-time risk calculation
- Visual risk level indicators
- RESTful API integration for risk factors
- Responsive design for all devices

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd fe-risk-calculator
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

### Running the Application

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to use the Risk Calculator.

### API Requirements

The application expects backend API endpoints at:
- `/api/probability` - Get probability options
- `/api/exposure` - Get exposure options
- `/api/consequence` - Get consequence options
- `/api/risk-calculator` - Calculate risk score (POST)

## Project Structure

- `pages/index.js` - Main application page
- `hooks/useRiskCalculator.js` - Custom hook for risk calculation logic
- `lib/axios.js` - HTTP client configuration
- `components/` - React components (including RiskCalculator)

The `pages/api` directory is mapped to `/api/*` for API routes.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
