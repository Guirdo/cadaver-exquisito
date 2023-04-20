import { useI18n } from "@solid-primitives/i18n"
import { locale as thisLocale,setLocale } from "../stores/locale"

function ChangeLangMenu() {
  const [t, { locale }] = useI18n()

  const handleChange = (e) => {
    const lang = e.target.value
    locale(lang)
    setLocale('lang',lang)
  }

  return (
    <form>
      <label>{t('footer.changeLang')} </label>
      <select onChange={handleChange}>
        <option
          value="es"
          selected={thisLocale.lang === 'es'}
        >
          {t('footer.spanish')}
        </option>
        <option
          value="en"
          selected={thisLocale.lang === 'en'}
        >
          {t('footer.english')}
        </option>
      </select>
    </form>
  )
}

export default function Footer() {
  const [t] = useI18n()

  return (
    <footer class="[ flex-column ] [ fs-xs gap-xs align-items-center p-xs ]">
      <ChangeLangMenu />
      <p>
        {t('footer.madeBy')} <a href="https://guirdo.xyz">Guirdo</a>
      </p>
    </footer>
  )
}