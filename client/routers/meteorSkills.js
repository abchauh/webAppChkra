/* MeteorSkills */
Router.route('meteorSkills', function() {
    Router.go('meteorSkillsIndex');
});
Router.route('meteorSkills/index/:limit?/', {
    name: 'meteorSkillsIndex',
    controller: MeteorSkillsController,
    action: 'index',
});
Router.route('meteorSkills/insert/', {
    name: 'meteorSkillsInsert',
    controller: MeteorSkillsController,
    action: 'insert',
});
Router.route('meteorSkills/update/:_id?', {
    name: 'meteorSkillsUpdate',
    controller: MeteorSkillsController,
    action: 'update',
});
Router.route('meteorSkills/view/:_id?', {
    name: 'meteorSkillsView',
    controller: MeteorSkillsController,
    action: 'view',
});
/* EOF MeteorSkills */