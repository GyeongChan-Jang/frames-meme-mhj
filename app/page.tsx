import { getFrameMetadata } from "frog/next";
import type { Metadata } from "next";
import Image from "next/image";

import styles from "./page.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const frameTags = await getFrameMetadata(
    `${process.env.VERCEL_URL || "http://localhost:3000"}/api`
  );
  return {
    other: frameTags,
  };
}

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <p>
            Head to{" "}
            <a
              href="/api/dev"
              style={{ display: "inline", fontWeight: "semibold" }}
            >
              <code className={styles.code}>localhost:3000/api</code>
            </a>{" "}
            for your frame endpoint.
          </p>
        </div>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
          }}
        >
          <h1>민희진 Meme Generator</h1>
          <h2>
            by <span style={{ color: "sky-blue" }}>@eidos</span>
          </h2>
        </div>
      </div>

      <div className={styles.grid}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            GitHub <span>-&gt;</span>
          </h2>
          <p>View the source code</p>
        </a>

        <a
          href="https://frog.fm/"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Frog.fm <span>-&gt;</span>
          </h2>
          <p>Built with Frog.fm</p>
        </a>
      </div>
    </main>
  );
}
