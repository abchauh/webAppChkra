Template.campaigns_form.rendered = function() {
    
};

Template.campaigns_form.helpers({
    /* show error message on view */
    error: function(field) {
        return MeteorisSimpleSchema.error(Campaigns, field);
    },
    /* get current selected dropdown */
    selected: function(_id) {
        if (this._id === _id)
            return "selected";
    },
    getSelected: function (type, currentValue) {
        if (currentValue == type) return 'selected'
//        if (currentValue == 2) return 'selected'
    },
});