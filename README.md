# Switch Customer Triage

A native Switch workflow: a customer posts in Discord, intake classifies the message, and a specialist receives a targeted handoff in Slack. Bugs are tracked in Google Sheets; feature requests are tracked in a Switch room document. Original customer room, message, and thread references travel with every handoff.

**Status: packaged reconstruction; Switch's installed offline checks pass; live import is not yet verified.** This repository was reconstructed from the agreed workflow, with the bug agent's local standing instructions inspected for comparison. It is not an export of the running server configuration. See [verification status](docs/verification.md).

## What you download

[`templates/customer-triage.template.yaml`](templates/customer-triage.template.yaml) is the implementation. It embeds the agent instructions and creates:

| Resource | Default name | Purpose |
| --- | --- | --- |
| Discord room | `triage-demo-customer-feedback` | Customer intake and source-thread updates |
| Slack room | `triage-demo-customer-bugs` | Bug discussion and Sheet pointer |
| Slack room | `triage-demo-customer-features` | Feature discussion and room tracker |
| Agent | `triage-demo-intake` | Classification, routing, customer replies |
| Agent | `triage-demo-bug-agent` | Bug records in a new Google Sheet |
| Agent | `triage-demo-feature-agent` | Feature records in its own room document |

The `team` field controls the prefix. Fresh names protect the existing `customer-feedback`, `customer-bugs`, `customer-features`, and `daily-updates` setup. This template does not edit those resources.

## Run it

1. Install Switch Console and a supported provider. The template defaults to **Codex**; sign into it on the selected machine.
2. Connect Discord and Slack, link your user accounts on both, and ensure the bridges can create channels. Connect **Google Workspace with write access**. These account authorizations cannot be supplied by a public repository.
3. Import the YAML in **Switch Console → Templates → Import template**.
4. Select your machine/location and the actual Discord and Slack bridges. Review the preview: three agents, three rooms, separate managed folders, and a Google Workspace grant only for the bug agent.
5. Run the template. Read the kickoff replies. The bug agent must return a real Sheet URL and verify its headers by reading them back. Intake and the feature agent must each create their own room document. A kickoff failure is a setup failure, not a passing test.
6. In the new Discord channel, enable unmentioned customer intake by posting these two commands as separate messages, substituting your prefix:

   ```text
   !follow-ups on
   !assign-agent @triage-demo-intake
   ```

   This is an explicit post-install step; the template does not declare these settings automatically.
7. Run [the acceptance scenarios](demo/acceptance.md). Record actual results in [the verification report](docs/verification.md).

Full prerequisites and troubleshooting: [setup guide](docs/setup.md).

## What is and is not automatic

After account connections and template inputs, Switch is intended to provision the agents and rooms. Kickoff instructions ask the agents to initialize the trackers. Agent behavior is model-driven and must be verified live. Sheet creation is an agent operation, not a declarative resource guaranteed by the template engine.

Cloning this repository alone does not launch Switch, authorize accounts, or run agents. No staging website is required. A live demo remains dependent on the Switch server and agent machine being online.

This version includes routing and persistent trackers. A separate company memory service, Telegram/Mattermost, Jira, automatic code fixes, and merge/deployment monitoring are not implemented here. Source-thread updates are triggered by an authorized human requesting an update in a specialist Slack thread.

## Review the implementation

- [Template](templates/customer-triage.template.yaml): instructions, handoff contract, agents, memberships, rooms, and room links.
- [Setup](docs/setup.md): installation inputs, addressing, grants, initialization, and runtime diagnostics.
- [Acceptance scenarios](demo/acceptance.md): bug, feature, other, clarification, update, duplicate, and restart checks.
- [Verification](docs/verification.md): separates static checks from actual execution.
- [Sources](docs/sources.md): upstream source revision and documentation used.

The JavaScript validation utility is a development check for the submitted configuration, not an application or custom agent. It is optional for running the workflow:

```sh
npm ci
npm run validate
```

It parses YAML and checks declared inputs, room membership, handoff topology, provider settings, and connector scope. It does not simulate an agent or prove that Slack, Discord, or Google Sheets works.

An additional [offline check](scripts/check-with-switch.py) runs Switch's own template linter, room compiler, and group schema when executed with the Python environment bundled with your Switch installation. It performs no provisioning or network operations. See [setup](docs/setup.md#offline-check-with-switch-itself).
