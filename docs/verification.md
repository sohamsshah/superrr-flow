# Verification report

## Current status

This package is a reconstruction of the requested workflow. A local bug-agent AGENTS.md was inspected and confirms instructions to use a Google Sheet, deduplicate by original Discord room/message IDs, and preserve Slack discussion roots. Its real Sheet ID and customer records are deliberately excluded. The intake and feature folders contained no comparable standing-instruction files. The original running server configuration and actual spreadsheet contents have not been inspected. The initial sandbox health probe failed; during the later rehearsal a probe outside the sandbox confirmed the local Switch API was healthy. See rehearsal-2026-11-06.md for the live provisioning results and the point where testing stopped.

| Check | Status | Evidence |
| --- | --- | --- |
| Public template language and example inspected | Checked | See sources.md for the upstream revision |
| YAML parsing and static configuration validation | PASS | npm run validate: topology, inputs, folders, memberships, connector assignment and kickoff targets |
| Installed Switch 0.31.0 template linter | PASS | Zero errors and zero warnings from lint_template |
| Installed Switch room compiler and group schema | PASS | Three agent slots compiled; GroupTemplateDocument accepted three rooms and four links |
| Import into Switch Console | PASS | YAML from a fresh GitHub clone was imported as Superrr Flow rehearsal |
| Provision with fresh prefix | PASS after connector-grant correction | Prefix repro-1106-a; initial access override rejected with nothing created. Service-only grant retry succeeded |
| Three agents and three rooms provisioned | PASS | Fresh repro-1106-a agents listed in Console; feedback room opened after group creation on DESKTOP-UOQILA4 |
| Google Sheet creation and verified write | NOT RUN | Instructions prepared; no Google operation executed |
| Unmentioned Discord bug → Slack → Sheet | NOT RUN | See acceptance scenario 1 |
| Feature → Slack → room tracker | NOT RUN | See acceptance scenario 2 |
| Customer update in original Discord thread | NOT RUN | See acceptance scenario 5 |
| Replay and fresh-session retrieval | NOT RUN | Best-effort behavior must be observed |
| GitHub publication | Published | https://github.com/sohamsshah/superrr-flow; publication does not establish runtime verification |

Static checks were executed on 2026-11-06 using Node v22.22.0 and Switch's bundled Python environment under the installed 0.31.0 directory. They do not prove provisioning, channel creation, agent responses, or Google API behavior. The npm YAML dependency was installed with scripts disabled. See package-lock.json for its integrity pin.

## Record a rehearsal

- Date/time:
- Source commit:
- Switch Console version:
- Switch server version:
- Agent provider/version/model:
- Prefix:
- Discord/Slack connection setup completed:
- Google Workspace write grant verified:
- Import result and any warnings:
- Tracker initialization result:
- Scenarios passed/failed:
- Evidence links:
- Remaining limitations:

Do not mark live checks passed based on YAML parsing, a model's plan, or an acknowledgement alone.
