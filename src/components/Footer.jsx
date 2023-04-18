import { useI18n } from "@solid-primitives/i18n"

function ChangeLangMenu() {
  const [t, { locale }] = useI18n()

  const handleChange = (e) => {
    const lang = e.target.value
    locale(lang)  
  }

  return (
    <form>
      <label>{t('footer.changeLang')} </label>
      <select onChange={handleChange}>
        <option value="es">
          {t('footer.spanish')}
        </option>
        <option value="en">
          {t('footer.english')}
        </option>
      </select>
    </form>
  )
}

export default function Footer() {
  const [t] = useI18n()

  return (
    <footer class="[ flex-column ] [ fs-sm gap-xs align-items-center p-xs ]">
      <ChangeLangMenu />
      <p>
        {t('footer.madeBy')} <a href="https://guirdo.xyz">Guirdo</a>
      </p>
    </footer>
  )
}