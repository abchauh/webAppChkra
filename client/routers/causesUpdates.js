/* POSTS */
Router.route('causesUpdates', function(){
    Router.go('causesUpdatesIndex');
});
Router.route('causesUpdates/index/:limit?/', {
    name: 'causesUpdatesIndex',
    controller: CausesUpdatesController,
    action: 'index',
});
Router.route('causesUpdates/insert/', {
    name: 'causesUpdatesInsert',
    controller: CausesUpdatesController,
    action: 'insert',
});
Router.route('causesUpdates/insert/:_id?', {
    name: 'CausesUpdateInsertCausesUpdatesBlogId',
    controller: CausesUpdatesController,
    action: 'InsertCausesUpdatesBlogId',
});
Router.route('causesUpdates/update/:_id?', {
    name: 'causesUpdatesUpdate',
    controller: CausesUpdatesController,
    action: 'update',
});
Router.route('causesUpdates/view/:_id?', {
    name: 'causesUpdatesView',
    controller: CausesUpdatesController,
    action: 'view',
});
/* EOF POSTS */
