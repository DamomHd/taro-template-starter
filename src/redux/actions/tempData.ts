import {
  CHANGE,
  CLEAR,
  KEYS,
} from '../constants/tempData';

export const changeTemp = (data: any, key: KEYS) => ({
  type: CHANGE,
  key,
  payload: data,
});
export const clear = (key: KEYS) => ({
  type: CLEAR,
  key,
});

