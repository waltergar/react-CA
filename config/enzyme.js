import Adapter from 'enzyme-adapter-react-16'
import { configure } from 'enzyme'
import jsdom from 'jsdom'

function setUpDomEnvironment() {
  const { JSDOM } = jsdom;
  const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', {url: 'http://localhost/'});
  const { window } = dom;

  global.window = window;
  global.document = window.document;
  global.navigator = {
    userAgent: 'node.js',
  };
}

setUpDomEnvironment();
configure({ adapter: new Adapter() })
