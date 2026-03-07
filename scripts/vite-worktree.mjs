import { spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { promises as fs } from 'node:fs';
import net from 'node:net';
import os from 'node:os';
import path from 'node:path';

const PORT_MIN = 5173;
const PORT_MAX = 6099;
const PORT_RANGE = PORT_MAX - PORT_MIN + 1;
const REGISTRY_DIR = path.join(os.homedir(), '.youngxguo', 'vite-worktree-ports');
const cliArgs = process.argv.slice(2);

function parsePort(value) {
  if (!value) {
    return null;
  }

  const parsed = Number.parseInt(value, 10);
  if (!Number.isInteger(parsed) || parsed < 1 || parsed > 65535) {
    return null;
  }

  return parsed;
}

function parsePortArg(args) {
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === '--port' || arg === '-p') {
      return {
        hasExplicitPortArg: true,
        port: parsePort(args[index + 1] ?? '')
      };
    }

    if (arg.startsWith('--port=')) {
      return {
        hasExplicitPortArg: true,
        port: parsePort(arg.slice('--port='.length))
      };
    }

    if (arg.startsWith('-p') && arg.length > 2) {
      return {
        hasExplicitPortArg: true,
        port: parsePort(arg.slice(2))
      };
    }
  }

  return {
    hasExplicitPortArg: false,
    port: null
  };
}

function getDeterministicWorktreePort() {
  const hash = createHash('sha1').update(process.cwd()).digest();
  const offset = hash.readUInt16BE(0) % PORT_RANGE;
  return PORT_MIN + offset;
}

function getWorktreeSessionFile(worktree) {
  const id = createHash('sha1').update(worktree).digest('hex');
  return path.join(REGISTRY_DIR, `${id}.json`);
}

function isProcessRunning(pid) {
  if (!Number.isInteger(pid) || pid <= 0) {
    return false;
  }

  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    return error?.code === 'EPERM';
  }
}

function isPortAvailable(port) {
  return new Promise((resolve) => {
    const server = net.createServer();

    server.once('error', () => resolve(false));
    server.once('listening', () => {
      server.close(() => resolve(true));
    });

    server.listen(port, '127.0.0.1');
  });
}

async function resolvePort() {
  const envPort = parsePort(process.env.VITE_PORT) ?? parsePort(process.env.PORT);
  if (envPort) {
    return envPort;
  }

  const seedPort = getDeterministicWorktreePort();
  for (let step = 0; step < PORT_RANGE; step += 1) {
    const port = PORT_MIN + ((seedPort - PORT_MIN + step) % PORT_RANGE);
    if (await isPortAvailable(port)) {
      return port;
    }
  }

  throw new Error(`Could not find an available port between ${PORT_MIN} and ${PORT_MAX}.`);
}

async function ensureRegistryDir() {
  await fs.mkdir(REGISTRY_DIR, { recursive: true });
}

async function readSession(filePath) {
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    const session = JSON.parse(raw);

    if (
      !session ||
      typeof session !== 'object' ||
      typeof session.worktree !== 'string' ||
      !Number.isInteger(session.pid) ||
      !Number.isInteger(session.port)
    ) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

async function listSessions() {
  await ensureRegistryDir();
  const files = await fs.readdir(REGISTRY_DIR);
  const entries = [];

  for (const fileName of files) {
    if (!fileName.endsWith('.json')) {
      continue;
    }

    const filePath = path.join(REGISTRY_DIR, fileName);
    const session = await readSession(filePath);
    if (!session || !isProcessRunning(session.pid)) {
      await fs.rm(filePath, { force: true });
      continue;
    }

    entries.push(session);
  }

  entries.sort((entryA, entryB) => entryA.worktree.localeCompare(entryB.worktree));
  return entries;
}

async function getSessionForWorktree(worktree) {
  const filePath = getWorktreeSessionFile(worktree);
  const session = await readSession(filePath);

  if (!session) {
    return null;
  }

  if (!isProcessRunning(session.pid)) {
    await fs.rm(filePath, { force: true });
    return null;
  }

  return session;
}

async function registerSession({ worktree, port, pid }) {
  await ensureRegistryDir();
  const filePath = getWorktreeSessionFile(worktree);

  const payload = {
    worktree,
    pid,
    port,
    startedAt: new Date().toISOString()
  };

  await fs.writeFile(filePath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
}

async function unregisterSession({ worktree, pid }) {
  const filePath = getWorktreeSessionFile(worktree);
  const session = await readSession(filePath);

  if (session && session.pid === pid) {
    await fs.rm(filePath, { force: true });
  }
}

async function printSessions() {
  const sessions = await listSessions();

  if (sessions.length === 0) {
    process.stdout.write('[dev] No active Vite sessions found. Start one with `pnpm dev`.\n');
    return;
  }

  process.stdout.write('[dev] Active Vite sessions:\n');
  for (const session of sessions) {
    process.stdout.write(
      `- ${session.worktree} -> http://localhost:${session.port} (pid ${session.pid})\n`
    );
  }
}

async function printCurrentWorktreePort() {
  const session = await getSessionForWorktree(process.cwd());
  if (session) {
    process.stdout.write(`${session.port}\n`);
    return;
  }

  const port = await resolvePort();
  process.stdout.write(`${port}\n`);
}

async function run() {
  if (cliArgs[0] === 'ports') {
    await printSessions();
    return;
  }

  if (cliArgs[0] === 'port') {
    await printCurrentWorktreePort();
    return;
  }

  const command = process.platform === 'win32' ? 'vite.cmd' : 'vite';
  const { hasExplicitPortArg, port: explicitPort } = parsePortArg(cliArgs);
  const port = hasExplicitPortArg ? explicitPort : await resolvePort();
  const viteArgs = hasExplicitPortArg ? [...cliArgs] : ['--port', String(port), ...cliArgs];

  if (port) {
    process.stdout.write(`[dev] ${process.cwd()} -> http://localhost:${port}\n`);
  }

  const child = spawn(command, viteArgs, {
    stdio: 'inherit',
    env: process.env
  });

  child.on('error', (error) => {
    process.stderr.write(`[dev] failed to start: ${error.message}\n`);
    process.exit(1);
  });

  if (port && child.pid) {
    await registerSession({
      worktree: process.cwd(),
      port,
      pid: child.pid
    });
  }

  child.on('exit', (code, signal) => {
    const exitProcess = () => {
      if (signal) {
        process.kill(process.pid, signal);
        return;
      }

      process.exit(code ?? 1);
    };

    if (port && child.pid) {
      unregisterSession({
        worktree: process.cwd(),
        pid: child.pid
      })
        .catch((error) => {
          process.stderr.write(`[dev] warning: failed to update port registry: ${error.message}\n`);
        })
        .finally(exitProcess);
      return;
    }

    exitProcess();
  });
}

await run();
