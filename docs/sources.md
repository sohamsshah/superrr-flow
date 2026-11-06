# Sources and scope

Reviewed on 2026-11-06. Upstream source inspected at Switch commit `93c132cf6836f2a0200aae3c7a0359764fcbd48a`. This pins the design reference, not an installed/runtime-tested Switch release.

- [Hackathon](https://www.wemakedevs.org/hackathons/switch): existing providers and templates are allowed; reproducibility and presentation are judging criteria.
- [Organizer's workflow walkthrough](https://www.wemakedevs.org/blogs/how-to-build-a-switch-workflow-that-finishes-a-real-task): commit a template and rehearse a fresh setup.
- [Templates documentation](https://docs.switchagents.ai/switch-rooms/administer/room-templates): capture/import behavior, agent creation, and ownership caveats.
- [Template language at inspected revision](https://github.com/sandbox-quantum/switch/blob/93c132cf6836f2a0200aae3c7a0359764fcbd48a/docs/TEMPLATES.md): version 1 group, agents, rooms, links, location/provider/directory inputs, connections, and kickoff fields.
- [Official triage example](https://github.com/sandbox-quantum/switch/blob/93c132cf6836f2a0200aae3c7a0359764fcbd48a/examples/agent-templates/triage-pair.template.yaml): native provider-backed agents and room setup.
- [Google Workspace connector definition](https://github.com/sandbox-quantum/switch/blob/93c132cf6836f2a0200aae3c7a0359764fcbd48a/core/switch_core/connections/catalog/google-workspace/connection.yaml): `google-workspace` slug, write access, and supplied gws tool.
- [Shared context](https://docs.switchagents.ai/switch-rooms/using/shared-context): documents and ownership.
- [Room operation catalog](https://docs.switchagents.ai/switch-rooms/internals/agent-protocol#the-operation-catalog): targeted messages, history, room membership and documents.

Provider permission prompts and connector errors remain runtime conditions. Instructions requesting deduplication or privacy behavior do not make those properties transactionally guaranteed or enforce them as access controls.
