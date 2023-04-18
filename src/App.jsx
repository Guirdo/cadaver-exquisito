import { Route, Routes } from "@solidjs/router";
import HomePage from "./components/HomePage/HomePage";
import Navbar from "./components/Navbar";
import Playground from "./components/Playground/Playground";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div class="[ flex-column ] [ min-hv-100 ]">
      <header>
        <Navbar />
      </header>
      <main class="[ flex-column ] [ flex-grow-2 ]">
        <Routes>
          <Route path="/" element={HomePage} />
          <Route path="/:id" element={Playground} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
