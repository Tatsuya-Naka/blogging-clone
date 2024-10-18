const paths = {
    home() {
        return '/';
    },
    signInWithCredentials() {
        return '/api/auth/callback/credentials';
    },
    signInPath() {
        return `/api/auth/signin`;
    },
    signInWithCredentialCallbackUrl() {
        return '/api/auth/signin/credentials'
    },
    authenticateUserHome() {
        return '/home';
    },
    emergencyForOAuth() {
        return 'http://localhost:3000/api/auth/providers';
    },
    login() {
        return '/api/auth/login';
    },
    signOut() {
        return '/api/auth/signout';
    },
};

export default paths;