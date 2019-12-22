import naturalSort from 'natural-sort'

export const naturalSortByAscending = (collection, prop) => (
  collection
    ? collection.concat().sort((a, b) => (naturalSort()(a[prop], b[prop])))
    : collection
)

export const naturalSortByDescending = (collection, prop) => (
  collection
    ? collection.concat().sort((a, b) => (naturalSort()(a[prop], b[prop]))).reverse()
    : collection.reverse()
)
