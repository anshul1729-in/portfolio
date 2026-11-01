import { useState, useRef, useEffect } from 'react';
import type { FC, KeyboardEvent } from 'react';
import { Terminal as TerminalIcon, X } from 'lucide-react';
import { TERMINAL_COMMANDS, PERSONAL_INFO, RESUME_TRACKS } from '../data/portfolioData';

interface InteractiveTerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandHistoryItem {
  id: string;
  command: string;
  output: string | string[];
}

export const InteractiveTerminal: FC<InteractiveTerminalProps> = ({ isOpen, onClose }) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandHistoryItem[]>([
    {
      id: 'init-1',
      command: 'whoami',
      output: [
        `User: ${PERSONAL_INFO.name} (${PERSONAL_INFO.handle})`,
        `Role: ${PERSONAL_INFO.role}`,
        `Expected Graduation: July 2027 (${PERSONAL_INFO.education.institution})`,
        `Type 'help' to view all available commands.`
      ]
    }
  ]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [commandList, setCommandList] = useState<string[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const quickCommands = ['help', 'projects', 'curl raft', 'curl cont', 'resumes', 'skills', 'contact', 'clear'];

  const executeCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    setCommandList(prev => [...prev, trimmed]);
    setHistoryIndex(-1);

    const lower = trimmed.toLowerCase();

    if (lower === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    if (lower === 'exit' || lower === 'quit') {
      onClose();
      return;
    }

    if (lower === 'date') {
      setHistory(prev => [...prev, {
        id: Math.random().toString(),
        command: trimmed,
        output: [new Date().toString()]
      }]);
      setInputVal('');
      return;
    }

    if (lower.startsWith('cat ')) {
      const target = lower.replace('cat ', '').trim();
      const matchResume = RESUME_TRACKS.find(r => r.id === target || r.title.toLowerCase().includes(target));
      if (matchResume) {
        setHistory(prev => [...prev, {
          id: Math.random().toString(),
          command: trimmed,
          output: [
            `--- [ RESUME: ${matchResume.title} ] ---`,
            `Target Roles: ${matchResume.targetRoles.join(', ')}`,
            `Summary: ${matchResume.summary}`,
            `PDF File: ${matchResume.filePath}`,
            `Key Highlights:`,
            ...matchResume.keyHighlights.map(h => `  • ${h}`)
          ]
        }]);
      } else {
        setHistory(prev => [...prev, {
          id: Math.random().toString(),
          command: trimmed,
          output: [`cat: ${target}: No such resume found. Options: 'cat systems', 'cat core', 'cat fullstack'`]
        }]);
      }
      setInputVal('');
      return;
    }

    if (lower === 'resumes') {
      setHistory(prev => [...prev, {
        id: Math.random().toString(),
        command: trimmed,
        output: [
          "Available ATS Resumes:",
          "  • systems   -> Cloud Infrastructure & Systems Engineer (Go, Linux, Cgroups)",
          "  • core      -> Core Software Engineer (Distributed Systems, Raft, C POSIX)",
          "  • fullstack -> AI & Full-Stack Software Engineer (Next.js, Supabase, Web3)",
          "Usage: cat <systems|core|fullstack>"
        ]
      }]);
      setInputVal('');
      return;
    }

    if (lower === 'skills') {
      setHistory(prev => [...prev, {
        id: Math.random().toString(),
        command: trimmed,
        output: [
          "[Languages]: Go, C, Python, TypeScript, JavaScript, SQL (PostgreSQL), Bash",
          "[Systems & Kernel]: Linux Namespaces, Cgroups v2, POSIX Syscalls, FDs, Signal multiplexing",
          "[Distributed]: Raft Consensus Algorithm, Leader Election, TCP RPCs, Quorum Math",
          "[Full-Stack]: React 18/19, Next.js App Router, Supabase RLS, Web Audio API, Solana Web3",
          "[DevOps & Tools]: Docker, Render IaC, In-Memory TTL Caching, Make, GCC, Git"
        ]
      }]);
      setInputVal('');
      return;
    }

    const commandEntry = TERMINAL_COMMANDS[lower];
    if (commandEntry) {
      setHistory(prev => [...prev, {
        id: Math.random().toString(),
        command: trimmed,
        output: commandEntry.output
      }]);
    } else {
      setHistory(prev => [...prev, {
        id: Math.random().toString(),
        command: trimmed,
        output: [`zsh: command not found: ${trimmed}. Type 'help' for available commands.`]
      }]);
    }

    setInputVal('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandList.length > 0) {
        const nextIdx = historyIndex + 1;
        if (nextIdx < commandList.length) {
          setHistoryIndex(nextIdx);
          setInputVal(commandList[commandList.length - 1 - nextIdx]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(commandList[commandList.length - 1 - nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-4xl bg-slate-950 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[650px] max-h-[90vh]">
        
        {/* Terminal Titlebar */}
        <div className="bg-slate-900/90 px-4 py-3 border-b border-slate-800 flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-500 cursor-pointer" onClick={onClose} />
            <div className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-500 cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 cursor-pointer" />
            <span className="ml-2 text-xs font-mono text-slate-400 flex items-center gap-1.5">
              <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
              anshul@first-principles-box: ~ (zsh)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Commands Bar */}
        <div className="bg-slate-900/40 px-4 py-2 border-b border-slate-800/80 flex items-center gap-1.5 overflow-x-auto text-[11px] font-mono text-slate-400">
          <span className="text-slate-500 text-[10px] uppercase tracking-wider shrink-0">Quick run:</span>
          {quickCommands.map((cmd) => (
            <button
              key={cmd}
              onClick={() => executeCommand(cmd)}
              className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 shrink-0 cursor-pointer transition-colors"
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Terminal Output Area */}
        <div
          className="flex-1 p-4 sm:p-5 overflow-y-auto font-mono text-xs sm:text-sm text-slate-200 space-y-3 cursor-text"
          onClick={() => inputRef.current?.focus()}
        >
          <div className="text-slate-500 text-xs mb-3">
            Antigravity Shell v2.4 • Linux 6.8.0-generic x86_64 • Connected to Anshul's Portfolio Node
          </div>

          {history.map((item) => (
            <div key={item.id} className="space-y-1">
              <div className="flex items-center gap-2 text-slate-400">
                <span className="text-cyan-400 font-bold">anshul@first-principles</span>
                <span className="text-slate-500">:</span>
                <span className="text-purple-400 font-semibold">~</span>
                <span className="text-slate-200">$ {item.command}</span>
              </div>
              <div className="pl-4 text-slate-300 space-y-1">
                {Array.isArray(item.output) ? (
                  item.output.map((line, idx) => (
                    <div key={idx} className="whitespace-pre-wrap leading-relaxed text-slate-300">
                      {line}
                    </div>
                  ))
                ) : (
                  <div className="whitespace-pre-wrap leading-relaxed">{item.output}</div>
                )}
              </div>
            </div>
          ))}

          {/* Current Input Prompt */}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-cyan-400 font-bold">anshul@first-principles</span>
            <span className="text-slate-500">:</span>
            <span className="text-purple-400 font-semibold">~</span>
            <span className="text-slate-200">$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-cyan-300 font-mono text-xs sm:text-sm caret-cyan-400"
              autoFocus
              spellCheck={false}
            />
          </div>

          <div ref={bottomRef} />
        </div>

        {/* Footer info */}
        <div className="bg-slate-900/60 px-4 py-2 border-t border-slate-800 text-[11px] font-mono text-slate-500 flex items-center justify-between">
          <span>Press [Enter] to submit • [↑/↓] for history</span>
          <span>Graduation: July 2027</span>
        </div>

      </div>
    </div>
  );
};
