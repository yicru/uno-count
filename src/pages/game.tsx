import { NextPage } from 'next'
import { useRecoilValue } from 'recoil'
import { playersListState } from '../store'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const Game: NextPage = () => {
  const players = useRecoilValue(playersListState)

  const router = useRouter()

  useEffect(() => {
    if (!players.length) {
      router.push('/')
    }
  }, [players])

  return (
    <div className="min-h-screen center">
      <ul>
        {players.map((player, index) => (
          <li
            key={`player-${player}-${index}`}
            className="text-3xl font-semibold text-gray-900"
          >
            {player}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Game
