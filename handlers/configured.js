'use strict'

export default (opts) => {
  return (req, res) => {
    res.json({
      opts: opts
    })
  }
}
