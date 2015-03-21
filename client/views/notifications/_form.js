Template.notifications_form.rendered = function() {
    $('#seenAt').datepicker();$('#readAt').datepicker();$('#sentAt').datepicker();
};

Template.notifications_form.helpers({
    /* show error message on view */
    error: function(field) {
        return MeteorisSimpleSchema.error(Notifications, field);
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