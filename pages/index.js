import Head from 'next/head';
import RiskCalculator from '@/components/RiskCalculator';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Risk Calculator - Calculate Risk Levels</title>
        <meta name="description" content="Professional risk calculator using probability, exposure, and consequence factors" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex items-center justify-center min-h-screen bg-gray-100">
        <RiskCalculator />
      </main>
    </div>
  );
}
