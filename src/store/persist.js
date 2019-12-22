import storageSession from 'redux-persist/lib/storage/session'

export const persistConfig = {
  key: 'root',
  storage: storageSession,
  blacklist: ['createCard'],
}
