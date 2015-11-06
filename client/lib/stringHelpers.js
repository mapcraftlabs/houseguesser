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


Template.registerHelper('pluralize', function(n, thing) {
    n = n || 0;
    // fairly stupid pluralizer
    if (n === 1) {
        return '1 ' + thing;
    } else {
        return n + ' ' + thing + 's';
    }
});


var formatDate = function (date, format) {
    if(!date)
        return 'no date';
    return moment(date).format(format || 'MMM Do @ ha');
};

Template.registerHelper('formatDate', function(date) {
    return formatDate(date);
});