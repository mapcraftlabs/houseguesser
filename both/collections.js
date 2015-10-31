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
    max: 200
  },
  link: {
      type: String,
      regEx: SimpleSchema.RegEx.Url,
      autoform: {
         type: "url"
      }
  },
  zip: {
      type: String,
      label: "Zip code",
      regEx: /^[0-9]{5}$/
  },
  askingPrice: {
      type: Number,
      min: 1000
   }
}));
