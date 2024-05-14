import { A } from "@solidjs/router"
import { t } from '../../i18n'

export default function NotFoundPage(){
  return(
    <div class="flex-column gap-sm mblock-auto">
      <p class="text-align-center">{t('error.pageNotFound')}</p>
      <A
        class="text-align-center"
        href="/"
      >
        {t('error.returnHome')}
      </A>
    </div>
  )
}
