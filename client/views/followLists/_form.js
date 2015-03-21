Template.followLists_form.rendered = function() {
    
};

Template.followLists_form.helpers({
    /* show error message on view */
    error: function(field) {
        return MeteorisSimpleSchema.error(FollowLists, field);
    },
    /* get current selected dropdown */
    selected: function(_id) {
        if (this._id === _id)
            return "selected";
    },
    CurrentUserID: function(){
        return Meteor.userId();
    },
    
});