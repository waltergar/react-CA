import React from 'react'
import ReactDOM from 'react-dom'
import App from 'App'
import 'index.scss'
import registerServiceWorker from 'registerServiceWorker'

// eslint-disable-next-line react/jsx-filename-extension
ReactDOM.render(<App />, document.getElementById('root'))
// registerServiceWorker()
registerServiceWorker({
  onUpdate: (registration) => {
    const waitingServiceWorker = registration.waiting

    if (waitingServiceWorker) {
      waitingServiceWorker.addEventListener('statechange', (event) => {
        if (event.target.state === 'activated') {
          window.location.reload()
        }
      })
      waitingServiceWorker.postMessage({ type: 'SKIP_WAITING' })
    }
  },
})
