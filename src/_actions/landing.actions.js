import { giverConstants } from '../_constants';
import { userService } from '../_services';
// import { alertActions } from './';
// import { history } from '../_helpers';

export const giverActions = {
    getGifts,
 
};



function getGifts() {
    return dispatch => {
        dispatch(request());

        userService.getGift()
            .then(
                givers => dispatch(success(givers)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: giverConstants.GETALL_REQUEST } }
    function success(givers) { return { type: giverConstants.GETALL_SUCCESS, givers } }
    function failure(error) { return { type: giverConstants.GETALL_FAILURE, error } }
}