'use strict'
import simple from './handlers/simple'
import configured from './handlers/configured'

export default (app, opts) => {
  // Setup routes, middleware, and handlers
  app.get('/', simple)
  app.get('/configured', configured(opts))
}
