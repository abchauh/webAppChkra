Template.campUpdatesList.helpers({
    campUpdate: function() {
        return CampUpdates.find({blogId:blogIdVar});
    },
});