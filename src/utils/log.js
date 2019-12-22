import Raven from 'raven-js'
import { LOG_LEVEL, SENTRY_ENV as ENV } from 'utils/constants'

/* eslint-disable no-console */
export const log = {
  /**
   * Wrapper for sending error messages to SENTRY, when SENTRY_ON envirnment variable is present.
   * @param {obj} payload - Payload containing the error context and any custom descriptors.
   * @return {null} Sends error to SENTRY, appending the MD5 hash for the relevant source maps.
   */
  sendToBackend: (payload, level) => {
    if (ENV !== 'local') Raven.captureException(payload.error, { level })
    return false
  },

  /**
   * Handle any errors under any LOG_LEVEL.
   * @param {object} payload - Payload containing the error context and any custom descriptors.
   * @return {null} Sends error to backend, and logs error to the window, using console.error()
   */
  error: (payload) => {
    if (LOG_LEVEL === 'error' || LOG_LEVEL === 'warn' || LOG_LEVEL === 'info' || LOG_LEVEL === 'debug') {
      log.sendToBackend(payload, 'error')
      console.error(payload.error)
    }
  },

  /**
   * Handle any warning statements when LOG_LEVEL is 'warn' OR 'info' OR 'debug'.
   * @param {object} payload - Payload containing warning context, and any custom descriptors.
   * @return {null} Sends warning to backend, and logs warning to the window, using console.warn()
   */
  warn: (payload) => {
    if (LOG_LEVEL === 'warn' || LOG_LEVEL === 'info' || LOG_LEVEL === 'debug') {
      log.sendToBackend(payload, 'warning')
      console.warn(payload.error)
    }
  },

  /**
   * Handle any info statements when LOG_LEVEL is 'info' OR 'debug'.
   * @param {object} payload - Payload containing the info context and any custom descriptors.
   * @return {null} Logs info to the window, utilizing console.info()
   */
  info: payload => ((LOG_LEVEL === 'info' || LOG_LEVEL === 'debug') ? console.info(payload) : ''),

  /**
   * Handle any debug statements when LOG_LEVEL is debug'.
   * @param {object} payload - Payload containing the debug context and any custom descriptors.
   * @return {null} Logs warning to the window, utilizing console.debug()
   */
  debug: payload => ((LOG_LEVEL === 'debug') ? console.debug(payload) : ''),
}

export default log
