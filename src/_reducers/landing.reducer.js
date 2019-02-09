import { giverConstants } from '../_constants';

export function givers(state = {}, action) {
  switch (action.type) {
    case giverConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case giverConstants.GETALL_SUCCESS:
      return {
        items: action.givers
      };
    case giverConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };

    default:
      return state
  }
}