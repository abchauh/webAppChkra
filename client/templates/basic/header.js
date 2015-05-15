
Template.templateBasicHeader.events({
    'click #btnLogout': function() {
        Meteor.logout(function(){
            Router.go('usersLogin');
        });          
    },

    'click #sidebar': function() {
        console.log('sidebar click event');
        $('.content').show();
        $('.left.iconBar.sidebar')
            .sidebar('setting', 'transition', 'overlay')
            .sidebar('toggle');
    },

    'mouseover #iconBar': function() {
        console.log('checkpoint1');
        $('.content').show();
    }
});
