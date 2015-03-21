/* UserProfile */
Router.route('userProfile', function() {
    Router.go('userProfileIndex');
});
Router.route('userProfile/index/:limit?/', {
    name: 'userProfileIndex',
    controller: UserProfileController,
    action: 'index',
});
Router.route('userProfile/insert/', {
    name: 'userProfileInsert',
    controller: UserProfileController,
    action: 'insert',
});
Router.route('userProfile/update/:_id?', {
    name: 'userProfileUpdate',
    controller: UserProfileController,
    action: 'update',
});
Router.route('userProfile/view/:_id?', {
    name: 'userProfileView',
    controller: UserProfileController,
    action: 'view',
});
/* EOF UserProfile */