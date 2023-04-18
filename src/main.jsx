import { render } from 'solid-js/web'
import './styles/global.css'
import App from './App'
import { Router } from '@solidjs/router'
import { I18nContext } from '@solid-primitives/i18n'
import { i18nContext } from './i18n'

render(() => (
  <Router>
    <I18nContext.Provider value={i18nContext}>
      <App />
    </I18nContext.Provider>
  </Router>
), document.getElementById('app'))