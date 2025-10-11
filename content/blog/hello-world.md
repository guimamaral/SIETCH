---
title: "Designing the SIETCH playground"
summary: "A look behind the scenes at the visual system, motion details, and content pipeline powering the new personal website."
publishedAt: "2024-07-12"
tags:
  - next.js
  - tailwind
  - motion
---

Welcome to the very first post on the SIETCH blog! This space captures the experiments and learnings that go into shipping a whimsical yet practical personal site.

## Why markdown?

Authoring posts in Markdown keeps friction low. I can draft entries in my editor, commit to Git, and let the Next.js build handle the rest. Paired with a sprinkle of front matter, each file encodes metadata like publish date, summary, and tags.

## Motion as personality

The rotating frog mascot is a gentle nod to the playful energy that inspired this project. CSS handles the animation, so performance stays snappy even on slower devices. A reduced motion media query makes sure accessibility stays front and center.

## What comes next

Future updates will explore integrating MDX for interactive code demos, adding RSS support, and automating deployments. Until then, thanks for visiting — see you in the changelog!
