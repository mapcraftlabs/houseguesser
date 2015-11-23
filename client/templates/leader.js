Template.leader.helpers({
  userName: function () {
  	var u = Meteor.users.findOne(this.userId);
  	return u.profile.name;
  },
  profilePic: function () {
  	var u = Meteor.users.findOne(this.userId);
  	return u.services.google.picture;
  },
  showGeog: function () {
	  return Template.parentData().geog == "all" || 
      ActiveRoute.name('user');
  }
});
