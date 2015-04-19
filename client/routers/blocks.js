/* Blocks */
Router.route('blocks', function() {
    Router.go('blocksIndex');
});
Router.route('blocks/index/:limit?/', {
    name: 'blocksIndex',
    controller: BlocksController,
    action: 'index',
});
Router.route('blocks/insert/', {
    name: 'blocksInsert',
    controller: BlocksController,
    action: 'insert',
});
Router.route('blocks/update/:_id?', {
    name: 'blocksUpdate',
    controller: BlocksController,
    action: 'update',
});
Router.route('blocks/view/:_id?', {
    name: 'blocksView',
    controller: BlocksController,
    action: 'view',
});
/* EOF Blocks */