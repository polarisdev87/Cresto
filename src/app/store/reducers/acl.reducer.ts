import { LOGOUT_SUCCESS } from './../actions/auth.action';
import * as fromAclActions from '../actions';
export const initialState: AclState = {};

// tslint:disable-next-line: no-any
export function reducer(state: AclState = initialState, action: any): AclState {
  switch (action.type) {
    case fromAclActions.ACL_SUCCESS: {
      return action.payload;
    }

    case LOGOUT_SUCCESS: {
      return {};
    }

    default: {
      return state;
    }
  }
}
