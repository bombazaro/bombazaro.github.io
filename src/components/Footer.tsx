import { site } from '../data/content';

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        © 2026 {site.name} · {site.location}
      </div>
    </footer>
  );
}
