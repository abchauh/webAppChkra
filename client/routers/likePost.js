/* LikePost */
Router.route('likePost', function() {
    Router.go('likePostIndex');
});
Router.route('likePost/index/:limit?/', {
    name: 'likePostIndex',
    controller: LikePostController,
    action: 'index',
});
Router.route('likePost/insert/', {
    name: 'likePostInsert',
    controller: LikePostController,
    action: 'insert',
});
Router.route('likePost/update/:_id?', {
    name: 'likePostUpdate',
    controller: LikePostController,
    action: 'update',
});
Router.route('likePost/view/:_id?', {
    name: 'likePostView',
    controller: LikePostController,
    action: 'view',
});
/* EOF LikePost */