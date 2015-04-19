/* POSTS */
Router.route('projUpdates', function(){
    Router.go('projUpdatesIndex');
});
Router.route('projUpdates/index/:limit?/', {
    name: 'projUpdatesIndex',
    controller: ProjUpdatesController,
    action: 'index',
});
Router.route('projUpdates/insert/', {
    name: 'projUpdatesInsert',
    controller: ProjUpdatesController,
    action: 'insert',
});
Router.route('projUpdates/insert/:_id?', {
    name: 'ProjUpdateInsertProjUpdatesBlogId',
    controller: ProjUpdatesController,
    action: 'InsertProjUpdatesBlogId',
});
Router.route('projUpdates/update/:_id?', {
    name: 'projUpdatesUpdate',
    controller: ProjUpdatesController,
    action: 'update',
});
Router.route('projUpdates/view/:_id?', {
    name: 'projUpdatesView',
    controller: ProjUpdatesController,
    action: 'view',
});
/* EOF POSTS */
