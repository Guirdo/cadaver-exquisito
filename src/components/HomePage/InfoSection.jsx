import { t } from '../../i18n'

function SectionTemplate(props) {
  return (
    <section class="border-1">
      <div class="w-100 p-xs bg-primary color-white">
        <h2>{t(props.title)}</h2>
      </div>
      <div>
        <div class="[ flex-column ] [ gap-xs fs-sm p-sm ]">
          {props.children}
        </div>
      </div>
    </section>
  )
}


export default function InfoSection() {
  return (
    <div class="[ grid-info-section ] [ gap-md align-items-start w-100 ]">
      <SectionTemplate title='homePage.about'>
        <p>{t('homePage.description1')}</p>
        <p>{t('homePage.description2')}</p>
      </SectionTemplate>
    </div>
  )
}