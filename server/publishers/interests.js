Meteor.publish('', function(){
  return Interests.find({owner: this.userId || Meteor.userId && Meteor.userId()});
})
