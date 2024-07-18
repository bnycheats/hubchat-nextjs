export function handleChangePasswordError(errorCode: string) {
    switch (errorCode) {
        case 'auth/requires-recent-login':
            return 'Requires recent login. Please log in again and try.';
        case 'auth/weak-password':
            return 'The new password is too weak.';
        case 'auth/invalid-user-token':
        case 'auth/user-token-expired':
            return 'User token expired. Please log in again.';
        case 'auth/network-request-failed':
            return 'Network error. Please try again.';
        case 'auth/user-disabled':
            return 'The user account has been disabled.';
        case 'auth/user-not-found':
            return 'User not found.';
        case 'auth/operation-not-allowed':
            return 'Password update operation is not allowed.';
        default:
            return 'An unknown error occurred. Please try again.';
    }
}
