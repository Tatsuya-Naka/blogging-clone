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
    editTopicPage(userId: string, topicId: string) {
        return `/topic/edit/update/${topicId}/${userId}`;
    },
    searchPage(term?: string) {
        return `/search?term=${term}`
    },
    profilePage(userId: string) {
        return `/profile/${userId}`;
    },
    profileEditPage(userId: string) {
        return `/profile/edit/${userId}`;
    },
};

export default paths;