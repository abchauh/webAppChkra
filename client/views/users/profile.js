Template.usersProfile.events = {
    'click #btnChangeProfile': function(e, t){
        e.preventDefault();
        Router.current().changeProfile(t);
    },
    'click #btnChangePassword': function(e, t){
        e.preventDefault();        
        Router.current().changePassword(t);
    }
};

Template.usersProfile.helpers({
    getSelected: function (acctType, currentValue) {
        if (currentValue == acctType) return 'selected'
    }
});