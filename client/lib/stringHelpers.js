Template.registerHelper('truncate', function(string, length) {
  var cleanString = _(string).stripTags();
  return _(cleanString).truncate(length);
});

var formatNumber = function (num, format) {
    return numeral(num || 0).format(format || '0,0');
};

Template.registerHelper('formatNumber', function(num) {
    return formatNumber(num);
});
