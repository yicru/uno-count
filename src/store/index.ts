import { atom } from 'recoil'
import { IScore } from '../interfaces/score'

export const playersListState = atom<string[]>({
  key: 'playersListState',
  default: [],
})

export const scoresListState = atom<IScore[]>({
  key: 'scoresListState',
  default: [],
})
