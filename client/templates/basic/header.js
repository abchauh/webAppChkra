Template.templateBasicHeader.rendered = function() {
	console.log("created")
	new gnMenu( document.getElementById('gn-menu'));  
};
Template.templateBasicHeader.events({
    'click #btnLogout': function() {
        Meteor.logout(function(){
            Router.go('usersLogin');
        });          
    }
});
