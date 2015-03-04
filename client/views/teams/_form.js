Template.teams_form.rendered = function() {
    
};

Template.teams_form.helpers({
    /* show error message on view */
    error: function(field) {
        return MeteorisSimpleSchema.error(Teams, field);
    },
    /* get current selected dropdown */
    selected: function(_id) {
        if (this._id === _id)
            return "selected";
    },
    employees: function() {
return Employees.find({});
},
jobs: function() {
return Jobs.find({});
},

});