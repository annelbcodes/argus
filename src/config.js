'use strict'

import Config from 'electron-store'

const schema = {
    hibpKey: {
      type: 'string',
  },
}

const AppConfig = new Config({ schema })

export default AppConfig