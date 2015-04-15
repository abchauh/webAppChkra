Template.Interests.helpers({
  interests: function() {
    return Interests.find();
  },
  isInterestsExists: function(){
  	return !!Interests.find().count();
  }
});

Template.Interests.events({
  'click .add-interest-btn': function(e, t) {
    var interestName = $('#new-interest-name')[0];
    Interests.insert({
      owner: Meteor.userId(),
      interestName: interestName.value
    }, function(err, res) {
      if (err) {
        toastr.error(err.name);
      } else {
        toastr.success('Added interest');
        interestName.value = '';
      }
    })
  },
  'click .remove-interest-btn': function(e, t) {
    Interests.remove({
      _id: this._id
    }, function(err, res) {
      if (err) {
        toastr.error(err.name)
      } else {
        toastr.success('Interest removed', 'Success')
      }
    });
  }
});