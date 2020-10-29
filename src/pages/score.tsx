import { NextPage } from 'next'
import { useRecoilState, useRecoilValue } from 'recoil'
import { playersListState, scoresListState } from '../store'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
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

  const handleOnEnd = () => {
    const scoresMap = new Map(players.map((player) => [player, 0]))
    setScores([...scores, Object.fromEntries(scoresMap)])
  }

  return (
    <div className="min-h-screen center">
      <table className="w-full container mx-auto table-fixed">
        <thead>
          <tr>
            {players.map((player, index) => (
              <th key={`thead-${player}-${index}`} className="px-4 py-2">
                {player}
              </th>
            ))}
            <th />
          </tr>
        </thead>
        <tbody>
          {scores.map((score, scoreIndex) => (
            <ScoreRow
              isLast={scores.length - 1 === scoreIndex}
              key={`score-row-${scoreIndex}`}
              score={scores[scoreIndex]}
              onChangeScore={handleOnChangeScore}
              onEnd={handleOnEnd}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Score
