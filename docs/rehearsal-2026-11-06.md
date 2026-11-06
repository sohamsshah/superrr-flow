# Reproduction rehearsal — 2026-11-06

Status: paused after provisioning when the user stopped computer use while Discord was being opened. Do not infer unobserved behavioral tests passed.

- Download source: a fresh clone of https://github.com/sohamsshah/superrr-flow at commit 3c9db85.
- Import path: Switch Console → Templates → Import template → Choose file → downloaded templates/customer-triage.template.yaml → Import → save as Superrr Flow rehearsal → Use template.
- Prefix: repro-1106-a.
- Connections: existing Discord and Slack bridges; pre-existing Google Workspace connection.
- Provider and host: Codex, managed on DESKTOP-UOQILA4; separate Switch-managed folders.

## Findings

1. Console accepted the original YAML and previewed three agents and three rooms.
2. First provisioning attempt refused the entire run: `google-workspace: A Google Workspace grant is on or off: the agent reaches what your Google Workspace connection does. Leave out access and tools.` Console reported nothing created.
3. Corrected the Google Workspace grant from `{service: google-workspace, access: write}` to `google-workspace`. Its effective access inherits the already-connected account. Updated the static check to require this form.
4. Installed Switch linter and group compiler still pass after the correction.
5. Saved the corrected YAML through Console's template editor and retried with the same fresh prefix. Provisioning succeeded: the new intake, bug-agent, and feature-agent appear in Console, and the new Discord feedback room opened after creation.
6. Console displayed a misleading-looking local provider banner before creation, but managed provisioning selected DESKTOP-UOQILA4 and succeeded; no provider installation or sign-in change was needed during this rehearsal.

## Behavioral results

Tracker initialization, unmentioned Discord intake, Slack routing, source-thread updates, replay, and restart checks remain pending.

No existing workflow resources were intentionally changed. No credentials, real customer records, or the existing tracker ID are included in this report.
