import { render } from 'solid-js/web'
import 'unfonts.css'
import './styles/global.css'
import App from './App'
import { Router } from '@solidjs/router'
import AppRouter from './router'

render(() => (
  <Router root={App}>
    <AppRouter />
  </Router>
), document.getElementById('app'))