import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Hello</title>
        <meta name="description" content="Hello World" />
      </Head>
      <h1>Hello World</h1>
      <style jsx>{`
        h1 {
          font-size: 5rem;
          margin-top: 5rem;
          text-align: center;
        }
      `}</style>
    </div>
  )
}
