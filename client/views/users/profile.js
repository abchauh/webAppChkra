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
    Meteor.call('UserProfile.changeUsername', element.value, function (err, res) {
      console.log(err || res);
    });
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