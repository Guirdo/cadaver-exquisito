import Modal from "./Modal";
import { useI18n } from '@solid-primitives/i18n';
import { setSettings, settings } from "../../stores/settings";
import { setUI } from "../../stores/ui";

export default function SettingsModal() {
  const [t] = useI18n()

  return (
    <Modal>
      <h3>{t('settings.title')}</h3>
      <form>
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
      </form>

      <button
        className="button"
        data-type="success"
        onClick={() => setUI('openSettings', false)}
      >
        Ok
      </button>
    </Modal>
  )
}