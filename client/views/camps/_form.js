Template.camps_form.rendered = function() {
    $('#campCreatedAt').datepicker();$('#campEndDate').datepicker();$('#campLastUpdate').datepicker();
};

Template.camps_form.helpers({
    /* show error message on view */
    error: function(field) {
        return MeteorisSimpleSchema.error(Camps, field);
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