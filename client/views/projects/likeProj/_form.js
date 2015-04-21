Template.likeProj_form.rendered = function() {
    
};

Template.likeProj_form.helpers({
    /* show error message on view */
    error: function(field) {
        return MeteorisSimpleSchema.error(LikeProj, field);
    },
    /* get current selected dropdown */
    selected: function(_id) {
        if (this._id === _id)
            return "selected";
    },
    
});