Template._header.rendered = function() {
  Meteor.setTimeout(function() {
    
    this.$('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrain_width: false,
      hover: false,
      alignment: 'right',
      gutter: 0,
      belowOrigin: true
    });

    this.$('.button-collapse').sideNav({
      menuWidth: 240,
      activationWidth: 70,
      closeOnClick: true
    });

  }.bind(this), 200);
};


Template._header.events({

  'click .login': function () {

    Meteor.loginWithGoogle({

      requestPermissions: ['profile', 'email'],
      loginStyle: "popup"

    }, function(err) {

      if (err) {
        console.log("error");
        Materialize.toast("Login failed", 4000, "red");
      } else {
        Materialize.toast("Login successful", 4000, "green");
      }
    });
  }
});
