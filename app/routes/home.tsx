import { Link } from "react-router";
import type { Route } from "./+types/home";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Hélio's New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div>
      <div>
        <div>
          <div>
            <div>
              <h1>
                <span>Explore Celestial Bodies with </span>
                <span>Space Odyssey</span>
              </h1>
              <p>
              Travel through space and time. Learn about the planets, stars, and galaxies that make up our universe.
              </p>
              <div>
                <Link to="universe">Explore Now</Link>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
