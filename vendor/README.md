# Vendor Policy

This folder is reserved for upstream source that should stay clearly separate from project-authored content and site code.

## Lab Policy

For this project, Concord's `lab` runtime should live under `vendor/lab/` when it is imported.

Use `vendor/lab/` only for one of these cases:

- a pinned upstream source checkout
- a pinned upstream release artifact
- documented local patches to that upstream runtime

## Recording The Pin

When Lab is imported, fill in `vendor/lab/VERSION.md` with:

- source URL
- artifact type
- tag
- commit
- import date
- whether local patches exist

If local patches are ever needed, document them in `vendor/lab/PATCHES.md`.

## Practical Rule

Do not put project lesson content, authored simulations, or site-specific wrapper code in `vendor/`.