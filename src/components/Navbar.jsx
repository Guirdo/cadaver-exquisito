import { A } from "@solidjs/router";
import settingsIcon from '/icons/settings.svg'
import { setUI } from "../stores/ui";

export default function Navbar() {
  return (
    <nav className="[ flex-row ] [ bg-primary color-white align-items-center p-sm ]">
      <div className="[ flex-row ] [ flex-grow align-items-center gap-xxs ]">
        <figure class="w-2rem">
          <img
            src="/icons/skull.webp"
          />
        </figure>
        <h1 className="text-align-center xs-fs-lg">
          <A
            class="text-dec-none color-inherit"
            href="/"
          >
            Cadáver exquisito
          </A>
        </h1>
        <figure class="w-2rem">
          <img
            src="/icons/wine.webp"
          />
        </figure>
      </div>
      <button
        className="button border-none" 
        data-type="primary"
        onClick={() => setUI('openSettings', true)
      }
      >
        <img src={settingsIcon} height={24} />
      </button>
    </nav>
  )
}
