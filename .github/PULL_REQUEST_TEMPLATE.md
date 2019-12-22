# What changed and why?

_Replace with the link to the trello ticket_

_Replace with explanation of what changed and why those changes were necessary_

# Dependencies Introduced or Upgraded: (if applicable)

_Replace with the list of package(s) and version_

# Contributor Checklist

## General

- [ ] Reviewer is assigned on Github
- [ ] Connected backend PRs are referenced in the description section
- [ ] Label `Merge Dependency` has been set on this PR if there are merge dependencies

## Core Components

- [ ] Does the code update or remove any Core components?
  - [ ] Label `Core Component Change` has been set on this PR
  - [ ] Does this code look good in all relevant experiences?
  - [ ] Are changes backwards compatible?

## New Dependencies

- [ ] Does the new code introduce any dependencies?
  - [ ] The added dependency is an active project with frequent updates.
  - [ ] The added dependency has thorough unit test coverage.
  - [ ] The added dependency has a substantial number of JavaScript community users.

# Reviewer Checklist

- [ ] Verified branch name and commit messages follow conventions
- [ ] Verified the presence of snapshot tests and unit tests
- [ ] Marked PR as "approved"
