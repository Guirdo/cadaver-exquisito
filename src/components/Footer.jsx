import { A } from '@solidjs/router'
import { t } from '../i18n'

export default function Footer() {
  return (
    <footer class="[ flex-column ] [ fs-xs gap-xs w-100 p-xs ]">
      <div class="[ flex-row ] [ flex-wrap justify-content-evenly gap-xs ]">
      <a
        class="color-inherit"
        href="https://ko-fi.com/guirdo"
        target="_blank"
      >
        {t('links.donate')}
      </a>
      <A
        class='color-inherit'
        href="/credits"
      >
        {t('footer.credits')}
      </A>

        <p>
          {t('footer.madeBy')} <a href="https://dev.guirdo.xyz" target="_blank">Guirdo</a>
        </p>
      </div>
      <small class="text-align-center">{t('footer.disclaimer')}</small>
    </footer>
  )
}