Template.teamsView.events = {
    'click #btnRemove': function(e) {
        e.preventDefault();
        if (confirm("Are you sure want to remove this data?")) {
            Router.current().remove(this._id);
            Router.go("teamsIndex")
        }
    },
};

Template.teamsView.helpers({
    employees: function() {
return Employees.find({});
},
jobs: function() {
    var employ = this;
return Jobs.find({_id: employ.job});
},
});