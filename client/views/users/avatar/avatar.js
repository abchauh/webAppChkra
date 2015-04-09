Template.avatar.helpers({
	avatar: function(){
		return Avatars.findOne(Meteor.user().profile.image);
	}
})