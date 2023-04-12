import { render } from 'solid-js/web'
import './styles/global.css'
import App from './App'
import { Router } from '@solidjs/router'

render(() => (
  <Router>
    <App />
  </Router>
), document.getElementById('app'))