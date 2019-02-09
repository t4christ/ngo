import { aboutConstants } from '../_constants';
import { userService } from '../_services';


export const aboutActions = {
    about,
 
};



function about() {
    return dispatch => {
        dispatch(request());

        userService.about()
            .then(
                about => dispatch(success(about)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: aboutConstants.ABOUT_REQUEST } }
    function success(about) { return { type: aboutConstants.ABOUT_SUCCESS, about } }
    function failure(error) { return { type: aboutConstants.ABOUT_FAILURE, error } }
}