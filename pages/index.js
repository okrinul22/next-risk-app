import Head from 'next/head';
import RiskCalculator from '@/components/RiskCalculator';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      setLoading(false);
    }

  }, [])


  return (
    <div>
      <Head>
        <title>Risk Calculator</title>
        <meta name="description" content="Risk Calculator using Next.js and Tailwind CSS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex items-center justify-center min-h-screen bg-gray-100">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <RiskCalculator />
          </>

        )}
      </main>
    </div>
  );
}
