Template.causes_form.rendered = function() {
    $('#causeStart').datepicker();$('#causeEnd').datepicker();$('#causeUpdated').datepicker();
};

Template.causes_form.helpers({
    /* show error message on view */
    error: function(field) {
        return MeteorisSimpleSchema.error(Causes, field);
    },
    /* get current selected dropdown */
    selected: function(_id) {
        if (this._id === _id)
            return "selected";
    },
    
});