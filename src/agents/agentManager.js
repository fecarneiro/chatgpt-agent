import { SessionMemoryAgent } from './sessionMemoryAgent.js';
import { PersistentChatAgent } from './persistentChatAgent.js';

const availableAgents = [
  {
    key: '1',
    name: 'SessionMemoryAgent',
    description: 'RAM only, memory lasts only for this session.',
    agentClass: SessionMemoryAgent,
  },
  {
    key: '2',
    name: 'PersistentChatAgent',
    description: 'Uses lowdb for persistent memory, type "reset" to clear memory.',
    agentClass: PersistentChatAgent,
  },
];

export function displayAgentOptions() {
  console.log('\nChoose your agent:');
  availableAgents.forEach((agent) => {
    console.log(`${agent.key} - ${agent.name}: ${agent.description}`);
  });
  console.log('');
}

export async function createAgentByChoice(choice) {
  const agentInfo = availableAgents.find((agent) => agent.key === choice);
  if (!agentInfo) {
    return null;
  }
  const agent = new agentInfo.agentClass();
  if (typeof agent.init === 'function') {
    await agent.init();
  }
  return agent;
}
