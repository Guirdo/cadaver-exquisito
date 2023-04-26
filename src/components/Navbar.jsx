import { A } from "@solidjs/router";

export default function Navbar() {
  return (
    <nav className="[ flex-row ] [ bg-primary color-white gap-xxs align-items-center justify-content-center p-block-sm ]">
      <figure class="w-2rem">
        <img
          src="/icons/skull.webp"
        />
      </figure>
      <h1 className="text-align-center">
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
    </nav>
  )
}
