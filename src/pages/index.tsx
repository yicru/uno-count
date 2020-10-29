import { NextPage } from 'next'

export const Home: NextPage = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <h1 className="font-bold text-5xl">
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </h1>
    </div>
  )
}

export default Home
