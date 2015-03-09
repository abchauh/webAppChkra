Session.setDefault('enemy', "sdfdsfdsfsdds sdf sd sd sdf sdf ");


Template.templateBasicHeader.events({
    'click #btnLogout': function() {
        Meteor.logout(function(){
            Router.go('usersLogin');
        });          
    },
    'click #btnSess': function() {
                  
         
         Session.set('freeM', chkName);
    }

});

Template.headerHello.helpers({
    postClass: function() {
      return Session.get("freeM");
    }
});
