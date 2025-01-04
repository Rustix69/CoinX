"use client";
import { cn } from "@/lib/utils";
import './App.css'
import GridPattern from './components/ui/grid-pattern'
import Header from './Header'
import Footer from "./Footer";
import Landing from "./Landing";

function App() {

  return (
    <>
      <div>

        {/* Website Background */}
        <GridPattern
          width={30}
          height={30}
          x={-1}
          y={-1}
          strokeDasharray={"4 2"}
          className={cn(
            "[mask-image:radial-gradient(900px_circle_at_center,white,transparent)]",
          )}
        />

        {/* Webstie Header */}
        <Header />

        {/* Website Hero Section */}
        <Landing />

        {/* Website Footer */}
        <Footer />
      </div>
    </>
  )
}

export default App
