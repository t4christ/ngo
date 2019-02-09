import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users,Profile,updateProfile,passwordReset,passwordConfirm } from './users.reducer';
import { givers } from './landing.reducer';
import { About } from './about.reducer';
import { giveGift,getGiftCategory,getGiftId,receiveGift,Testimonial,category_search} from './giveGift.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  about:About,
  catsearch:category_search,
  givers,
  pass:passwordReset,
  confirm:passwordConfirm,
  category:getGiftCategory,
  giver:giveGift,
  receiver:receiveGift,
  giveid:getGiftId,
  testify:Testimonial,
  profile:Profile,
  updateProfile,
  alert
});

export default rootReducer;