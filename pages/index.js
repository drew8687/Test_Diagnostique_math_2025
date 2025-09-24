import Head from 'next/head'
import MathQuiz from '../components/MathQuiz'

export default function Home() {
  return (
    <>
      <Head>
        <title>Quiz Mathématiques - Évaluation Diagnostique</title>
        <meta name="description" content="Test diagnostique de mathématiques pour la classe 2APIC" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
        <div className="container mx-auto px-4">
          <MathQuiz />
        </div>
      </main>
    </>
  )
}