Template.causesView.events = {
    'click #btnRemove': function(e) {
        e.preventDefault();
        if (confirm("Are you sure want to remove this data?")) {
            Router.current().remove(this._id);
            Router.go("causesIndex")
        }
    },
};

Template.causesView.helpers({
    v1: function(){
        return "wwww";
    },
    v2: function() {
        return "11";
    },

});

