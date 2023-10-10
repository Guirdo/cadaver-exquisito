import { useI18n } from "@solid-primitives/i18n"

function ImportantLinks() {
  const [t] = useI18n()
  return (
    <ul class="[ flex-row ] [ m-0 list-style-none flex-wrap ]">
      <li>
        <a
          class="color-inherit"
          href="https://ko-fi.com/guirdo"
          target="_blank"
        >
          {t('links.donate')}
        </a>
      </li>
    </ul>
  )
}

export default function Footer() {
  const [t] = useI18n()

  return (
    <footer class="[ flex-row ] [ flex-wrap fs-xs gap-xs w-100 justify-content-evenly p-xs ]">
      <ImportantLinks />

      <p>
        {t('footer.madeBy')} <a href="https://guirdo.xyz" target="_blank">Guirdo</a>
      </p>
    </footer>
  )
}