import { jsdom, changeURL } from 'jsdom';

global.window = jsdom().defaultView;
changeURL(window, 'http://example.com/');
