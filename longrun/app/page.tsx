import { Header } from "./components/header";
import { Hero } from "./components/hero";
import { Direction, Footer, Problem, Research, WorkWithUs } from "./components/sections";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Problem />
        <Research />
        <Direction />
        <WorkWithUs />
      </main>
      <Footer />
    </>
  );
}
