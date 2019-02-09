import { aboutConstants } from '../_constants';

export function About(state = {}, action) {
    switch (action.type) {
      case aboutConstants.ABOUT_REQUEST:
        return {
          about_request: true
        };
      case aboutConstants.ABOUT_SUCCESS:
        return {
          about: action.about
        };
      case aboutConstants.ABOUT_FAILURE:
        return { 
          error: action.error
        };
  
      default:
        return state
    }
  }
  