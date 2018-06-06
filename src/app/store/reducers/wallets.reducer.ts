import { WALLET_REQUEST, WALLET_SUCCESS, WALLET_FAIL } from './../actions/wallets.action';
import { StatusPopupTypes } from '../actions/statusPopup.action';

export const initialState: any = {
  isLoading: false,
  isLoaded: false,
  data: []
};

// tslint:disable-next-line: no-any
export function reducer(state: any = initialState, action: any): any {
  switch (action.type) {

    case WALLET_REQUEST: {
      return {
        ...state,
        isLoading: true
      };
    }

    case WALLET_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };
    }

    case WALLET_FAIL: {
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
      };
    }

    default: {
      return state;
    }
  }
}
