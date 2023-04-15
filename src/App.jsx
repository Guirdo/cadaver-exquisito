import { Route, Routes } from "@solidjs/router";
import HomePage from "./components/HomePage/HomePage";
import Navbar from "./components/Navbar";
import Playground from "./components/Playground/Playground";

export default function App() {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={HomePage} />
          <Route path="/:id" element={Playground} />
        </Routes>
      </main>
    </div>
  )
}
