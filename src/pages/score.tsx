import { NextPage } from 'next'
import { useRecoilState, useRecoilValue } from 'recoil'
import { playersListState, scoresListState } from '../store'
import { useRouter } from 'next/router'
import React, { FormEvent, useEffect } from 'react'
import clonedeep from 'lodash.clonedeep'
import { ScoreRow } from '../components/ScoreRow'
import { IScore } from '../interfaces/score'

const Score: NextPage = () => {
  const players = useRecoilValue(playersListState)
  const [scores, setScores] = useRecoilState(scoresListState)

  const router = useRouter()

  useEffect(() => {
    if (!players.length) {
      router.push('/')
    }
  }, [players])

  const handleOnChangeScore = (score: IScore) => {
    const newScores = clonedeep(scores)
    newScores[newScores.length - 1] = score

    setScores(newScores)
  }

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const scoresMap = new Map(players.map((player) => [player, 0]))
    setScores([...scores, Object.fromEntries(scoresMap)])
  }

  return (
    <div className="min-h-screen center flex-col">
      <form onSubmit={handleOnSubmit}>
        <table className="w-full container mx-auto table-fixed">
          <thead>
            <tr>
              {players.map((player, index) => (
                <th key={`thead-${player}-${index}`} className="px-4 py-2">
                  {player}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {scores.map((score, scoreIndex) => (
              <ScoreRow
                isLast={scores.length - 1 === scoreIndex}
                key={`score-row-${scoreIndex}`}
                score={scores[scoreIndex]}
                onChangeScore={handleOnChangeScore}
              />
            ))}
          </tbody>
        </table>

        <div className="mt-10 text-center">
          <button
            type="submit"
            className="btn bg-gradient-to-r from-teal-400 to-blue-500 text-white mt-5"
          >
            スコアを登録
          </button>
        </div>
      </form>
    </div>
  )
}

export default Score
