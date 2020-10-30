import React, { ChangeEvent } from 'react'
import { useRecoilValue } from 'recoil'
import { playersListState } from '../store'
import { IScore } from '../interfaces/score'

type Props = {
  isLast: boolean
  score: IScore
  onChangeScore: (score: IScore) => void
}

export const ScoreRow: React.FC<Props> = ({ isLast, score, onChangeScore }) => {
  const players = useRecoilValue(playersListState)

  const handleOnChangeScore = (
    e: ChangeEvent<HTMLInputElement>,
    playerName: string
  ) => {
    const newScore = {
      ...score,
      [playerName]: Number(e.target.value),
    }
    onChangeScore(newScore)
  }

  return (
    <tr>
      {players.map((player, index) => (
        <td key={`score-input-${player}-${index}`} className="border px-4 py-2">
          <label className="block">
            <input
              disabled={!isLast}
              type="number"
              name={player}
              value={score[player]}
              className="form-input block w-full disabled:bg-gray-300"
              onChange={(e) => handleOnChangeScore(e, player)}
            />
          </label>
        </td>
      ))}
    </tr>
  )
}
