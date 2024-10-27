const paths = {
    home() {
        return '/';
    },
    homeWithAuth() {
        return "/home";
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
    hideOrArchiveTopicPage(userId: string, topicId: string) {
        return `/topic/edit/hide-archive/${topicId}/${userId}`;
    },
    readingListPage(userId: string) {
        return `/readinglist/${userId}`;
    },
};

export default paths;