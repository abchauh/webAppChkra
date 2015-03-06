/* Messages */
Router.route('messages', function() {
    Router.go('messagesIndex');
});
Router.route('messages/index/:limit?/', {
    name: 'messagesIndex',
    controller: MessagesController,
    action: 'index',
});
Router.route('messages/insert/', {
    name: 'messagesInsert',
    controller: MessagesController,
    action: 'insert',
});
Router.route('messages/update/:_id?', {
    name: 'messagesUpdate',
    controller: MessagesController,
    action: 'update',
});
Router.route('messages/view/:_id?', {
    name: 'messagesView',
    controller: MessagesController,
    action: 'view',
});
/* EOF Messages */