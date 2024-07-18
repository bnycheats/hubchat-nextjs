export function handleForgotPasswordError(errorCode: string) {
    switch (errorCode) {
        case 'auth/invalid-email':
            return 'The email address is not valid.';
        case 'auth/user-not-found':
            return 'No user found with this email address.';
        case 'auth/network-request-failed':
            return 'Network error. Please check your internet connection and try again.';
        default:
            return 'An unknown error occurred. Please try again.';
    }
}
