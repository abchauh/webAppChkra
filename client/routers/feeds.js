/* Feeds */
Router.route('feeds', function() {
    Router.go('feedsIndex');
});
Router.route('feeds/index/:limit?/', {
    name: 'feedsIndex',
    controller: FeedsController,
    action: 'index',
});
Router.route('feeds/insert/', {
    name: 'feedsInsert',
    controller: FeedsController,
    action: 'insert',
});
Router.route('feeds/update/:_id?', {
    name: 'feedsUpdate',
    controller: FeedsController,
    action: 'update',
});
Router.route('feeds/view/:_id?', {
    name: 'feedsView',
    controller: FeedsController,
    action: 'view',
});
/* EOF Feeds */