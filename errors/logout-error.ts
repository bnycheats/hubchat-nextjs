export function handleLogoutError(errorCode: string) {
  switch (errorCode) {
    case 'auth/network-request-failed':
      return 'Network error. Please check your internet connection and try again.';
    case 'auth/user-token-expired':
      return 'Session expired. Please log in again.';
    case 'auth/too-many-requests':
      return 'Too many requests. Please try again later.';
    default:
      return 'An unknown error occurred. Please try again.';
  }
}
