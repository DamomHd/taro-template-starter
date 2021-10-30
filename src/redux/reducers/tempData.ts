import {
  CHANGE, CLEAR, ADDRESS, EDITOR_ADDRESS, CANCELREASON,
} from '../constants/tempData';

export interface TempDataProp {
  PRE_ORDER: any;
  SELECT_ADDRESS:any;
  EDITOR_ADDRESSDATA:any;
  CANCELREASONDATA:any;
}
const DEFAULT_DATA = {
  PRE_ORDER: null,
  SELECT_ADDRESS: null,
  EDITOR_ADDRESSDATA: null,
  CANCELREASONDATA: [],
};
export default function tempData(state = DEFAULT_DATA, action: any): TempDataProp {
  console.log(action);

  switch (action.type) {
    case CHANGE: {
      const value = action.payload || null;
      const { key } = action;
      return { ...state, [key]: value };
    }

    case CLEAR: {
      const { key } = action;
      return { ...state, [key]: null };
    }
    case ADDRESS: {
      const value = action.payload || null;
      const { key } = action;
      return { ...state, [key]: value };
    }
    case EDITOR_ADDRESS: {
      const value = action.payload || null;
      const { key } = action;
      return { ...state, [key]: value };
    }
    case CANCELREASON: {
      const value = action.payload || null;
      const { key } = action;
      return { ...state, [key]: value };
    }

    default:
      return state;
  }
}
