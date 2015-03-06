/* Notifications */
Router.route('notifications', function() {
    Router.go('notificationsIndex');
});
Router.route('notifications/index/:limit?/', {
    name: 'notificationsIndex',
    controller: NotificationsController,
    action: 'index',
});
Router.route('notifications/insert/', {
    name: 'notificationsInsert',
    controller: NotificationsController,
    action: 'insert',
});
Router.route('notifications/update/:_id?', {
    name: 'notificationsUpdate',
    controller: NotificationsController,
    action: 'update',
});
Router.route('notifications/view/:_id?', {
    name: 'notificationsView',
    controller: NotificationsController,
    action: 'view',
});
/* EOF Notifications */