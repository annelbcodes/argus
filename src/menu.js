'use strict'

import { app, Menu } from 'electron'
import {
  is,
  appMenu,
  openUrlMenuItem,
  showAboutWindow,
} from 'electron-util'

import path from 'path'

const isDarwin = process.platform === 'darwin'

const helpSubmenu = [
	openUrlMenuItem({
		label: 'Source Code',
		url: 'https://github.com/justanne/eyesonpwn'
  }),
  {
    label: 'About',
    click() {
      showAboutWindow({
        icon: path.join(__dirname, 'fixtures/Icon.png'),
        title: 'About '+app.getName(),
        copyright: 'Made by Anne Barrios',
        text: 'This app is powered by HaveIBeenPwned.com',
        website: 'https://github.com/justanne/eyesonpwn',
      });
    }
  }
]

const macosTemplate = [
  appMenu(),
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
    role: 'help',
    submenu: helpSubmenu,
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
    role: 'viewMenu',
  },
  {
    role: 'help',
    submenu: helpSubmenu,
  },
]

// if (isDarwin) macosTemplate.unshift({
//   label: app.getName(),
// })

const template = (isDarwin) ? macosTemplate : otherTemplate

export default Menu.buildFromTemplate(template)