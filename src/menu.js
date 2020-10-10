'use strict'

import { app, Menu, BrowserWindow, ipcRenderer, ipcMain } from 'electron'
import path from 'path'
import config from './config'

let isDev = (process.env.WEBPACK_DEV_SERVER_URL) ? true : false

let popupPref

function openPopupPref() {

  popupPref = new BrowserWindow({
    parent: global.win,
    modal: true,
    close: true,
    height: 350,
    width: 400,
    backgroundColor: '#272735',
    title: 'Preferences',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    }
  })

  if (isDev) {
    popupPref.loadURL(process.env.WEBPACK_DEV_SERVER_URL+'#preferences')
  }
  else {
    popupPref.loadURL('app://./index.html#preferences')
  }

  popupPref.once('ready-to-show', (e) => {
    popupPref.open()
    global.win.show()
    popupPref.focus()
  })

  ipcMain.on('POPUP_CLOSE', (e, a) => {
    popupPref.webContents.closeDevTools()
    popupPref.close()
  })

  popupPref.on('closed', () => {
    popupPref = null
  })
}

const isDarwin = process.platform === 'darwin'

const macosTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: ' Preferences',
        accelerator: 'Command+,',
        click() {
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