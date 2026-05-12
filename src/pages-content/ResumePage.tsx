'use client';

import { toHex } from '@/lib/hex';
import { ProcessState } from '@/types';
import styles from './pages.module.css';

interface ResumeProc {
  pid: number;
  state: ProcessState;
  uptime: string;
  command: string;
  detail?: string;
  bullets?: string[];
}

const SUMMARY =
  'Systems engineer building low-level software and observability tooling for safety-critical RTOS, virtualization, and ARM/RISC-V SoCs. Experienced in secure-execution with ARM TrustZone, memory-profiling, and hardware/software debugging workflows.';

const SERVICE: ResumeProc[] = [
  {
    pid: 0x01,
    state: 'WAITING',
    uptime: '2026.07–',
    command: 'nvidia[sse]',
    detail: 'Systems Software Engineer · RTOS and Virtualization · Santa Clara, CA',
  },
  {
    pid: 0x02,
    state: 'STOPPED',
    uptime: '2025.05–2025.08',
    command: 'nvidia[sse-intern]',
    detail: 'Systems Software Engineer Intern · RTOS and Virtualization · Santa Clara, CA',
    bullets: [
      'Expanded production RTOS/virtualization memory-profiling infrastructure across NVIDIA DRIVE Thor/Orin SoCs and ARM/RISC-V clusters, tripling supported configurations and improving visibility into memory utilization across hardware/software boundaries.',
      'Delivered safety, security, and performance-focused proof-of-concepts with cross-functional teams, influencing product safety compliance decisions for RTOS/virtualization deployments.',
      'Designed high-reliability C++14 MMU & SMMU data-capture APIs across ARM TrustZone boundaries using FuSa libraries, enabling secure low-level observability for performance, safety, and debugging workflows.',
    ],
  },
  {
    pid: 0x03,
    state: 'STOPPED',
    uptime: '2024.05–2024.08',
    command: 'nvidia[sse-intern]',
    detail: 'Systems Software Engineer Intern · RTOS and Virtualization · Santa Clara, CA',
    bullets: [
      'Engineered hypervisor memory profiling tools to visualize RAM utilization across TrustZone layers, enabling developers to better use available memory on automotive platforms (2x improvement).',
      'Built ARMv8 GICv3 interrupt-profiling tooling to analyze SGI/PPI/SPI behavior across secure and non-secure execution contexts, helping SoC teams isolate hardware/software defects and performance bottlenecks.',
      'Shipped production C++14 to ISO 26262, AUTOSAR, MISRA, CERT compliance, validated through Jenkins/Splunk CI pipelines.',
    ],
  },
];

const EDUCATION: ResumeProc[] = [
  {
    pid: 0x04,
    state: 'RUNNING',
    uptime: '2022.08–2026.05',
    command: 'ut-austin[bs-cs]',
    detail: 'B.S. Computer Science · Austin, TX',
  },
];

const PROJECTS: ResumeProc[] = [
  {
    pid: 0x05,
    state: 'IDLE',
    uptime: '—',
    command: 'ext2-fs',
    detail: 'x86, C++',
    bullets: [
      'Developed a full Ext2 filesystem in C++ for emulated x86 hardware on QEMU, supporting read/write operations for directories, files, and symbolic links up to 256 MiB.',
      'Designed a virtual memory subsystem with paging, fault handling, and file caching for kernel/user-space programs, reducing average memory access time by 80x.',
    ],
  },
  {
    pid: 0x06,
    state: 'IDLE',
    uptime: '—',
    command: 'quickjs-exploit',
    detail: 'JavaScript, C',
    bullets: [
      'Exploited a use-after-free vulnerability in QuickJS to trigger type confusion and construct GC-resistant primitives: addrof(), fakeobj(), and fakestr().',
      'Built readmem() and writemem() primitives to inspect PLT/GOT for reliable ASLR bypass, then marked pages RWX via mprotect() for second-stage payload execution.',
    ],
  },
  {
    pid: 0x07,
    state: 'IDLE',
    uptime: '—',
    command: 'shellcode-encoder',
    detail: 'RISC-V, C',
    bullets: [
      'Engineered a UTF-8-compliant, non-NULL two-stage attack payload in assembly using a custom XOR-based shellcode encoder for 64-bit RISC-V targets.',
      'Optimized payload encodings to satisfy exploit constraints while reducing final binary size by 10% via bit-level transformations.',
    ],
  },
];

const FLAGS = ['C/C++', 'Python', 'Java', 'AArch64', 'RISC-V', 'x86-64', 'QEMU', 'Unix/Linux'];
const TOOLS = ['Bash', 'Make', 'Valgrind', 'Windows', 'Jira', 'Splunk', 'Git', 'GitHub', 'Gerrit', 'Coverity', 'Jenkins'];
const INTERESTS = [
  'ai-infrastructure',
  'ai-safety',
  'embedded-systems',
  'computer-architecture',
  'operating-systems',
  'hpc',
  'computer-security',
  'formal-methods',
];

