Router.configure({
  layoutTemplate: 'appLayout',
  loadingTemplate: 'loading',
  waitOn: function() {
    return [
      // hypothetically this could cause some performance
      // problems for a user with lots of bids?
      Meteor.subscribe('myBids'),
      Meteor.subscribe('userInfo')
    ]
  }
});

Router.plugin('dataNotFound', {dataNotFoundTemplate: 'notFound'});


Router.map(function () {


  this.route('/', {
    name: 'home',
    onAfterAction: function () {
      Meta.setTitle('Home');
    }
  });


  this.route('/user', {
    name: 'user',
    waitOn: function() {
      return [
        this.subscribe('bidIndex', {userId: Meteor.userId()})
      ]
    },
    data: function () {
      return {
        bids: Bids.find({createdBy: Meteor.userId()}),
        boards: BidIndex.find({userId: Meteor.userId()},
          {sort: {'scores.averagePctDiff': -1}})
      }
    },
    onAfterAction: function () {
      Meta.setTitle('User');
    }
  });


  this.route('/popularity', {
    name: 'popularity',
    waitOn: function() {
      return [
        this.subscribe('listingCounts')
      ]
    },
    data: function () {
      return {
        zips: ListingCounts.find({zip: {$ne: null}},
          {sort: {numBids: -1}}),
        cities: ListingCounts.find({city: {$ne: null}},
          {sort: {numBids: -1}}),
        states: ListingCounts.find({state: {$ne: null}},
          {sort: {numBids: -1}})
      }
    },
    onAfterAction: function () {
      Meta.setTitle('Popular');
    }
  });

  var makeFilter = function (p) { 
      var filt = {};
      if(p.geog != "all")
          filt[p.geog] = p.geogId;

      // put this here just to get in all valid places
      Session.set('geog', p.geog);
      Session.set('geogId', p.geogId);

      return filt;
  }


  this.route('/listings/:geog/:geogId', {
    name: 'listings',
    waitOn: function() {
      return this.subscribe('listings', makeFilter(this.params));
    },
    data: function () {
      return {
        geog: this.params.geog,
        geogId: this.params.geogId,
        listings: Listings.find(makeFilter(this.params),
          {sort: {createdAt: -1}})
      }
    },
    onAfterAction: function () {
      Meta.setTitle('Listings');
    }
  });


  this.route('/leaderboard/:geog/:geogId', {
    name: 'leaderboard',
    waitOn: function() {
      var filt = {
        $and: [
          makeFilter(this.params),
          {'scores.numBids': {$gt: 0}}
        ]
      };
      return this.subscribe('bidIndex', filt);
    },
    data: function () {
      return {
        geog: this.params.geog,
        geogId: this.params.geogId,
        leaders: BidIndex.find(makeFilter(this.params),
          {sort: {'scores.averagePctDiff': -1}})
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
