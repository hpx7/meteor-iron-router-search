MeteorSearch = function (options) {
  var searchTemplate = options.searchTemplate || Template.search;
  var resultsTemplate = options.resultsTemplate || searchTemplate;
  var inputSelector = options.inputSelector || '.queryinput';
  var searchFn = options.searchFn || _.identity;

  searchTemplate.helpers({
    query: function () {
      return Router.current().params.query.q;
    }
  });

  resultsTemplate.helpers({
    searchResults: function () {
      return Template.instance().results.get();
    }
  });

  resultsTemplate.created = function () {
    var self = this;
    self.results = new ReactiveVar([]);
    self.autorun(function () {
      var query = Router.current() && Router.current().params.query && Router.current().params.query.q;
      query ? searchFn(query, function (error, data) {
        self.results.set(data);
      }) : self.results.set([]);
    });
  };

  searchTemplate.events({
    'submit form': function (e) {
      $(inputSelector).blur();
      var query = $(e.target).find(inputSelector).val();
      Router.go(Router.current().route.getName(), Router.current().params, {
        query: _.extend(Router.current().params.query, {q: query}),
        hash: Router.current().params.hash
      });
      return false;
    }
  });
}
