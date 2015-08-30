var React = require('react');
var $ = require('jquery');

var eventsDispatcher = require('./modules/events/eventsDispatcher.js');
var Layout = require('./components/Layout.js');



React.render(React.createElement(Layout.Layout, null),
    document.body
);