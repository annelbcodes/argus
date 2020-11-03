'use strict'

import { app, Menu } from 'electron'

let isDev = (process.env.WEBPACK_DEV_SERVER_URL) ? true : false

const isDarwin = process.platform === 'darwin'

const macosTemplate = [
  {
    role: 'fileMenu',
  },
  {
    role: 'editMenu'
  },
  {
    role: 'helpMenu'
  }
]

const otherTemplate = [
  {
    role: 'fileMenu'
  },
  {
    role: 'editMenu',
  },
]

if (isDarwin) macosTemplate.unshift({
  label: app.getName(),
})

const template = (isDarwin) ? macosTemplate : otherTemplate

export default Menu.buildFromTemplate(template)