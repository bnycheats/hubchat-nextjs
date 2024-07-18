export function handleLoginError(errorCode: string) {
    switch (errorCode) {
        case 'auth/email-already-in-use':
            return 'The email address is already in use by another account.';
        case 'auth/invalid-email':
            return 'The email address is not valid.';
        case 'auth/operation-not-allowed':
            return 'Email/password accounts are not enabled.';
        case 'auth/weak-password':
            return 'The password is not strong enough.';
        case 'auth/invalid-password':
            return 'The password is invalid.';
        case 'auth/user-disabled':
            return 'The user account has been disabled.';
        case 'auth/user-not-found':
            return 'There is no user corresponding to the given email.';
        case 'auth/wrong-password':
            return 'The password is invalid.';
        case 'auth/network-request-failed':
            return 'A network error occurred.';
        case 'auth/too-many-requests':
            return 'Too many requests. Try again later.';
        case 'auth/invalid-action-code':
            return 'The action code is invalid.';
        case 'auth/expired-action-code':
            return 'The action code has expired.';
        case 'auth/invalid-credential':
            return 'The credential is malformed or has expired.';
        case 'auth/account-exists-with-different-credential':
            return 'There already exists an account with the email address asserted by the credential.';
        default:
            return 'An unknown error occurred. Please try again.';
    }
}
