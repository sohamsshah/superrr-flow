# Setup and fresh-install rehearsal

## Prerequisites

- Switch Console/server compatible with the v1 template language and room follow-ups (0.31 or newer). Record the actual tested Console/server versions in verification.md; no specific release is certified by this repository yet.
- A machine online in Switch, with Codex (or the provider you select) installed and signed in. Each agent gets a separate folder under Switch's managed agents directory.
- Existing Discord and Slack bridges able to create the configured channels. Bridge selection does not authorize or install a chat app.
- Your Discord and Slack identities linked to the installing Switch user, so `{$creator}` resolves on both platforms.
- Agent management enabled if provisioning managed agents. Console/provider behavior differs by installed version; a preview or run error must be resolved before testing.
- Google Workspace connected for writing on that server. An operator may first need to configure its Google OAuth app. Only bug-agent gets the grant. Everyone installing supplies their own connection; OAuth secrets are not part of this repo.

## Import

Import templates/customer-triage.template.yaml from the Templates page. Pick an unused prefix such as `repro-a`. Pick the actual Discord and Slack bridges by their display names and your online machine/location. Verify the resolved agent directories are distinct. Review all three agents and rooms before creation.

This creates fresh resources. It does not export, migrate, or update the current agents. It never requests changes to daily-updates.

After creation, inspect all three kickoff replies. Room provisioning and model-driven tracker initialization are separate steps. Intake's kickoff may run before all rooms are visible; if it reports a missing destination, ask it to resolve destinations again after the run completes. If a partial import fails, inspect what exists before retrying; do not assume rollback or duplicate prevention on your installed version.

## Initialization and addressing

1. In Discord, post `!follow-ups on`, then `!assign-agent @repro-a-intake` (substitute the prefix).
2. Ask intake to confirm its routing ledger and membership in all three rooms.
3. Bug-agent must return a Google Sheet ID/URL and verified headers, with an agent-owned bug-tracker-pointer room document. If tool access was added after the agent session started, stop that session and start another before retrying. It should reuse any existing Sheet ID.
4. Feature-agent must confirm an agent-owned feature-tracker room document.
5. Specialists use `owner-agents`: the installer and their intake agent can address them. Other teammates need an explicit owner-approved addressing change. Do not interpret their ignored messages as successful updates.

The template does not pre-create tracker documents: their specialist creates them so the specialist owns and can edit them. Room document ownership is significant in Switch.

## First test

Post the bug and feature messages in demo/acceptance.md as the linked installing user. Inspect the actual Slack handoff and tracker write, not just the customer acknowledgement. The source tuple must be preserved and the destination thread tuple must be distinct. Record IDs in your private evidence, not in a public export of real customer records.

## If an agent stalls

- Read the source and destination threads for permission requests or errors.
- Use `!agents-status` and `!list-agents` in the affected room.
- Verify the selected machine is online and the provider session is live.
- Check memberships: intake in all three rooms, each specialist in its own Slack room.
- Check the specialist admits its owner's intake agent.
- Ask for the last attempted tool, its actual result, and the pending step. A narrated plan is not a delivered handoff.
- For Sheets, inspect the grant and exact API error; do not silently fall back to a room document.
- No timer or unattended monitoring is installed by this template.

## Demonstrating source-thread updates

As the installer, address the specialist in the Slack case thread: ask it to record a supplied factual status and send a specific customer-safe update to the original Discord thread. The specialist targets intake in Slack; intake posts in Discord and returns a delivery receipt. Merely editing a Sheet cell does not trigger this workflow.

## Local versus hosted

GitHub hosts these files. Switch and the agents run on the installing team's machines. Reproduction uses their own accounts, channels, and Sheet; it does not connect to your laptop. A hosted demonstration is optional and needs a running server plus online agent host. This repository does not deploy either or claim a public staging URL.

## Matching the current installation

Before calling this an export of your existing workflow, capture each live room as a template and compare its instructions, memberships, grants and documents with this package. Keep raw exports in ignored exports-private/ until sanitized. Captures name existing agents and may contain full private document text; they are not portable or public-safe by default. Only the bug agent's local standing instructions were inspected here; they are not a complete server export.

The new Sheet intentionally has its own schema and a fresh ID. It does not replace or migrate the existing Sheet. The existing local instructions use original source IDs for deduplication and a hidden Slack root column; this package retains those concepts as explicit Case Key and Slack reference columns.

## Offline check with Switch itself

If you have Switch's bundled core Python environment, run scripts/check-with-switch.py with that Python interpreter. On the inspected Windows installation the relative location below APPDATA was:

```powershell
& "$env:APPDATA\switchdash\local-switch-server\native\switch-core\0.31.0\venv\Scripts\python.exe" scripts/check-with-switch.py
```

Your version/path may differ. This invokes installed Switch code without starting the server. It checks lint findings, agent slot extraction, compilation of the room portion, and the native group schema. It cannot check permissions, connected accounts, provisioning or message delivery while the server is offline.
