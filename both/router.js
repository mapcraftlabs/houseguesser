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


	this.route('bids', {
	  path: '/bids/:_id',
    waitOn: function () {
      return [
        this.subscribe('listing', this.params._id),
        this.subscribe('bids', this.params._id)
      ];
    },
    data: function () {
      return {
        listing: Listings.findOne(this.params._id),
        bids: Bids.find({listingId: this.params._id})
      }
    }
  });


  this.route('/bid/new', {
  	name: 'bid.new',
    path: '/bid/new/:_id',
    data: function () {
    	return {
    		listingId: this.params._id
    	}
    }
  });
});