import { userConstants } from '../_constants';

export function users(state = {}, action) {
  switch (action.type) {
    case userConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETALL_SUCCESS:
      return {
        items: action.users
      };
    case userConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
    case userConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map(user =>
          user.id === action.id
            ? { ...user, deleting: true }
            : user
        )
      };
    case userConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        items: state.items.filter(user => user.id !== action.id)
      };
    case userConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
      return {
        ...state,
        items: state.items.map(user => {
          if (user.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...userCopy } = user;
            // return copy of user with 'deleteError:[error]' property
            return { ...userCopy, deleteError: action.error };
          }

          return user;
        })
      };
    default:
      return state
  }
}


export function Profile(state = {}, action) {
  switch (action.type) {
    case userConstants.GETALL_REQUEST:
      return {
        profiling: true
      };
    case userConstants.GETALL_SUCCESS:
      return {
        t: action.profile
      };
    case userConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };

    default:
      return state
  }
}



export function updateProfile(state = {}, action) {
  switch (action.type) {
    case userConstants.UPDATE_PROFILE_REQUEST:
      return { updating: true };
    case userConstants.UPDATE_PROFILE_SUCCESS:
      return {update_success:"Update Successfull"};
    case userConstants.UPDATE_PROFILE_FAILURE:
      return {updated:"Update Failed"};
    default:
      return state
  }
}




export function passwordReset(state = {}, action) {
  switch (action.type) {
    case userConstants.PASSWORD_REQUEST:
      return { resetting: true };
    case userConstants.PASSWORD_SUCCESS:
      return {reset_successful:true};
    case userConstants.PASSWORD_FAILURE:
      return {};
    default:
      return state
  }
}


export function passwordConfirm(state = {}, action) {
  switch (action.type) {
    case userConstants.PASSWORD_CONFIRM_REQUEST:
      return { confirming: true };
    case userConstants.PASSWORD_CONFIRM_SUCCESS:
      return {confirm_successful:true};
    case userConstants.PASSWORD_CONFIRM_FAILURE:
      return {confirm_fail:true};
    default:
      return state
  }
}