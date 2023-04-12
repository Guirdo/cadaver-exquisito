import { Route, Routes } from "@solidjs/router";
import HomePage from "./components/HomePage/HomePage";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={HomePage} />
        </Routes>
      </main>
    </div>
  )
}
