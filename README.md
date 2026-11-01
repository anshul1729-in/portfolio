# Anshul Pal — Systems & Full-Stack Software Engineer Portfolio

> **"I build systems from first principles — from Raft consensus clusters and Linux container runtimes to algorithmic recommendation engines and high-throughput platforms."**

A modern, high-performance developer portfolio built with **React 19**, **TypeScript**, **Tailwind CSS**, and **Vite**.

---

## 🌟 Key Highlights & Engineering Features

1. **First-Principles Architecture Simulators (`#architecture`):**
   - **Miniraft (Raft Consensus Simulator):** Live interactive simulation of 3-node distributed consensus, two-phase commit log replication, quorum verification ($\lfloor 3/2 \rfloor + 1 = 2$), randomized leader election timeouts (300–600ms), and automated `kill -9` leader failover (~400ms).
   - **Minicontainer (Linux Sandbox Engine):** Live simulation of `CLONE_NEWPID`, `CLONE_NEWNS`, `pivot_root`, and Linux Cgroups v2 hardware bounds (50MB RAM ceiling and 50% CPU core quota).

2. **Flagship Proof-of-Work Showcase (`#projects`):**
   - Real-time search and filter by domain (`Distributed & Consensus`, `Linux & Systems`, `Full-Stack & Web3`, `CLI & Low-Level`).
   - One-click `git clone` command copying.
   - Expandable architecture diagrams and metrics tags for each project (`miniraft`, `minicontainer`, `minishell`, `NeonWave`, `Sanctuary`, `Cendex`, `Amigo-CLI`, `personal-email-server`, `http-server-py`).

3. **Interactive Systems Terminal / CLI (`$ ./anshul.sh`):**
   - Built-in interactive Unix-like shell with command history, tab autocomplete suggestions, and executable commands:
     - `help`, `whoami`, `about`, `projects`, `skills`, `education`, `experience`, `curl raft`, `curl cont`, `contact`, `clear`.
   - Accessible via the **CLI Mode** button or keyboard shortcut (`Ctrl + \`` or `Cmd + K`).

4. **Education & Trajectory (`#timeline`):**
   - Academic credentials: **Bachelor of Computer Applications (BCA) – Computer Science** at **Amity University**, expected graduation **July 2027**.
   - Work Experience: Freelance SWE at **PropertyLay** (Next.js App Router, Sub-second LCP, zero layout shift).

5. **Contact & Direct Transmission (`#contact`):**
   - Direct mailto dispatch form.
   - 1-click clipboard copy for email (`anshul6272@gmail.com`).
   - Verified profile links to GitHub (`@anshul1729-in`) and LinkedIn (`/in/anshulpal101`).

---

## 🛠️ Local Development

### Prerequisites
- Node.js (v18+)
- pnpm (v9+) or npm

### Run Locally
```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production
```bash
pnpm build
```
The optimized static production bundle is generated in `dist/`.

### Preview Production Build
```bash
pnpm preview
```

---

## 🚀 One-Click Deployments

### Deploy to Vercel
```bash
vercel --prod
```
