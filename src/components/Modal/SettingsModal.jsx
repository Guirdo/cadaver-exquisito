import Modal from "./Modal";
import { useI18n } from '@solid-primitives/i18n';
import { setSettings, settings } from "../../stores/settings";
import { setUI } from "../../stores/ui";

function ChangeLangMenu() {
  const [t, { locale }] = useI18n()

  const handleChange = (e) => {
    const lang = e.target.value
    locale(lang)
    setSettings('lang', lang)
    document.documentElement.setAttribute("lang", lang);
  }

  return (
    <div class="flex-row gap-xs">
      <label>{t('footer.changeLang')}</label>
      <select onChange={handleChange}>
        <option
          value="es"
          selected={settings.lang === 'es'}
        >
          {t('footer.spanish')}
        </option>
        <option
          value="en"
          selected={settings.lang === 'en'}
        >
          {t('footer.english')}
        </option>
      </select>
    </div>
  )
}

export default function SettingsModal() {
  const [t] = useI18n()

  return (
    <Modal>
      <h3 class="m-b-xs">{t('settings.title')}</h3>
      <form class="flex-column gap-xxs fs-sm m-b-xs ">
        <label>
          {t('settings.muteSound')}{' '}
          <input
            type="checkbox"
            checked={settings.muteSound}
            onInput={(e) => setSettings('muteSound', e.target.checked)}
          />
        </label>

        <div id="theme-picker" className="flex-row gap-sm">
          <p>{t('settings.theme')}: </p>
          <div className="flex-row gap-xs">
            <label>
              {t('settings.light')}{' '} 
              <input
                type="radio"
                name="theme"
                checked={settings.theme === 'light'}
                value="light"
                onInput={(e) => setSettings('theme', e.target.value)}
              />
            </label>
            <label>
            {t('settings.dark')}{' '} 
              <input
                type="radio"
                name="theme"
                checked={settings.theme === 'dark'}
                value="dark"
                onInput={(e) => setSettings('theme', e.target.value)}
              />
            </label>
          </div>
        </div>

        <ChangeLangMenu />
      </form>

      <button
        class="button w-100"
        data-type="success"
        onClick={() => setUI('openSettings', false)}
      >
        Ok
      </button>
    </Modal>
  )
}