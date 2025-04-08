import Image from "next/image";
import "./page.scss";
import Link from "next/link";

const block = "page";
export default function Page() {
  return (
    <div className={block}>
      Biketorial
      <Link href="/builder">Builder</Link>
    </div>
  );
}
