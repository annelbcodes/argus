'use strict'

import path from 'path'
import { app, shell, Menu } from 'electron'
import {
  is,
  appMenu,
  openUrlMenuItem,
  showAboutWindow,
} from 'electron-util'

const isDarwin = process.platform === 'darwin'

const helpSubmenu = [
	openUrlMenuItem({
		label: 'Source Code',
		url: 'https://github.com/annelbco/argus'
  }),
  {
    label: 'About',
    click() {
      showAboutWindow({
        icon: path.join(__dirname, 'fixtures/Icon.png'),
        title: 'About Argus',
        copyright: 'Made by Anne Barrios',
        text: 'This app is powered by HaveIBeenPwned.com',
        website: 'https://github.com/annelbco/argus',
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

const debugSubmenu = [
  {
    label: 'Show App Data',
    click() {
      shell.openPath(app.getPath('userData'))
    }
  },
  {
    type: 'separator'
  },
  {
    label: 'Delete App Data',
    click() {
      shell.moveItemToTrash(app.getPath('userData'))
      app.relaunch()
      app.quit()
    }
  }
]

if (is.development) {
	macosTemplate.push({
		label: 'Debug',
		submenu: debugSubmenu
	})
}

const template = (isDarwin) ? macosTemplate : otherTemplate

export default Menu.buildFromTemplate(template)