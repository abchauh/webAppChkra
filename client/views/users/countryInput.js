Template.countryInput.helpers({
  countriesNames: function() {
    return Countries().map(function(it){ return it.name; });
  }
});

Template.countryInput.rendered = function() {
  Meteor.typeahead.inject();
};