/* NewsFeedsLiked */
Router.route('newsFeedsLiked', function() {
    Router.go('newsFeedsLikedIndex');
});
Router.route('newsFeedsLiked/index/:limit?/', {
    name: 'newsFeedsLikedIndex',
    controller: NewsFeedsLikedController,
    action: 'index',
});
Router.route('newsFeedsLiked/insert/', {
    name: 'newsFeedsLikedInsert',
    controller: NewsFeedsLikedController,
    action: 'insert',
});
Router.route('newsFeedsLiked/update/:_id?', {
    name: 'newsFeedsLikedUpdate',
    controller: NewsFeedsLikedController,
    action: 'update',
});
Router.route('newsFeedsLiked/view/:_id?', {
    name: 'newsFeedsLikedView',
    controller: NewsFeedsLikedController,
    action: 'view',
});
/* EOF NewsFeedsLiked */