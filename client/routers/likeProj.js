/* LikeProj */
Router.route('likeProj', function() {
    Router.go('likeProjIndex');
});
Router.route('likeProj/index/:limit?/', {
    name: 'likeProjIndex',
    controller: LikeProjController,
    action: 'index',
});
Router.route('likeProj/insert/', {
    name: 'likeProjInsert',
    controller: LikeProjController,
    action: 'insert',
});
Router.route('likeProj/update/:_id?', {
    name: 'likeProjUpdate',
    controller: LikeProjController,
    action: 'update',
});
Router.route('likeProj/view/:_id?', {
    name: 'likeProjView',
    controller: LikeProjController,
    action: 'view',
});
/* EOF LikeProj */