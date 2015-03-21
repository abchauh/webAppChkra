Template.messages_form.rendered = function() {
    $('#seenAt').datepicker();$('#readAt').datepicker();$('#sentAt').datepicker();
};

Template.messages_form.helpers({
    /* show error message on view */
    error: function(field) {
        return MeteorisSimpleSchema.error(Messages, field);
    },
    /* get current selected dropdown */
    selected: function(_id) {
        if (this._id === _id)
            return "selected";
    },
    msgSeenAt:  function() {
        return (new Date);
    },
    CurrentUserID: function(){
    return Meteor.userId();
    },
});