Meteor.publish('avatars', function() {
  return Avatars.find({}, {
    sort: {
      uploadedAt: -1
    }
  });
});