Template.suggests_form.rendered = function() {
    $('#dateCreated').datepicker();
};

Template.suggests_form.helpers({
    /* show error message on view */
    error: function(field) {
        return MeteorisSimpleSchema.error(Suggests, field);
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