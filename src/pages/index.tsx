import { NextPage } from 'next'
import { ChangeEvent, FormEvent, useState } from 'react'
import { CloseCircleIcon } from '../components/icons/CloseCircleIcon'

export const Home: NextPage = () => {
  const [players, setPlayers] = useState<string[]>([])
  const [playerName, setPlayerName] = useState('')

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPlayerName(e.target.value)
  }

  const addPlayer = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!playerName) {
      alert('プレイヤー名を入力してください')
      return
    }

    const newPlayers = [...players, playerName]
    setPlayers(newPlayers)
    setPlayerName('')
  }

  const removePlayer = (targetIndex) => {
    const newPlayers = players.filter((_, index) => index !== targetIndex)
    setPlayers(newPlayers)
  }

  return (
    <div className="container mx-auto">
      <div className="text-center py-10">
        <h1 className="text-6xl font-bold">UNO COUNTER</h1>
      </div>
      <form className="text-center" onSubmit={addPlayer}>
        <label className="block">
          <input
            type="text"
            className="form-input mt-1 block w-full"
            value={playerName}
            onChange={handleOnChange}
          />
        </label>
        <button
          type="submit"
          className="btn bg-gradient-to-r from-teal-400 to-blue-500 text-white mt-5"
        >
          プレイヤーを追加
        </button>
      </form>
      <div className="mt-20 text-center">
        <ul>
          {players.map((player, index) => (
            <li
              key={`player-${player}-${index}`}
              className="text-3xl font-semibold flex justify-center items-center text-gray-900"
            >
              <span className="mr-4">{player}</span>
              <button onClick={() => removePlayer(index)}>
                <CloseCircleIcon className="w-6 h-6" />
              </button>
            </li>
          ))}
        </ul>
        {players.length > 1 && (
          <button className="btn bg-gradient-to-r from-teal-400 to-blue-500 text-white mt-5">
            UNOを開始
          </button>
        )}
      </div>
    </div>
  )
}

export default Home
