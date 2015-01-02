Package.describe({
  name: 'hpx7:iron-router-search',
  summary: 'Simple search functionality with Meteor and iron:router',
  version: '0.1.1',
  git: 'https://github.com/hpx7/meteor-iron-router-search.git'
});

Package.onUse(function (api) {
  api.versionsFrom('METEOR@1.0.2');
  api.use(['underscore', 'jquery', 'reactive-var'], 'client');
  api.use('iron:router@1.0.0', 'client');
  api.addFiles('search.js', 'client');
  api.export('MeteorSearch', 'client');
});
