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
    login() {
        return `/api/auth/login`;
    },
    signOut() {
        return `/api/auth/signout`;
    },
    authRegisterPostReq() {
        return `/api/register`
    },
    createNewTopic() {
        return '/new';
    },
    topicPage(topicId: string) {
        return `/topic/${topicId}`;
    },
    deleteTopicPage(userId: string, topicId: string) {
        return `/topic/edit/${topicId}/${userId}`;
    },
};

export default paths;