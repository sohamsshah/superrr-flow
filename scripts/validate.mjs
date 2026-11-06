import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parseDocument } from 'yaml';

const filename = new URL('../templates/customer-triage.template.yaml', import.meta.url);
const document = parseDocument(readFileSync(filename, 'utf8'), { uniqueKeys: true });
assert.equal(document.errors.length, 0, document.errors.map(e => e.message).join('\n'));
const template = document.toJS();
assert.equal(template.version, 1);
assert.equal(template.agents.length, 3);
assert.equal(template.rooms.length, 3);
assert.ok(template.group && !template.room && !template.kickoff);

const inputs = { team: 'repro-a', provider: 'codex', location: 'local', discord_bridge: 'Discord', slack_bridge: 'Slack', $agents_dir: 'C:/Switch/agents', $creator: 'reviewer' };
const used = new Set();
function resolve(value) {
  if (typeof value === 'string') return value.replace(/\{([\w$]+)\}/g, (_, name) => {
    assert.ok(Object.hasOwn(inputs, name), `Undeclared or unresolved placeholder: ${name}`);
    used.add(name);
    return inputs[name];
  });
  if (Array.isArray(value)) return value.map(resolve);
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, resolve(v)]));
  return value;
}
const resolved = resolve(template);
for (const name of Object.keys(template.params)) assert.ok(used.has(name), `Unused input: ${name}`);
for (const bridge of ['discord_bridge', 'slack_bridge']) {
  assert.equal(template.params[bridge].type, 'bridge');
  assert.equal(template.params[bridge].default, undefined, 'Cross-platform bridges must be chosen explicitly');
}
const agents = new Map(resolved.agents.map(a => [a.name, a]));
const rooms = new Map(resolved.rooms.map(r => [r.name, r]));
assert.equal(agents.size, 3, 'Agent names must be unique');
assert.equal(rooms.size, 3, 'Room names must be unique');
assert.equal(new Set(resolved.agents.map(a => a.directory)).size, 3, 'Agent folders must be separate');
for (const agent of agents.values()) {
  assert.match(agent.name, /^[a-z0-9][a-z0-9._-]*$/);
  assert.ok(agent.provider && agent.location && agent.directory && agent.instructions);
  assert.equal(agent.auto_approve, false);
  assert.equal(agent.can_manage_agents, undefined);
}
for (const room of rooms.values()) {
  assert.ok(room.instructions && room.kickoff);
  for (const name of room.agents) assert.ok(agents.has(name), `Unknown room member: ${name}`);
  const mentions = [...room.kickoff.matchAll(/@([a-z0-9][a-z0-9._-]*)/g)].map(m => m[1]);
  for (const mention of mentions) assert.ok(room.agents.includes(mention), `Kickoff target is not a member: ${mention}`);
  // Mutable tracker documents must be created by their owning agents at kickoff.
  assert.equal(room.docs, undefined);
  assert.equal(room.packages, undefined);
  assert.equal(room.references, undefined);
}
const intake = 'repro-a-intake';
const feedback = rooms.get('repro-a-customer-feedback');
assert.equal(feedback.bridge, 'Discord');
assert.deepEqual(feedback.agents, [intake]);
assert.equal(agents.get(intake).addressing, 'anyone');
assert.equal(agents.get(intake).connections, undefined);
for (const kind of ['bug', 'feature']) {
  const specialist = `repro-a-${kind}-agent`;
  const roomName = `repro-a-customer-${kind}s`;
  const room = rooms.get(roomName);
  assert.equal(room.bridge, 'Slack');
  assert.equal(room.channel_type, 'channel_private');
  assert.deepEqual(room.agents, [intake, specialist]);
  assert.equal(agents.get(specialist).addressing, 'owner-agents');
  for (const [from, to] of [[feedback.name, roomName], [roomName, feedback.name]]) {
    assert.ok(resolved.links.some(l => l.from === from && l.to === to), `Missing room link: ${from} -> ${to}`);
  }
}
assert.deepEqual(agents.get('repro-a-bug-agent').connections, [{ service: 'google-workspace', access: 'write' }]);
assert.equal(agents.get('repro-a-feature-agent').connections, undefined);
for (const link of resolved.links) assert.ok(rooms.has(link.from) && rooms.has(link.to));
console.log('PASS: YAML parsed; inputs resolved; three agents/rooms; distinct folders; targeted-handoff memberships; private Slack rooms; scoped connector assignment; valid room links and kickoff targets.');
console.log('NOT TESTED: upstream server validation, template import, runtime addressing, agent behavior, chat delivery, or Google Sheets operations.');
