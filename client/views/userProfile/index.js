Template.userProfileIndex.helpers({

});

Template.userProfileIndex.events = {
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
'click #btnSortfname': function(e) {
MeteorisGridView.sort('fname');
},
/* sorting by parameter */
'click #btnSortlname': function(e) {
MeteorisGridView.sort('lname');
},
/* sorting by parameter */
'click #btnSortdisplayName': function(e) {
MeteorisGridView.sort('displayName');
},
/* sorting by parameter */
'click #btnSortuserBio': function(e) {
MeteorisGridView.sort('userBio');
},
/* sorting by parameter */
'click #btnSortlocation': function(e) {
MeteorisGridView.sort('location');
},
/* sorting by parameter */
'click #btnSortimage': function(e) {
MeteorisGridView.sort('image');
},
/* sorting by parameter */
'click #btnSortavatar': function(e) {
MeteorisGridView.sort('avatar');
},
/* sorting by parameter */
'click #btnSortdob': function(e) {
MeteorisGridView.sort('dob');
},
/* sorting by parameter */
'click #btnSortsex': function(e) {
MeteorisGridView.sort('sex');
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