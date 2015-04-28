Template.likePost_form.rendered = function() {
    
};

Template.likePost_form.helpers({
    /* show error message on view */
    error: function(field) {
        return MeteorisSimpleSchema.error(LikePost, field);
    },
    /* get current selected dropdown */
    selected: function(_id) {
        if (this._id === _id)
            return "selected";
    },
    
});