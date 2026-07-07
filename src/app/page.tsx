import Container from "react-bootstrap/Container";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

const NAV_LINKS = [
  { label: "Members", href: "/members" },
  { label: "Music Player", href: "http://lprk.co/music" },
  { label: "Store", href: "https://store.linkinpark.com/" },
  { label: "LPU", href: "https://www.lpunderground.com/" },
  { label: "Tabs", href: "https://www.linkinparkguitar.com/tabs.htm" },
  { label: "Music for Relief", href: "http://musicforrelief.org/our-story/" },
];

export default function Home() {
  return (
    <>
      <SiteHeader links={NAV_LINKS} />

      <main className="w-100 px-3">
        <Container as="article" className="mb-5 pb-4" style={{ maxWidth: 700 }}>
          <h1 className="glow-lg text-decoration-underline mb-3">
            Projekt Revolution, Camden
          </h1>
          <p className="glow-sm" style={{ color: "rgb(174, 214, 214)" }}>
            Check out our performance of Breaking The Habit on Camden, New
            Jersey{" "}
            <a
              href="https://lplive.net/shows/2004/20040803"
              className="glow-hover text-brand"
            >
              (show details)
            </a>
            . Find more tickets for Projekt Revolution{" "}
            <a href="#" className="glow-hover text-brand">
              right here
            </a>
            .
          </p>
          <div className="ratio" style={{ ["--bs-aspect-ratio" as string]: "62.88%" }}>
            <iframe
              src="https://www.youtube.com/embed/oRb-v-OwNuA"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Breaking The Habit — Projekt Revolution, Camden"
            />
          </div>
        </Container>

        <Container as="article" className="mb-5 pb-4" style={{ maxWidth: 700 }}>
          <h1 className="glow-lg text-decoration-underline mb-3">
            Collision Course DVD
          </h1>
          <p className="glow-sm" style={{ color: "rgb(174, 214, 214)" }}>
            Check out Collision Course, behind the scenes.
          </p>
          <div className="ratio" style={{ ["--bs-aspect-ratio" as string]: "62.88%" }}>
            <iframe
              src="https://www.youtube.com/embed/BhfeJrkROpw"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Collision Course DVD — behind the scenes"
            />
          </div>
        </Container>
      </main>

      <SiteFooter />
    </>
  );
}
