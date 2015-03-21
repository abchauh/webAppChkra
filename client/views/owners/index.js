Template.ownersIndex.helpers({

});

Template.ownersIndex.events = {
    'click #btnRemove': function(e) {
        e.preventDefault();
        if (confirm("Are you sure want to remove this data?"))
            Router.current().remove(this._id);
    },
    /* sorting by parameter */
'click #btnSortitemID': function(e) {
MeteorisGridView.sort('itemID');
},
/* sorting by parameter */
'click #btnSortitemTye': function(e) {
MeteorisGridView.sort('itemTye');
},
/* sorting by parameter */
'click #btnSortprimaryOwner': function(e) {
MeteorisGridView.sort('primaryOwner');
},
/* sorting by parameter */
'click #btnSortcoOwners': function(e) {
MeteorisGridView.sort('coOwners');
},
/* sorting by parameter */
'click #btnSortadmins': function(e) {
MeteorisGridView.sort('admins');
},
/* sorting by parameter */
'click #btnSortorganisers': function(e) {
MeteorisGridView.sort('organisers');
},
/* sorting by parameter */
'click #btnSortcontributers': function(e) {
MeteorisGridView.sort('contributers');
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