import { FEATURE_FLAGS as featureFlags } from 'utils/constants'

/**
 * @function registerChild
 * @description Returns a boolean based on an code overide, query string
 *              override, or manifest value. If nothing matches returns false.
 * @param {string} featureFlag
 * @param {boolean} override
 */
const featureService = (featureFlag, override) => {
  const urlParams = new URLSearchParams(window.location.search)

  if (override !== undefined) return override
  if (urlParams.has(featureFlag)) return urlParams.get(featureFlag)
  if (featureFlag in featureFlags) return featureFlags[featureFlag]

  return false
}

export default featureService
