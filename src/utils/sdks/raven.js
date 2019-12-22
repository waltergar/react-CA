/* eslint-disable no-undef */
// NOTE: Raven has been configured per https://docs.sentry.io/clients/javascript/config/
// NOTE: __COMMIT_HASH__ is replaced via a custom webpack plugin, with git commit SHA
import Raven from 'raven-js'
import { SENTRY_KEY, SENTRY_ENV } from 'utils/constants'

const sentryConfig = {
  release: 1,
  environment: SENTRY_ENV,
}

const bootstrapRaven = (render) => {
  if (SENTRY_KEY && SENTRY_KEY.length) {
    Raven.config(SENTRY_KEY, sentryConfig).install()
    if (render) return Raven.context(() => render)
  }

  return render
}

export default bootstrapRaven
