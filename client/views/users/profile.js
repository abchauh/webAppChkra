Template.usersProfile.created = function () {
  Meteor.subscribe('interests', Meteor.userId());
};

Template.usersProfile.rendered = function () {
  this.$('.date-of-birth').datepicker({
    format: "dd/mm/yyyy"
  });
};

Template.usersProfile.events = {
  'click #btnChangeProfile': function (e, t) {
    e.preventDefault();
    Router.current().changeProfile(t);
  },
  'click #btnChangePassword': function (e, t) {
    e.preventDefault();
    Router.current().changePassword(t);
  },
  'click .change-username-btn': function (e, t) {
    var element = $('#name')[0];
      if (element.value != this.profile.name){
          Meteor.call('UserProfile.changeUsername', element.value, function (error,  result) {
              if (result != "notChanged"){
                  sAlert.info('Successfully changed the username to '+element, {effect: 'jelly', position: 'bottom', timeout: '2500'});
              } else sAlert.error('Username already taken.', {effect: 'jelly', position: 'bottom', timeout: '2500'});

          });
      }

  }
};

Template.usersProfile.helpers({
  getSelected: function (acctType, currentValue) {
    if (currentValue == acctType) return 'selected'
  },
  allowChangeName: function () {
    return !Meteor.user().usernameEdited
  }
});