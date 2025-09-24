import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        <meta name="description" content="Quiz de mathématiques - Évaluation diagnostique 2APIC" />
        <meta name="keywords" content="quiz, mathématiques, évaluation, diagnostique, 2APIC" />
        <meta name="author" content="Système d'évaluation" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}