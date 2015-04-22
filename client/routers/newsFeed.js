/* NewsFeed */
Router.route('newsFeed', function() {
    Router.go('newsFeedIndex');
});
Router.route('newsFeed/index/:limit?/', {
    name: 'newsFeedIndex',
    controller: NewsFeedController,
    action: 'index',
});
Router.route('newsFeed/insert/', {
    name: 'newsFeedInsert',
    controller: NewsFeedController,
    action: 'insert',
});
Router.route('newsFeed/update/:_id?', {
    name: 'newsFeedUpdate',
    controller: NewsFeedController,
    action: 'update',
});
Router.route('newsFeed/view/:_id?', {
    name: 'newsFeedView',
    controller: NewsFeedController,
    action: 'view',
});
/* EOF NewsFeed */