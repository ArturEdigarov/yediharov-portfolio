import { NavBar, Welcome, Dock } from "#components"
import  Terminal from "#components/windows/Terminal.tsx";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable"
gsap.registerPlugin(Draggable);
const App = () => {
  return (
    <main>
      <NavBar />
      <Welcome />
      <Dock />

      <Terminal />
    </main>
  )
}

export default App