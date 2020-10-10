'use strict'

import { app, Menu, BrowserWindow, ipcRenderer, ipcMain } from 'electron'
import config from './config'

let isDev = (process.env.WEBPACK_DEV_SERVER_URL) ? true : false

let popupPref

function openPopupPref() {

  popupPref = new BrowserWindow({
    parent: global.win,
    modal: true,
    show: false,
    resizable: false,
    maximizable: false,
    minimizable: false,
    height: 300,
    width: 540,
    backgroundColor: '#272735',
    title: 'Preferences',
  })

  if (isDev) {
    popupPref.loadURL(process.env.WEBPACK_DEV_SERVER_URL+'#preferences')
  }
  else {
    popupPref.loadURL('app://./index.html#preferences')
  }

  popupPref.once('ready-to-show', (e) => {
    popupPref.show()
    global.win.show()
    popupPref.focus()
  })

  popupPref.on('closed', () => { popupPref = null })

  ipcMain.on('POPUP_CLOSE', (e, a) => {
    popupPref.hide()
  })
}

const isDarwin = process.platform === 'darwin'

const macosTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: ' Preferences',
        click(menuItem, BrowserWindow, event) {
          openPopupPref()
        },
      },
    ],
  },
  {
    role: 'editMenu'
  },
  {
    role: 'viewMenu'
  },
  {
    role: 'windowMenu'
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
  {
    role: 'viewMenu'
  }
]

if (isDarwin) macosTemplate.unshift({
  label: app.getName(),
})

const template = (isDarwin) ? macosTemplate : otherTemplate

export default Menu.buildFromTemplate(template)