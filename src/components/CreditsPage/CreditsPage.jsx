import { t } from '../../i18n'

export default function CreditPage() {
  return (
    <div class="[ flex-column ] [ gap-lg p-md ]">
      <h1>{t('credits.title')}</h1>

      <h2>{t('credits.soundEffects')}</h2>
      <ul>
        <li>
          <p><a href="https://freesound.org/s/188034/" target="_blank" rel="noopener noreferrer">Bones 2 by AntumDeluge</a> -- <a href="https://creativecommons.org/publicdomain/zero/1.0/" target="_blank" rel="noopener noreferrer">License: Creative Commons 0</a></p>
        </li>
        <li>
          <p><a href="https://freesound.org/s/381859/" target="_blank" rel="noopener noreferrer">Skeleton bones (game).wav by cribbler</a> -- <a href="https://creativecommons.org/publicdomain/zero/1.0/" target="_blank" rel="noopener noreferrer">License: Creative Commons 0</a></p>
        </li>
      </ul>
    </div>
  )
}
