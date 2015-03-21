Template.votes_form.rendered = function() {
    $('#votedAt').datepicker();$('#statusChangedAt').datepicker();
};

Template.votes_form.helpers({
    /* show error message on view */
    error: function(field) {
        return MeteorisSimpleSchema.error(Votes, field);
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