"use server";
import React from "react";
import Link from "next/link";

export default async function AboutOlly() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-sky-300 via-sky-200 to-sky-100 px-6 py-10 pt-[5rem]">
      <article className="relative z-10 w-full max-w-4xl rounded-3xl bg-blue-900/90 p-12 text-white shadow-2xl ring-4 ring-white/30 backdrop-blur-xl sm:p-16 md:p-20">
        <h1 className="mb-10 text-center text-5xl font-extrabold tracking-tight text-gray-100 drop-shadow-md">
          About&nbsp;Olly
        </h1>

        <div className="prose prose-invert w-full prose-headings:text-gray-100 prose-a:text-gray-100 prose-a:hover:text-sky-200 prose-strong:text-sky-200">
          <h2>What is Olly&nbsp;?</h2>
          <p>
            An <strong>Olly</strong> is a small device that displays the time,
            weather, departure times of nearby trains, and messages sent from
            friends. It is accompanied by this website, which includes a suite
            of tooling for Olly owners to manage their devices and a messaging
            system for friends of Olly users.
          </p>

          <h2>Why is Olly?</h2>
          <p>
            <strong>Olly</strong> is a small gift for my girlfriend Aliana, for
            whom it is named, upon her arrival in NYC from DC. I hope this makes
            it a little easier to choose between Marcy Ave and Bedford Ave
            stations on busy mornings in Williamsburg 😊.
          </p>

          <h2>How is olly?</h2>
          <ul>
            <li>
              Olly is built with{" "}
              <Link
                href="https://nextjs.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Next.js
              </Link>{" "}
              and{" "}
              <Link
                href="https://sst.dev/docs/"
                target="_blank"
                rel="noopener noreferrer"
              >
                SST
              </Link>
              .
            </li>
            <li>
              Hosted fully serverless on{" "}
              <Link
                href="https://aws.amazon.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                AWS
              </Link>
            </li>
            <ul>
              <li>Cloudfront, Lambda, Lambda@Edge, Dynamo, s3, Route53, etc</li>
              <li>
                ~ 60¢ / month at low user volumes, mostly for the custom domain
              </li>
            </ul>
            <li>
              Accessed via devices built with{" "}
              <Link
                href="https://www.raspberrypi.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                raspberry pi
              </Link>
              .
            </li>

            <li>
              User auth with <Link href="https://authjs.dev/">Auth.js</Link> +
              Google auth
            </li>
          </ul>
          <p>
            {" "}
            If any of those things interest you, please check out the{" "}
            <Link
              href="https://github.com/logantonra/olly"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github repo
            </Link>{" "}
            for this project or shoot me an email at logantonra@gmail.com .
          </p>

          <p className="mb-[-0.3rem] mt-14 text-center text-xs opacity-80">
            Built in New York, NY by Logan Tonra; June 2025
          </p>
        </div>
      </article>
    </div>
  );
}
