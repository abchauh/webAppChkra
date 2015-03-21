Template.userProfile_form.rendered = function() {
    $('#dob').datepicker();
};

Template.userProfile_form.helpers({
    /* show error message on view */
    error: function(field) {
        return MeteorisSimpleSchema.error(UserProfile, field);
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