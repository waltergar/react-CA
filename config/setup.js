import Adapter from 'enzyme-adapter-react-16'
import { configure, shallow } from 'enzyme'
import jsdom from 'jsdom'

function setUpDomEnvironment() {
  const { JSDOM } = jsdom;
  const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', {url: 'http://localhost/'});
  const { window } = dom;

  window.appConfig = {
    apiHost: 'http://localhost:8000/',
    webHost: window.location.origin,
    user: {
      isAdmin: true,
      loggedAsAdmin: true,
      retailerSettings: true
    },
    account: {
      profileName: 'TestRetailer',
      id: 2,
      type: 3,
      canShop: true,
      canTransact: true,
      canViewDataPortal: true,
      canViewAssortments: true,
      canFindConnections: true
    },
    accounts: [],
    integrations: [],
    assortmentPlanning: true,
    isTiedWithBuyerHierarchy: false
  };

  global.window = window;
  global.window.localStorage = {}
  global.window.sessionStorage = {
    getItem: () => {},
  }
  global.document = window.document;
  global.navigator = {
    userAgent: 'node.js',
  };
  global.window.URL.createObjectURL = blob => (
    `blob:http://www.joor.local/11111111-1111-1111-1111-111111111111`
  )
  global.window.URL.revokeObjectURL = blobUrl => {}
  global.XMLHttpRequest = () => {}
  global.FormData = function FormData() { this.append = jest.fn() }

  // The following are needed for Handsontable
  global.__HOT_BUILD_DATE__ = "";
  global.__HOT_PACKAGE_NAME__ = "";
  global.__HOT_VERSION__ = "";
  global.__HOT_BASE_VERSION__ = "";
  global.Node = window.Node;


  // testing helpers
  global.shallowRenderFeatureFlag = (wrapper, ffState) => {
    let ff
    if (ffState) {
      ff = wrapper.prop('renderFeatureCallback')(true)
    } else {
      ff = wrapper.prop('renderDefaultCallback')(true)
    }

    return shallow(ff)
  }
  mockCanvas()
}

const mockCanvas = () => {
  window.HTMLCanvasElement.prototype.getContext = () => (
    {
      fillRect: () => {},
      clearRect: () => {},
      getImageData: (x, y, w, h) => ({
        data: new Array(w * h * 4),
      }),
      putImageData: () => {},
      createImageData: () => ([]),
      setTransform: () => {},
      drawImage: () => {},
      save: () => {},
      fillText: () => {},
      restore: () => {},
      beginPath: () => {},
      moveTo: () => {},
      lineTo: () => {},
      closePath: () => {},
      stroke: () => {},
      translate: () => {},
      scale: () => {},
      rotate: () => {},
      arc: () => {},
      fill: () => {},
      measureText: () => ({
        width: 0,
      }),
      transform: () => {},
      rect: () => {},
      clip: () => {},
    }
  )
  window.HTMLCanvasElement.prototype.toDataURL = () => ''
}


setUpDomEnvironment();
configure({ adapter: new Adapter() })
