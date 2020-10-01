'use strict'

import { app, Menu } from 'electron'
import config from './config'

const isDarwin = process.platform === 'darwin'

const macosTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: ' Preferences',
        click() {
          config.openInEditor()
        },
      },
    ],
  },
  {
    role: 'editMenu'
  },
  {
    role: 'viewMenu'
  }
]

const otherTemplate = [
  {
    role: 'fileMenu'
  },
  {
    role: 'editMenu',
  },
  {
    role: 'viewMenu'
  }
]

if (isDarwin) macosTemplate.unshift({
  label: app.getName(),
})

const template = (isDarwin) ? macosTemplate : otherTemplate

export default Menu.buildFromTemplate(template)