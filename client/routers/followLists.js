/* FollowLists */
Router.route('followLists', function() {
    Router.go('followListsIndex');
});
Router.route('followLists/index/:limit?/', {
    name: 'followListsIndex',
    controller: FollowListsController,
    action: 'index',
});
Router.route('followLists/insert/', {
    name: 'followListsInsert',
    controller: FollowListsController,
    action: 'insert',
});
Router.route('followLists/update/:_id?', {
    name: 'followListsUpdate',
    controller: FollowListsController,
    action: 'update',
});
Router.route('followLists/view/:_id?', {
    name: 'followListsView',
    controller: FollowListsController,
    action: 'view',
});
/* EOF FollowLists */