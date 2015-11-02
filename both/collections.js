// LISTINGS

Listings = new Mongo.Collection('listings');

Listings.helpers({

});

Listings.before.insert(function (userId, doc) {
  doc.createdAt = moment().toDate();
  doc.createdBy = userId;
});

Listings.attachSchema(new SimpleSchema({
  address: {
    type: String,
    max: 200,
    autoform: { 
      type: 'hidden',
      label: false
    }
  },
  city: {
    type: String,
    max: 200,
    autoform: { 
      type: 'hidden',
      label: false
    }
  },
  state: {
    type: String,
    max: 200,
    autoform: { 
      type: 'hidden',
      label: false
    }
  },
  zip: {
    type: String,
    label: "Zip code",
    regEx: /^[0-9]{5}$/,
    autoform: { 
      type: 'hidden',
      label: false
    }
  },
  link: {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
    autoform: {
      type: "url"
    }
  },
  askingPrice: {
    type: Number,
    min: 1000
  }
}));


// BIDS

Bids = new Mongo.Collection('bids');

Bids.helpers({

});

Bids.before.insert(function (userId, doc) {
  doc.createdAt = moment().toDate();
  doc.createdBy = userId;
});

Bids.attachSchema(new SimpleSchema({
  comment: {
    type: String,
    optional: true,
    max: 200
  },
  listingId: {
    type: String,
    max: 50,
    autoform: { 
      type: 'hidden',
      label: false
    }
  },
  bid: {
      type: Number,
      min: 1000
   }
}));