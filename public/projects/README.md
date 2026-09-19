# Case-study screenshots

One folder per case study, named after its slug in `lib/projects.ts`.

To show screenshots on a case study:

1. Put the image files in `public/projects/<slug>/` (PNG or WebP, ideally 1600px wide or less).
2. List them on the project in `lib/projects.ts`:

```ts
screenshots: [
  { src: "/projects/<slug>/queue.png", alt: "Review queue with filters", caption: "The review queue" },
],
```

The case-study layout renders the `screenshots` array when it is present and renders nothing when it is not.

Before adding a screenshot of an employer system, remove or blur anything confidential: names, emails,
client and carrier names, internal URLs, money figures. Do not add mock-ups presented as real screens.
