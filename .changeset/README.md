# Changesets Workflow

This repository uses Changesets for versioning and package publishing in the pnpm workspace monorepo.

## Common Commands

- `pnpm changeset`
  - Create a changeset file for package changes that should be released.
- `pnpm changeset:status`
  - Inspect which packages will be versioned by the current pending changesets.
- `pnpm versioning`
  - Apply pending changesets to package versions and changelogs, then refresh the workspace lockfile.
- `pnpm release`
  - Publish the versioned packages to the configured npm registry.

## Suggested Release Flow

1. Merge package changes with at least one changeset file in `.changeset/`.
2. Run `pnpm changeset:status` to review the pending release surface.
3. Run `pnpm versioning` on the release branch.
4. Commit the version bumps and changelog updates.
5. Run `pnpm release` in a CI or authenticated release environment.

## GitHub Actions Release Behavior

- `changesets/action` opens or updates a versioning pull request when pending changesets exist.
- When the versioning pull request is merged to `main`, the workflow publishes packages and creates GitHub Releases.

## Current Release Surface

- `@makers/design-tokens`
- `@makers/ui`
