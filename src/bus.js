'use strict'

import { ipcMain } from 'electron'
import config from './config'

ipcMain.on('requestStoreValue', (e,v) => {
  e.sender.send('replyStoreValue', config.get(v));
})


