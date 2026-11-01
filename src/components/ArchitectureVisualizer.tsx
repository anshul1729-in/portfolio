import { useState } from 'react';
import type { FC } from 'react';
import { Server, Activity, Zap, RefreshCw, AlertTriangle, Layers } from 'lucide-react';

export const ArchitectureVisualizer: FC = () => {
  const [activeTab, setActiveTab] = useState<'raft' | 'container'>('raft');

  // Raft Simulation State
  const [leaderNode, setLeaderNode] = useState<number>(1);
  const [isLeaderAlive, setIsLeaderAlive] = useState<boolean>(true);
  const [raftStep, setRaftStep] = useState<string>("Cluster Idle: Node 1 is Leader (Term 4)");
  const [logEntries, setLogEntries] = useState<string[]>(["SET term=4", "SET status=active"]);
  const [committedCount, setCommittedCount] = useState<number>(2);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  // Container Simulation State
  const [allocatedMem, setAllocatedMem] = useState<number>(24); // MB
  const [cpuUsage, setCpuUsage] = useState<number>(38); // %

  const simulateRaftWrite = () => {
    if (!isLeaderAlive) {
      setRaftStep("Write Rejected: No Leader Available! Trigger Election first.");
      return;
    }
    setIsSimulating(true);
    const newEntry = `WRITE req_${Math.floor(Math.random() * 900 + 100)}=val`;
    setRaftStep(`Client sends command -> Leader (Node ${leaderNode}) appends to local WAL`);
    
    setTimeout(() => {
      setLogEntries(prev => [...prev, newEntry]);
      setRaftStep(`Leader broadcasts AppendEntries RPCs over raw TCP to Followers...`);
    }, 600);

    setTimeout(() => {
      setRaftStep(`Quorum achieved (2/3 nodes acknowledged log match). Advancing commitIndex.`);
      setCommittedCount(prev => prev + 1);
    }, 1200);

    setTimeout(() => {
      setRaftStep(`Success! State machine updated. Client received response in ~1.8ms.`);
      setIsSimulating(false);
    }, 1800);
  };

  const killLeader = () => {
    setIsLeaderAlive(false);
    setRaftStep(`LEADER FAILURE (kill -9)! Node ${leaderNode} dropped offline.`);
  };

  const triggerElection = () => {
    setIsSimulating(true);
    setRaftStep(`Election timer expired (randomized 300-600ms). Node 2 initiates RequestVote RPCs.`);
    
    setTimeout(() => {
      setRaftStep(`Node 2 receives strict quorum math majority (⌊3/2⌋ + 1 = 2 votes).`);
    }, 700);

    setTimeout(() => {
      setLeaderNode(2);
      setIsLeaderAlive(true);
      setRaftStep(`Node 2 established as new Leader (Term 5)! Automated failover in ~390ms.`);
      setIsSimulating(false);
    }, 1300);
  };

  const resetRaft = () => {
    setLeaderNode(1);
    setIsLeaderAlive(true);
    setLogEntries(["SET term=4", "SET status=active"]);
    setCommittedCount(2);
    setRaftStep("Cluster Reset: Node 1 is Leader (Term 4)");
    setIsSimulating(false);
  };

  return (
    <section id="architecture" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs mb-3">
            <Server className="w-3.5 h-3.5" />
            <span>Interactive Engineering Simulators</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            First-Principles Architecture in Action
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Inspect how the low-level distributed consensus protocols and container runtimes I built operate under real-world conditions.
          </p>

          {/* Switcher Tabs */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <button
              onClick={() => setActiveTab('raft')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-medium transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'raft'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-md shadow-cyan-500/10'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <Server className="w-4 h-4" />
              <span>Miniraft (Distributed Consensus)</span>
            </button>
            <button
              onClick={() => setActiveTab('container')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-medium transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'container'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-md shadow-emerald-500/10'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Minicontainer (Linux Namespaces &amp; Cgroups)</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Raft Consensus Simulator */}
        {activeTab === 'raft' && (
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-2xl relative overflow-hidden">
            
            {/* Control Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>3-Node Raft Cluster Simulation</span>
                  <span className="text-xs font-mono font-normal px-2 py-0.5 rounded bg-slate-800 text-cyan-400 border border-slate-700">
                    Quorum: ⌊3/2⌋ + 1 = 2 Nodes
                  </span>
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-1">
                  Zero external libraries • Raw TCP RPCs • Sub-second election timeout
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  disabled={isSimulating}
                  onClick={simulateRaftWrite}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold font-mono text-xs flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Simulate Write RPC</span>
                </button>

                {isLeaderAlive ? (
                  <button
                    disabled={isSimulating}
                    onClick={killLeader}
                    className="px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 border border-rose-500/40 font-mono text-xs flex items-center gap-1.5 cursor-pointer transition-all"
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>kill -9 Leader</span>
                  </button>
                ) : (
                  <button
                    disabled={isSimulating}
                    onClick={triggerElection}
                    className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-mono text-xs flex items-center gap-1.5 cursor-pointer transition-all"
                  >
                    <Activity className="w-3.5 h-3.5" />
                    <span>Trigger Auto-Election</span>
                  </button>
                )}

                <button
                  onClick={resetRaft}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 cursor-pointer"
                  title="Reset Simulation"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Live Status Ticker */}
            <div className="my-5 p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 font-mono text-xs flex items-center gap-3">
              <span className={`w-2.5 h-2.5 rounded-full ${isLeaderAlive ? 'bg-cyan-400 animate-pulse' : 'bg-rose-500'}`}></span>
              <span className="text-slate-400">TELEMETRY:</span>
              <span className="text-cyan-300 font-semibold">{raftStep}</span>
            </div>

            {/* 3 Node Cluster Visual Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
              
              {/* Node 1 */}
              <div className={`p-5 rounded-xl border transition-all ${
                leaderNode === 1 && isLeaderAlive
                  ? 'bg-cyan-950/20 border-cyan-500/60 shadow-lg shadow-cyan-500/10'
                  : !isLeaderAlive && leaderNode === 1
                  ? 'bg-rose-950/20 border-rose-500/40 opacity-70'
                  : 'bg-slate-900/60 border-slate-800'
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Server className={`w-4 h-4 ${leaderNode === 1 && isLeaderAlive ? 'text-cyan-400' : 'text-slate-400'}`} />
                    <span className="font-mono font-bold text-sm text-white">Node 1 (127.0.0.1:8001)</span>
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold ${
                    leaderNode === 1 && isLeaderAlive
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : !isLeaderAlive && leaderNode === 1
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {leaderNode === 1 ? (isLeaderAlive ? 'LEADER' : 'OFFLINE (kill -9)') : 'FOLLOWER'}
                  </span>
                </div>

                <div className="space-y-1.5 font-mono text-xs text-slate-400">
                  <div className="flex justify-between">
                    <span>Term:</span>
                    <span className="text-slate-200">{leaderNode === 2 ? '5' : '4'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Replicated Log:</span>
                    <span className="text-cyan-400">{logEntries.length} entries</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Committed Index:</span>
                    <span className="text-emerald-400">{committedCount}</span>
                  </div>
                </div>
              </div>

              {/* Node 2 */}
              <div className={`p-5 rounded-xl border transition-all ${
                leaderNode === 2 && isLeaderAlive
                  ? 'bg-cyan-950/20 border-cyan-500/60 shadow-lg shadow-cyan-500/10'
                  : 'bg-slate-900/60 border-slate-800'
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Server className={`w-4 h-4 ${leaderNode === 2 ? 'text-cyan-400' : 'text-slate-400'}`} />
                    <span className="font-mono font-bold text-sm text-white">Node 2 (127.0.0.1:8002)</span>
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold ${
                    leaderNode === 2
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {leaderNode === 2 ? 'LEADER' : 'FOLLOWER'}
                  </span>
                </div>

                <div className="space-y-1.5 font-mono text-xs text-slate-400">
                  <div className="flex justify-between">
                    <span>Term:</span>
                    <span className="text-slate-200">{leaderNode === 2 ? '5' : '4'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Replicated Log:</span>
                    <span className="text-cyan-400">{logEntries.length} entries</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Heartbeat Status:</span>
                    <span className="text-emerald-400">Synced</span>
                  </div>
                </div>
              </div>

              {/* Node 3 */}
              <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Server className="w-4 h-4 text-slate-400" />
                    <span className="font-mono font-bold text-sm text-white">Node 3 (127.0.0.1:8003)</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold bg-slate-800 text-slate-400">
                    FOLLOWER
                  </span>
                </div>

                <div className="space-y-1.5 font-mono text-xs text-slate-400">
                  <div className="flex justify-between">
                    <span>Term:</span>
                    <span className="text-slate-200">{leaderNode === 2 ? '5' : '4'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Replicated Log:</span>
                    <span className="text-cyan-400">{logEntries.length} entries</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Heartbeat Status:</span>
                    <span className="text-emerald-400">Synced</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Architecture wire diagram */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 font-mono text-xs overflow-x-auto text-slate-300">
              <div className="text-slate-500 mb-2 flex items-center justify-between">
                <span>Raft AppendEntries Two-Phase Commit Pipeline:</span>
                <span className="text-cyan-400">github.com/anshul1729-in/miniraft</span>
              </div>
              <pre className="text-cyan-300/90 leading-relaxed">
{`Client ──► [ Leader (Node ${leaderNode}) ] ──► Appends to log[]
               │
               ├──► AppendEntries RPC (TCP) ──► [ Node ${leaderNode === 1 ? '2' : '1'} ] (MatchIndex: ${committedCount})
               └──► AppendEntries RPC (TCP) ──► [ Node 3 ] (MatchIndex: ${committedCount})
               │
               ▼ (Majority Quorum 2/3 Ack)
           Commit Index Advanced ──► Applied to KV & Lock State Machine`}
              </pre>
            </div>

          </div>
        )}

        {/* Tab 2: Linux Container Sandbox Simulator */}
        {activeTab === 'container' && (
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-2xl relative overflow-hidden">
            
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>Minicontainer Kernel Isolation Engine</span>
                  <span className="text-xs font-mono font-normal px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    Go Syscall • No Docker • No Containerd
                  </span>
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-1">
                  Linux Namespaces + Cgroups v2 resource capping at 50MB RAM &amp; 50% CPU
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setAllocatedMem(prev => Math.min(prev + 10, 50))}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono text-xs cursor-pointer transition-all"
                >
                  +10MB Memory Pressure
                </button>
                <button
                  onClick={() => { setAllocatedMem(20); setCpuUsage(35); }}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs border border-slate-700 cursor-pointer"
                >
                  Reset Quota
                </button>
              </div>
            </div>

            {/* Namespaces Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="text-emerald-400 font-mono text-xs font-bold mb-1">CLONE_NEWPID</div>
                <div className="text-white text-sm font-semibold">PID Virtualization</div>
                <p className="text-xs text-slate-400 mt-1 font-mono">
                  Container process isolated as PID 1; host processes invisible.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="text-emerald-400 font-mono text-xs font-bold mb-1">CLONE_NEWNS</div>
                <div className="text-white text-sm font-semibold">pivot_root + MNT</div>
                <p className="text-xs text-slate-400 mt-1 font-mono">
                  Host root detached (MNT_DETACH); Alpine minirootfs mounted.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="text-emerald-400 font-mono text-xs font-bold mb-1">CLONE_NEWNET</div>
                <div className="text-white text-sm font-semibold">Network Sandbox</div>
                <p className="text-xs text-slate-400 mt-1 font-mono">
                  Dedicated loopback and virtual ethernet interfaces.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="text-emerald-400 font-mono text-xs font-bold mb-1">CLONE_NEWUTS</div>
                <div className="text-white text-sm font-semibold">Hostname Isolation</div>
                <p className="text-xs text-slate-400 mt-1 font-mono">
                  Independent UTS namespace preventing host hostname leaks.
                </p>
              </div>
            </div>

            {/* Cgroups v2 live gauges */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="flex justify-between items-center text-xs font-mono mb-2">
                  <span className="text-slate-300">Cgroups v2 memory.max (Limit: 50MB)</span>
                  <span className={`${allocatedMem > 45 ? 'text-rose-400 font-bold' : 'text-emerald-400'}`}>
                    {allocatedMem} MB / 50 MB {allocatedMem >= 50 ? '(Enforcing OOM Throttling)' : ''}
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      allocatedMem > 45 ? 'bg-rose-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${(allocatedMem / 50) * 100}%` }}
                  />
                </div>
                <div className="text-[11px] text-slate-500 font-mono mt-1.5">
                  Path: /sys/fs/cgroup/minicontainer/memory.max
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="flex justify-between items-center text-xs font-mono mb-2">
                  <span className="text-slate-300">Cgroups v2 cpu.max (Limit: 50% core)</span>
                  <span className="text-cyan-400">{cpuUsage}% / 50%</span>
                </div>
                <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-cyan-500 transition-all duration-300"
                    style={{ width: `${(cpuUsage / 50) * 100}%` }}
                  />
                </div>
                <div className="text-[11px] text-slate-500 font-mono mt-1.5">
                  Path: /sys/fs/cgroup/minicontainer/cpu.max (50000 100000)
                </div>
              </div>
            </div>

            {/* Architecture code snippet */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 font-mono text-xs overflow-x-auto text-slate-300">
              <div className="text-slate-500 mb-2 flex items-center justify-between">
                <span>Kernel Syscall Invocations in Go:</span>
                <span className="text-emerald-400">github.com/anshul1729-in/minicontainer</span>
              </div>
              <pre className="text-emerald-300/90 leading-relaxed">
{`cmd := exec.Command("/proc/self/exe", append([]string{"child"}, os.Args[2:]...)...)
cmd.SysProcAttr = &syscall.SysProcAttr{
    Cloneflags: syscall.CLONE_NEWUTS | syscall.CLONE_NEWPID | syscall.CLONE_NEWNS | syscall.CLONE_NEWNET,
}
// Enforce Cgroups v2 quotas:
os.WriteFile("/sys/fs/cgroup/minicontainer/memory.max", []byte("52428800"), 0644) // 50MB
os.WriteFile("/sys/fs/cgroup/minicontainer/cpu.max", []byte("50000 100000"), 0644) // 50% Core`}
              </pre>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
