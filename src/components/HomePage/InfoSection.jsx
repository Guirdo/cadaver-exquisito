import { t } from '../../i18n'

export default function InfoSection() {
  return (
    <div class="[ flex-row ] [ flex-wrap fs-sm ]">
      <details class="w-28ch">
        <summary>{t('homePage.about')}</summary>
        <div class="[ flex-column ] [ gap-xs ]">
          <p>{t('homePage.description1')}</p>
          <p>{t('homePage.description2')}</p>
        </div>
      </details>
    </div>
  )
}