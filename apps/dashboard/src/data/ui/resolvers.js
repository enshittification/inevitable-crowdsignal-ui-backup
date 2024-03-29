/**
 * Internal dependencies
 */
import { fetchUser } from '@crowdsignal/rest-api';
import { dispatchAsync } from '../actions';
import { updateAccount, updateAccountSignalCount } from '../accounts/actions';
import {
	updateUserAccount,
	updateUserCapabilities,
	updateUserProfile,
} from '../users/actions';
import { updateCurrentUser, updateLastPublishedTheme } from '../ui/actions';

function* getCurrentUser() {
	try {
		const response = yield dispatchAsync( fetchUser, [ 'me' ] );

		const {
			account,
			capabilities,
			id: userId,
			profile,
			signalCount,
			lastPublishedTheme,
		} = response.data;

		yield updateUserAccount( userId, account.id );
		yield updateUserCapabilities( userId, capabilities );
		yield updateUserProfile( userId, profile );

		yield updateAccount(
			account.id,
			account.partnerUserId,
			account.type,
			account.users,
			account.domain,
			signalCount.userLimit
		);

		yield updateAccountSignalCount( signalCount.count );

		yield updateCurrentUser( userId );
		yield updateLastPublishedTheme( lastPublishedTheme );
	} catch ( error ) {
		// The user is not logged in, no action required
	}
}

export default {
	getCurrentUser,
};
