Router.configure({
  layoutTemplate: 'appLayout',
  loadingTemplate: 'loading',
});

Router.plugin('dataNotFound', {dataNotFoundTemplate: 'notFound'});


Router.map(function () {

	this.route('/', {
	  name: 'home'
	});

	this.route('/dashboard', {
	  name: 'dashboard',
	  waitOn: function() {
	    return this.subscribe('listings');
	  },
	  data: {
	    listings: Listings.find({})
	  },
	  onAfterAction: function () {
	    Meta.setTitle('Dashboard');
	  }
	});

	this.route('/listings/new', {
	  name: 'listings.new'
	});

	this.route('/listing/:id', {
	  name: 'listing'
	});
});