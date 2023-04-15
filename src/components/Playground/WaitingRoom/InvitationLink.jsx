import { useLocation } from "@solidjs/router"

export default function InvitationLink() {
  const location = useLocation()

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location)
      .then(() => {
        alert('¡Copiado!');
      })
      .catch(err => {
        alert("Perdón, no funciona en tu navegador");
      });
  }
  return (
    <div class="flex-column gap-xs">
      <p class="text-align-center">Invita a tus amigos</p>

      <div class="flex-column">

        <input
          class="p-xs fs-sm"
          readOnly
          value={window.location}
        />
        <button
          class="button"
          onClick={handleCopy}
        >
          Copiar
        </button>
      </div>
    </div>
  )
}
