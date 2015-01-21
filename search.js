MeteorSearch = function (options) {
  options = options || {};
  var searchTemplate = options.searchTemplate || Template.search;
  var inputSelector = options.inputSelector || '.queryinput';
  var urlKey = options.urlKey || 'q';

  searchTemplate.helpers({
    query: function () {
      return Router.current().params.query[urlKey];
    }
  });

  searchTemplate.events({
    'submit form': function (e) {
      $(inputSelector).blur();
      var params = Router.current().params;
      params.query[urlKey] = $(e.target).find(inputSelector).val();
      Router.go(Router.current().route.getName(), params, {query: params.query, hash: params.hash});
      return false;
    }
  });

  return {
    getSearchQuery: function () {
      return Router.current() && Router.current().params.query && Router.current().params.query[urlKey];
    }
  };
};
