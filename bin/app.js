#! /usr/bin/env node
'use strict'
import main from '../main'

// Pass configuration to application
main({
  port: 8000,
  host: 'localhost'
})
