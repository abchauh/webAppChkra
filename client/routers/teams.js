/* Teams */
Router.route('teams', function() {
    Router.go('teamsIndex');
});
Router.route('teams/index/:limit?/', {
    name: 'teamsIndex',
    controller: TeamsController,
    action: 'index',
});
Router.route('teams/insert/', {
    name: 'teamsInsert',
    controller: TeamsController,
    action: 'insert',
});
Router.route('teams/update/:_id?', {
    name: 'teamsUpdate',
    controller: TeamsController,
    action: 'update',
});
Router.route('teams/view/:_id?', {
    name: 'teamsView',
    controller: TeamsController,
    action: 'view',
});
/* EOF Teams */