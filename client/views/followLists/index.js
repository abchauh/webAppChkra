Template.followListsIndex.helpers({

});

Template.followListsIndex.events = {
    'click #btnRemove': function(e) {
        e.preventDefault();
        if (confirm("Are you sure want to remove this data?"))
            Router.current().remove(this._id);
    },
    /* sorting by parameter */
'click #btnSortuserID': function(e) {
MeteorisGridView.sort('userId');
},
/* sorting by parameter */
'click #btnSortprofileName': function(e) {
MeteorisGridView.sort('profileName');
},
/* sorting by parameter */
'click #btnSortusers': function(e) {
MeteorisGridView.sort('users');
},
/* sorting by parameter */
'click #btnSortusersFollowing': function(e) {
MeteorisGridView.sort('usersFollowing');
},
/* sorting by parameter */
'click #btnSortcampaigns': function(e) {
MeteorisGridView.sort('campaigns');
},
/* sorting by parameter */
'click #btnSortcauses': function(e) {
MeteorisGridView.sort('causes');
},
/* sorting by parameter */
'click #btnSortlikedPosts': function(e) {
MeteorisGridView.sort('likedPosts');
},
/* sorting by parameter */
'click #btnSortprojects': function(e) {
MeteorisGridView.sort('projects');
},

    'keyup #search': function(e, t) {
        e.preventDefault();
        Router.current().search(t);        
    },
    /* check all checkbox */
    'change #checkAll': function(e) {
        e.preventDefault();
        var checkboxes = $('.checkAll');
        for (var i = 0, n = checkboxes.length; i < n; i++) {
            checkboxes[i].checked = e.target.checked;
        }
    },
    /* remove all selected item */
    'click #btnRemoveAll': function(e) {
        e.preventDefault();
        var checkboxes = $('.checkAll');
        var checkedLength = 0;
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                checkedLength++;
            }
        }

        if (checkedLength > 0) {
            if (confirm("Are you sure want to remove? (total " + checkedLength + " data will be removed)")) {
                // loop over them all
                for (var i = 0; i < checkboxes.length; i++) {
                    // And stick the checked ones onto an array...
                    if (checkboxes[i].checked) {
                        Router.current().remove($(checkboxes[i]).val());
                    }
                }
            }
        } else {
            MeteorisFlash.set('danger', 'Please Select Some data which You Want to Remove');
        }

        //set checkAll header to uncheck
        $('#checkAll').attr("checked", false);
    },
};