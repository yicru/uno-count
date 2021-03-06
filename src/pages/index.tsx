import { NextPage } from 'next'
import { CloseCircleIcon } from '../components/icons/CloseCircleIcon'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { playersListState, scoresListState } from '../store'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '../components/ErrorMessage'
import { useRouter } from 'next/router'

type FormData = {
  playerName: string
}

export const Home: NextPage = () => {
  const players = useRecoilValue(playersListState)
  const setPlayers = useSetRecoilState(playersListState)
  const setScores = useSetRecoilState(scoresListState)

  const router = useRouter()

  const { register, handleSubmit, errors, setValue } = useForm<FormData>()

  const addPlayer = (form: FormData) => {
    const newPlayers = [...players, form.playerName]
    setPlayers(newPlayers)
    setValue('playerName', '')
  }

  const removePlayer = (targetIndex) => {
    const newPlayers = players.filter((_, index) => index !== targetIndex)
    setPlayers(newPlayers)
  }

  const startGame = () => {
    const scoresMap = new Map(players.map((player) => [player, 0]))
    setScores([Object.fromEntries(scoresMap)])
    router.push('/score')
  }

  return (
    <div className="container mx-auto">
      <div className="text-center py-10">
        <h1 className="text-6xl font-bold">UNO COUNTER</h1>
      </div>
      <form className="text-center" onSubmit={handleSubmit(addPlayer)}>
        <label className="block">
          <input
            type="text"
            className="form-input mt-1 block w-full"
            name="playerName"
            ref={register({ required: '必須です' })}
          />
        </label>
        <ErrorMessage message={errors?.playerName?.message} className="mt-2" />
        <button
          type="submit"
          className="btn bg-gradient-to-r from-teal-400 to-blue-500 text-white mt-5"
        >
          プレイヤーを追加
        </button>
      </form>
      <div className="py-20 text-center">
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
          <button
            className="btn bg-gradient-to-r from-teal-400 to-blue-500 text-white mt-5"
            onClick={startGame}
          >
            UNOを開始
          </button>
        )}
      </div>
    </div>
  )
}

export default Home
