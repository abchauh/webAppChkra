Meteor.publish('interests', function(userId){
  return Interests.find({owner: userId});
})
