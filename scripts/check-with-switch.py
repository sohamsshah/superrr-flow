"""Offline configuration checks using an installed Switch Python environment.

This is development tooling, not a workflow runtime, custom agent, or server.
"""
from pathlib import Path

import yaml
from switch_core.agent_templates import agent_slots, room_document
from switch_core.rooms_yaml import GroupTemplateDocument
from switch_core.template_lint import lint_template

source = Path(__file__).resolve().parents[1] / "templates/customer-triage.template.yaml"
text = source.read_text(encoding="utf-8")
findings = lint_template(text)
for finding in [*findings.errors, *findings.warnings]:
    print(f"{finding.code}: {finding.message}")
if findings.errors or findings.warnings:
    raise SystemExit("FAIL: resolve native template lint findings before packaging")

slots = agent_slots(text)
filled = {slot.name: slot.name.replace("{team}", "repro-a") for slot in slots}
compiled, _ = room_document(text, filled, {
    "team": "repro-a", "provider": "codex", "location": "local",
    "discord_bridge": "Discord", "slack_bridge": "Slack",
})
group = GroupTemplateDocument.model_validate(yaml.safe_load(compiled))
if len(slots) != 3 or len(group.rooms) != 3 or len(group.links) != 4:
    raise SystemExit("FAIL: expected three agent slots, three rooms and four links")
print("PASS: installed Switch linter: zero errors, zero warnings")
print("PASS: installed Switch compiler/schema: three agent slots, three rooms, four links")
print("NOT TESTED: provisioning, account permissions, agent behavior, or message/Sheet delivery")
