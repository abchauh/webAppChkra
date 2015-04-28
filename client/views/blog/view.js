Template.blogView.events = {
    'click #btnRemove': function(e) {
        e.preventDefault();
        if (confirm("Are you sure want to remove this data?")) {
            Router.current().remove(this._id);
            Router.go("blogIndex")
        }
    },
};

//blogIdVar = "gWc5HuHTueQmDysuQ";
//blogIdVar = blog.id;


Template.blogView.helpers({
});