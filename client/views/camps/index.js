Template.campsIndex.helpers({

});

Template.campsIndex.events = {
    'click #btnRemove': function(e) {
        e.preventDefault();
        if (confirm("Are you sure want to remove this data?"))
            Router.current().remove(this._id);
    },
    /* sorting by parameter */
'click #btnSortuserId': function(e) {
MeteorisGridView.sort('userId');
},
/* sorting by parameter */
'click #btnSorttitle': function(e) {
MeteorisGridView.sort('title');
},
/* sorting by parameter */
'click #btnSortshortDesc': function(e) {
MeteorisGridView.sort('shortDesc');
},
/* sorting by parameter */
'click #btnSortlongDesc': function(e) {
MeteorisGridView.sort('longDesc');
},
/* sorting by parameter */
'click #btnSortcoverImg': function(e) {
MeteorisGridView.sort('coverImg');
},
/* sorting by parameter */
'click #btnSortimgSrcText': function(e) {
MeteorisGridView.sort('imgSrcText');
},
/* sorting by parameter */
'click #btnSortcauses': function(e) {
MeteorisGridView.sort('causes');
},
/* sorting by parameter */
'click #btnSortcampCreatedAt': function(e) {
MeteorisGridView.sort('campCreatedAt');
},
/* sorting by parameter */
'click #btnSortcampEndDate': function(e) {
MeteorisGridView.sort('campEndDate');
},
/* sorting by parameter */
'click #btnSortcampLastUpdate': function(e) {
MeteorisGridView.sort('campLastUpdate');
},
/* sorting by parameter */
'click #btnSortaddress': function(e) {
MeteorisGridView.sort('address');
},
/* sorting by parameter */
'click #btnSortcountry': function(e) {
MeteorisGridView.sort('country');
},
/* sorting by parameter */
'click #btnSortcity': function(e) {
MeteorisGridView.sort('city');
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