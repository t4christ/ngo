import { giverConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const giveActions = {
    getCat,
    catSearch,
    giveGifts,
    getGiftId,
    receiveGifts,
    Testimonial
 
};



function giveGifts(giver) {
    return dispatch => {
        dispatch(request(giver));

        userService.giveGift(giver)
            .then(
                giver => {
                dispatch(success());
                 history.push('/');
                dispatch(alertActions.success('Giving Successful'));
                },
                error => {dispatch(failure(error.toString()))
                dispatch(alertActions.error('Took too long to process due to network. Try Giving Again'))
                });
    };

    function request() { return { type: giverConstants.GETALL_REQUEST } }
    function success(giver) { return { type: giverConstants.GETALL_SUCCESS, giver } }
    function failure(error) { return { type: giverConstants.GETALL_FAILURE, error } }
}



function receiveGifts(receiver) {
    return dispatch => {
        dispatch(request(receiver));

        userService.receiveGift(receiver)
            .then(
                receiver => {
                dispatch(success());
                 history.push('/');
                dispatch(alertActions.success('Receiving Successful'));
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: giverConstants.GETALL_REQUEST } }
    function success(receiver) { return { type: giverConstants.GETALL_SUCCESS, receiver } }
    function failure(error) { return { type: giverConstants.GETALL_FAILURE, error } }
}





function Testimonial(testify) {
    return dispatch => {
        dispatch(request(testify));

        userService.testimonial(testify)
            .then(
                testify => {
                dispatch(success());
                 history.push('/');
                dispatch(alertActions.success('Testimonial Successful'));
                },
                error => dispatch(alertActions.success('Testimony Failed. It might be due to network. Try Again.'))
            );
    };

    function request() { return { type: giverConstants.GETALL_REQUEST } }
    function success(testify) { return { type: giverConstants.GETALL_SUCCESS, testify } }
    function failure(error) { return { type: giverConstants.GETALL_FAILURE, error } }
}


function getCat() {
    return dispatch => {
        dispatch(request());

        userService.getAidCat()
            .then(
                category => dispatch(success(category)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: giverConstants.CATEGORY_REQUEST } }
    function success(category) { return { type: giverConstants.CATEGORY_SUCCESS, category } }
    function failure(error) { return { type: giverConstants.CATEGORY_FAILURE, error } }
}

function getGiftId(id) {
    return dispatch => {
        dispatch(request(id));

        userService.giftById(id)
            .then(
                giverid => dispatch(success(giverid)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: giverConstants.GETID_REQUEST, id } }
    function success(giverid) { return { type: giverConstants.GETID_SUCCESS, giverid } }
    function failure(id, error) { return { type: giverConstants.GETID_FAILURE, id, error } }
}


function catSearch(category) {
    return dispatch => {
        dispatch(request(category));

        userService.category_search(category)
            .then(
                givercat => dispatch(success(givercat)),
                error => dispatch(failure(category, error.toString()))
            );
    };

    function request(category) { return { type: giverConstants.CATEGORY_SEARCH_REQUEST, category } }
    function success(givercat) { return { type: giverConstants.CATEGORY_SEARCH_SUCCESS, givercat } }
    function failure(category, error) { return { type: giverConstants.CATEGORY_SEARCH_FAILURE, category, error } }
}