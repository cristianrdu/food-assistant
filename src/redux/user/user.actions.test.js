import * as userActions from './user.actions';
import { UserActionTypes } from './user.types';
 
describe('user actions', () => {
    it('should create an action to set the user', () => {
        const user = 'user test data'
        const testAction = {
            type: UserActionTypes.SET_CURRENT_USER,
            payload: user
        }
        expect(userActions.setCurrentUser(user)).toEqual(testAction)
    })

})