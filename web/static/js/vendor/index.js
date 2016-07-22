window.jQuery = window.$ = require('jquery');

// Not sure if this is needed, but not including tether lets bootstrap throw
// an error. But tether is neither listed as a dependency nor do we use tool-
// tips at the moment.
window.Tether = require('tether');

require('bootstrap');