Template.blog_form.rendered = function() {
    
};

Template.blog_form.helpers({
    /* show error message on view */
    error: function(field) {
        return MeteorisSimpleSchema.error(Blog, field);
    },
    /* get current selected dropdown */
    selected: function(_id) {
        if (this._id === _id)
            return "selected";
    },
    getSelected: function (type, currentValue) {
        //if (currentValue == type) return 'selected'
        if (currentValue == 2) return 'selected'
    },
});