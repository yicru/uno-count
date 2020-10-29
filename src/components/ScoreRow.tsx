import React, { ChangeEvent } from 'react'
import { useRecoilValue } from 'recoil'
import { playersListState } from '../store'
import { IScore } from '../interfaces/score'
import { CheckCircleIcon } from './icons/CheckCircleIcon'

type Props = {
  isLast: boolean
  score: IScore
  onChangeScore: (score: IScore) => void
  onEnd: () => void
}

export const ScoreRow: React.FC<Props> = ({
  isLast,
  score,
  onChangeScore,
  onEnd,
}) => {
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
      <td className="text-center">
        <button className="py-1" onClick={onEnd}>
          <CheckCircleIcon className="w-10 h-10" />
        </button>
      </td>
    </tr>
  )
}
