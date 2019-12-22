export const toGlobalId = (type, id) => (
  window.btoa(`${type}:${id}`)
)
