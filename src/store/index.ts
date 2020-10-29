import { atom } from 'recoil'

export const playersListState = atom({
  key: 'playersListState',
  default: [] as string[],
})