function ProcTable({ rows }: { rows: ResumeProc[] }) {
  return (
    <div className={styles.procTable}>
      <div className={styles.procHead} aria-hidden="true">
        <span>PID</span>
        <span>STATE</span>
        <span>UPTIME</span>
        <span>COMMAND</span>
      </div>
      {rows.map((row) => (
        <div key={row.pid} className={styles.procEntry}>
          <div className={styles.procRow}>
            <span className={styles.procPid}>{toHex(row.pid)}</span>
            <span
              className={styles.procState}
              data-state={row.state}
              aria-label={`status: ${row.state.toLowerCase()}`}
            >
              {row.state}
            </span>
            <span className={styles.procUptime}>{row.uptime}</span>
            <span className={styles.procCommand}>
              <span className={styles.procCmdName}>{row.command}</span>
              {row.detail && (
                <>
                  <span className={styles.procCmdSep}>  </span>
                  <span className={styles.procCmdDetail}>{row.detail}</span>
                </>
              )}
            </span>
          </div>
          {row.bullets && (
            <ul className={styles.procBullets}>
              {row.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

export function ResumePage() {
  return (
    <section className={styles.page}>
      <div className={styles.siteTitle}>
        <span className={styles.siteName}>MENTAT</span>
        <span className={styles.siteDefinition}>a person trained to mimic the cognitive and analytical ability of computers, serving as combative strategists and advisors to the great houses</span>
      </div>
      <h2 className={styles.sectionTitle}>RESUME</h2>

      <div className={styles.bootLog} aria-hidden="true">
        <span className={styles.bootLine}>
          <span className={styles.bootTimestamp}>[    0.000000]</span> mentat[1]: initializing personnel dossier...
        </span>
        <span className={styles.bootLine}>
          <span className={styles.bootTimestamp}>[    0.001242]</span> sysinit: mounting /usr/share/resume (ro)
        </span>
        <span className={styles.bootLine}>
          <span className={styles.bootTimestamp}>[    0.005871]</span> sysinit: parsing dossier @ 0xCAFEBABE
        </span>
        <span className={styles.bootLine}>
          <span className={styles.bootOk}>[  OK  ]</span> Loaded service record (3 entries)
        </span>
        <span className={styles.bootLine}>
          <span className={styles.bootOk}>[  OK  ]</span> Loaded education record (1 entry)
        </span>
        <span className={styles.bootLine}>
          <span className={styles.bootOk}>[  OK  ]</span> Loaded technical skills (19 modules)
        </span>
        <span className={styles.bootLine}>
          <span className={styles.bootOk}>[  OK  ]</span> Loaded project archive (3 entries)
        </span>
        <span className={styles.bootLine}>
          <span className={styles.bootOk}>[  OK  ]</span> System ready.
        </span>
      </div>

      <div className={styles.procSection}>
        <span className={styles.bootShell}>$ cat /proc/self/summary</span>
        <p className={styles.procSummary}>{SUMMARY}</p>
      </div>

      <div className={styles.procSection}>
        <span className={styles.bootShell}>$ ps -ef --section=service</span>
        <ProcTable rows={SERVICE} />
      </div>

      <div className={styles.procSection}>
        <span className={styles.bootShell}>$ ps -ef --section=education</span>
        <ProcTable rows={EDUCATION} />
      </div>

      <div className={styles.procSection}>
        <span className={styles.bootShell}>$ cat /proc/cpuinfo</span>
        <div className={styles.cpuinfoBlock}>
          <div className={styles.cpuinfoLine}>
            <span className={styles.cpuinfoLabel}>flags </span>
            <span className={styles.cpuinfoColon}>: </span>
            <span className={styles.cpuinfoValues}>
              {FLAGS.map((f) => (
                <span key={f} className={styles.cpuinfoChip}>{f}</span>
              ))}
            </span>
          </div>
          <div className={styles.cpuinfoLine}>
            <span className={styles.cpuinfoLabel}>tools </span>
            <span className={styles.cpuinfoColon}>: </span>
            <span className={styles.cpuinfoValues}>
              {TOOLS.map((t) => (
                <span key={t} className={styles.cpuinfoChip}>{t}</span>
              ))}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.procSection}>
        <span className={styles.bootShell}>$ ls /home/guilherme/projects</span>
        <ProcTable rows={PROJECTS} />
      </div>

      <div className={styles.procSection}>
        <span className={styles.bootShell}>$ cat /proc/self/interests</span>
        <div className={styles.interestTags}>
          {INTERESTS.map((i) => (
            <span key={i} className={styles.interestTag}>{i}</span>
          ))}
        </div>
      </div>

      <div className={styles.procSection}>
        <a
          href="/Resume_LaTeX_Compute.pdf"
          download
          className={styles.downloadCmd}
        >
          <span className={styles.bootShell}>$ wget</span>{' '}
          <span className={styles.downloadCmdPath}>/usr/share/resume.pdf</span>
        </a>
      </div>

      <div className={styles.quoteSection}>
        <span className={styles.quoteText}>&quot;No more terrible disaster could befall your people than for them to fall into the hands of a Hero.&quot;</span>
        <span className={styles.quoteAttribution}>— Pardot Kynes</span>
      </div>
    </section>
  );
}
