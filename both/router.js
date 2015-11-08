Router.configure({
  layoutTemplate: 'appLayout',
  loadingTemplate: 'loading',
});

Router.plugin('dataNotFound', {dataNotFoundTemplate: 'notFound'});


Router.map(function () {


  this.route('/', {
    name: 'home',
    onAfterAction: function () {
      Meta.setTitle('Home');
    }
  });


  this.route('/listings', {
    name: 'listings',
    waitOn: function() {
      return this.subscribe('listings');
    },
    data: {
      listings: Listings.find({})
    },
    onAfterAction: function () {
      Meta.setTitle('Listings');
    }
  });


  this.route('/leaderboards', {
    name: 'leaderboards',
    onAfterAction: function () {
      Router.go('leaderboard', {geog: 'city', geogId: 'Oakland'});
    }
  });


  this.route('/leaderboard/:geog/:geogId', {
    name: 'leaderboard',
    waitOn: function() {
      var filt = {};
      filt[this.params.geog] = this.params.geogId;
      return this.subscribe('bidIndex', filt);
    },
    data: function () {
      var filt = {};
      filt[this.params.geog] = this.params.geogId;
      return {
        leaders: BidIndex.find(filt)
      }
    },
    onAfterAction: function () {
      Meta.setTitle('Leaderboard');
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
    },
    onAfterAction: function () {
      Meta.setTitle('Bids');
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
