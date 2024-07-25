export function handleUpdateProfileError(errorCode: string) {
  switch (errorCode) {
    case 'auth/requires-recent-login':
      return 'Please log in again and try to update your profile.';
    case 'auth/user-not-found':
      return 'No user found. Please register first.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your internet connection and try again.';
    default:
      return 'An unknown error occurred. Please try again.';
  }
}
