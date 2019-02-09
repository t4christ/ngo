import { giverConstants } from '../_constants';

export function giveGift(state = {}, action) {
  switch (action.type) {
    case giverConstants.GETALL_REQUEST:
      return {
        giving: true
      };
    case giverConstants.GETALL_SUCCESS:
      return {
        items: action.giver
      };
    case giverConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
      case giverConstants.DELETE_REQUEST:
      // add 'deleting:true' property to giver being deleted
      return {
        ...state,
        items: state.items.map(giver =>
          giver.id === action.id
            ? { ...giver, deleting: true }
            : giver
        )
      };
    case giverConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        items: state.items.filter(giver => giver.id !== action.id)
      };
    case giverConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to gier 
      return {
        ...state,
        items: state.items.map(giver => {
          if (giver.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...giverCopy } = giver;
            // return copy of user with 'deleteError:[error]' property
            return { ...giverCopy, deleteError: action.error };
          }

          return giver;
        })
      };

    default:
      return state
  }
}


export function receiveGift(state = {}, action) {
  switch (action.type) {
    case giverConstants.GETALL_REQUEST:
      return {
        giving: true
      };
    case giverConstants.GETALL_SUCCESS:
      return {
        items: action.receiver
      };
    case giverConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };

    default:
      return state
  }
}




export function Testimonial(state = {}, action) {
  switch (action.type) {
    case giverConstants.GETALL_REQUEST:
      return {
        testifying: true
      };
    case giverConstants.GETALL_SUCCESS:
      return {
        t: action.testify
      };
    case giverConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };

    default:
      return state
  }
}










export function getGiftCategory(state = {}, action) {
    switch (action.type) {
      case giverConstants.CATEGORY_REQUEST:
        return {
          fetchcat: true
        };
      case giverConstants.CATEGORY_SUCCESS:
        return {
          cat: action.category
        };
      case giverConstants.CATEGORY_FAILURE:
        return { 
          error: action.error
        };
  
      default:
        return state
    }
  }


export function getGiftId(state = {}, action) {
    switch (action.type) {
      case giverConstants.GETID_REQUEST:
        return {
          receiving: true
        };
      case giverConstants.GETID_SUCCESS:
        return {
          aid: action.giverid
        };
      case giverConstants.GETID_FAILURE:
        return { 
          error: action.error
        };
  
      default:
        return state
    }
  }


  export function category_search(state = {}, action) {
    switch (action.type) {
      case giverConstants.CATEGORY_SEARCH_REQUEST:
        return {
          categorizing: true
        };
      case giverConstants.CATEGORY_SEARCH_SUCCESS:
        return {
          gcat: action.givercat
        };
      case giverConstants.CATEGORY_SEARCH_FAILURE:
        return { 
          error: action.error
        };
  
      default:
        return state
    }
  }