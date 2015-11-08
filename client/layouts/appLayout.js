Meteor.startup(function() {
  AutoForm.setDefaultTemplate('materialize');

  $('body').on('click', '[data-action=logout]', function(event) {
    event.preventDefault();
    Materialize.toast("Logged out successfully", 4000, "green");
    Meteor.logout();
  });
});
