Template.meteorSkills_form.rendered = function() {
    
};

Template.meteorSkills_form.helpers({
    /* show error message on view */
    error: function(field) {
        return MeteorisSimpleSchema.error(MeteorSkills, field);
    },
    /* get current selected dropdown */
    selected: function(_id) {
        if (this._id === _id)
            return "selected";
    },
    
});