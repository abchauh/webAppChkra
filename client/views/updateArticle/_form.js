Template.updateArticle_form.rendered = function() {
    
};

Template.updateArticle_form.helpers({
    /* show error message on view */
    error: function(field) {
        return MeteorisSimpleSchema.error(UpdateArticle, field);
    },
    /* get current selected dropdown */
    selected: function(_id) {
        if (this._id === _id)
            return "selected";
    },
    
});