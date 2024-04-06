import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
};

export default function Page() {
  return (
    <div>
      <h1>About</h1>
      <Link href="/about/some">About Some</Link>
    </div>
  );
}
