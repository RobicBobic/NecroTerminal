import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Terminal, Cpu, HardDrive, Activity, Zap, Shield, Code, Database, Wifi, Battery } from 'lucide-react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentPath, setCurrentPath] = useState('/home/necro');
  const [isConnected, setIsConnected] = useState(true);
  const [cpuUsage, setCpuUsage] = useState(0);
  const [memUsage, setMemUsage] = useState(0);
  const [networkActivity, setNetworkActivity] = useState(0);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  // Simulated system stats
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(Math.random() * 100);
      setMemUsage(Math.random() * 100);
      setNetworkActivity(Math.random() * 100);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Auto-focus input
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Auto-show welcome and help on startup
  useEffect(() => {
    const welcomeEntry = {
      command: 'welcome',
      output: [
        '███╗   ██╗███████╗ ██████╗██████╗  ██████╗',
        '████╗  ██║██╔════╝██╔════╝██╔══██╗██╔═══██╗',
        '██╔██╗ ██║█████╗  ██║     ██████╔╝██║   ██║',
        '██║╚██╗██║██╔══╝  ██║     ██╔══██╗██║   ██║',
        '██║ ╚████║███████╗╚██████╗██║  ██║╚██████╔╝',
        '╚═╝  ╚═══╝╚══════╝ ╚═════╝╚═╝  ╚═╝ ╚═════╝',
        '',
        '████████╗███████╗██████╗ ███╗   ███╗██╗███╗   ██╗ █████╗ ██╗     ',
        '╚══██╔══╝██╔════╝██╔══██╗████╗ ████║██║████╗  ██║██╔══██╗██║     ',
        '   ██║   █████╗  ██████╔╝██╔████╔██║██║██╔██╗ ██║███████║██║     ',
        '   ██║   ██╔══╝  ██╔══██╗██║╚██╔╝██║██║██║╚██╗██║██╔══██║██║     ',
        '   ██║   ███████╗██║  ██║██║ ╚═╝ ██║██║██║ ╚████║██║  ██║███████╗',
        '   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝',
        '',
        '◆ NECRO-OS v3.14.159 [QUANTUM EDITION] ◆',
        '◆ Darknet Terminal Interface Activated ◆',
        '◆ Unauthorized access will be terminated ◆',
        '',
        '◆ System Status: OPERATIONAL',
        '◆ Quantum Core: STABLE',
        '◆ Neural Link: ESTABLISHED',
        '◆ Shadow Network: CONNECTED',
        '',
        'Type "help" to view available commands',
        'Type "matrix" to enter the digital realm',
        'Type "hack" to initialize infiltration protocols',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
      ]
    };
    setHistory([welcomeEntry]);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const commands = {
    help: () => [
      'NECRO TERMINAL v2.1.4 - Available Commands:',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      'help        - Show this help menu',
      'clear       - Clear terminal screen',
      'ls          - List directory contents',
      'pwd         - Show current directory',
      'cd [dir]    - Change directory',
      'cat [file]  - Display file contents',
      'ps          - Show running processes',
      'top         - Display system resources',
      'netstat     - Show network connections',
      'hack        - Initialize hacking protocol',
      'matrix      - Enter the matrix',
      'scan        - Scan for vulnerabilities',
      'whoami      - Display current user',
      'date        - Show current date/time',
      'uname       - System information',
      'exit        - Close terminal'
    ],
    
    clear: () => {
      setHistory([]);
      return [];
    },
    
    ls: () => [
      'drwxr-xr-x  4 necro necro  4096 Aug 31 14:32 documents/',
      'drwxr-xr-x  2 necro necro  4096 Aug 31 14:30 downloads/',
      '-rw-r--r--  1 necro necro  1337 Aug 31 14:25 secrets.txt',
      '-rwxr-xr-x  1 necro necro  8192 Aug 31 14:20 exploit.bin',
      'drwxr-xr-x  3 necro necro  4096 Aug 31 14:15 projects/',
      '-rw-r--r--  1 necro necro   256 Aug 31 14:10 .hidden'
    ],
    
    pwd: () => [currentPath],
    
    cd: (args) => {
      const dir = args[0] || '/home/necro';
      setCurrentPath(dir);
      return [`Changed directory to ${dir}`];
    },
    
    cat: (args) => {
      const file = args[0];
      if (!file) return ['cat: missing file operand'];
      
      const files = {
        'secrets.txt': [
          '████ CLASSIFIED INFORMATION ████',
          'Project: NECRO-NET',
          'Status: ACTIVE',
          'Clearance Level: OMEGA',
          'Access Code: NX-7749-DELTA',
          '████████████████████████████████'
        ],
        '.hidden': [
          'You found the hidden file!',
          'Congratulations, digital archaeologist.',
          'The shadows hold many secrets...'
        ]
      };
      
      return files[file] || [`cat: ${file}: No such file or directory`];
    },
    
    ps: () => [
      'PID    USER     %CPU  %MEM  COMMAND',
      '1337   necro    15.2   8.4  /usr/bin/necro-core',
      '1984   necro     3.1   2.1  /bin/shadow-daemon',
      '2077   necro    45.7  12.3  ./quantum-parser',
      '3141   necro     0.8   1.2  /usr/sbin/crypto-miner',
      '4096   necro     2.3   0.9  [kernel-ghost]',
      '6666   necro    88.9  25.1  ./matrix-interface'
    ],
    
    top: () => [
      'NECRO SYSTEM MONITOR',
      '━━━━━━━━━━━━━━━━━━━━━',
      `CPU Usage: ${cpuUsage.toFixed(1)}%`,
      `Memory: ${memUsage.toFixed(1)}% of 32GB`,
      `Network: ${networkActivity.toFixed(1)} Mbps`,
      `Uptime: 13:37:42`,
      `Load: 0.${Math.floor(Math.random() * 99)} 0.${Math.floor(Math.random() * 99)} 0.${Math.floor(Math.random() * 99)}`,
      `Processes: 256 total, 128 running`
    ],
    
    netstat: () => [
      'Active Network Connections:',
      'tcp4  0.0.0.0:22      ESTABLISHED  (ssh)',
      'tcp4  0.0.0.0:80      LISTENING    (http)',
      'tcp4  0.0.0.0:443     LISTENING    (https)',
      'tcp4  0.0.0.0:1337    LISTENING    (necro-net)',
      'udp4  0.0.0.0:53      *.*          (dns)',
      'tcp6  ::1:6666        ESTABLISHED  (matrix)'
    ],
    
    hack: () => [
      'Initializing NECRO hacking protocol...',
      '▓▓▓▓▓▓▓▓▓▓ 100%',
      '',
      '████████████████████████████████████████',
      '█ BREACH PROTOCOL ACTIVATED           █',
      '█                                     █',  
      '█ > Scanning target network...        █',
      '█ > 192.168.1.1 [FIREWALL DETECTED]   █',
      '█ > Injecting payload...              █',
      '█ > Exploiting buffer overflow...     █',
      '█ > Escalating privileges...          █',
      '█ > ROOT ACCESS GRANTED               █',
      '█                                     █',
      '█ STATUS: SYSTEM COMPROMISED          █',
      '████████████████████████████████████████',
      '',
      'WARNING: Unauthorized access detected',
      'Firewall bypassed successfully',
      'Welcome to the dark side of the net...',
      '',
      '> All your base are belong to us'
    ],
    
    matrix: () => [
      '████████████████████████████████████████████████████████████████████',
      '█                                                                  █',
      '█  ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄  █',
      '█  ██ ██ ██ ██ ██ ██ ██ ██ ██ ██ ██ ██ ██ ██ ██ ██ ██ ██ ██ ██  █',
      '█  ██ THE MATRIX HAS YOU, NEO...                              ██  █',
      '█  ██                                                        ██  █',
      '█  ██    Wake up, Neo...                                     ██  █',
      '█  ██    The Matrix has you...                               ██  █',
      '█  ██    Follow the white rabbit.                            ██  █',
      '█  ██                                                        ██  █',
      '█  ██    Knock, knock, Neo.                                  ██  █',
      '█  ██                                                        ██  █',
      '█  ██    ┌─┐ ┬ ┬ ┌─┐ ┬┌─┬ ┬ ┌┐┌   ┌─┐ ┬─┐   ┌┐ ┬  ┬ ┬ ┌─┐      ██  █',
      '█  ██    │   ├─┤ │ │ │├┴┐└┬┘ │││   │ │ ├┬┘   ├┴┐│  │ │ │ │      ██  █',
      '█  ██    └─┘ ┴ ┴ └─┘ ┴ ┴ ┴  ┘└┘   └─┘ ┴└─   └─┘┴─┘└─┘ └─┘      ██  █',
      '█  ██                                                        ██  █',
      '█  ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  █',
      '█                                                                  █',
      '████████████████████████████████████████████████████████████████████',
      '',
      'Welcome to the Matrix, Neo.',
      'You have been living in a dream world.',
      'This is your last chance. After this, there is no going back.',
      '',
      'The choice is yours: Red pill or blue pill?'
    ],
    
    scan: () => [
      '████████████████████████████████████████████████████████████████████',
      '█                    VULNERABILITY SCANNER v3.0                   █',
      '████████████████████████████████████████████████████████████████████',
      '',
      'Initializing deep packet inspection...',
      'Scanning network topology...',
      'Probing target: 192.168.1.0/24',
      '',
      '┌─────────────────────────────────────────────────────────────────┐',
      '│ PORT SCAN RESULTS                                               │',
      '├─────────────────────────────────────────────────────────────────┤',
      '│ 22/tcp    OPEN    SSH-2.0-OpenSSH_8.9                          │',
      '│ 80/tcp    OPEN    Apache/2.4.41                                 │',
      '│ 443/tcp   OPEN    nginx/1.18.0                                  │',
      '│ 3306/tcp  OPEN    MySQL 8.0.28                                  │',
      '│ 8080/tcp  OPEN    Jetty 9.4.43                                  │',
      '└─────────────────────────────────────────────────────────────────┘',
      '',
      'VULNERABILITIES DETECTED:',
      'CVE-2022-0778: Infinite loop in BN_mod_sqrt()',
      'CVE-2021-44228: Log4j RCE vulnerability',
      'CVE-2019-14287: Sudo privilege escalation',
      '',
      'CRITICAL: 3 high-severity vulnerabilities found',
      'BACKDOORS: 2 potential entry points identified',
      'TARGET STATUS: COMPROMISABLE',
      '',
      'Scan complete. Infiltration vectors ready for deployment.'
    ],
    
    whoami: () => ['necro'],
    
    date: () => [new Date().toString()],
    
    uname: () => [
      'NECRO-OS 2.1.4-DARKNET',
      'Kernel: Linux necro-kernel 5.15.0-necro',
      'Architecture: x86_64',
      'Processor: Intel(R) Quantum Core(TM) i9-13900KS'
    ],
    
    exit: () => {
      setIsConnected(false);
      return ['Connection terminated. Farewell, digital wanderer.'];
    }
  };

  const executeCommand = useCallback((cmd) => {
    const parts = cmd.trim().split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);
    
    if (command === '') return [];
    
    if (commands[command]) {
      return commands[command](args);
    } else {
      return [`necro: command not found: ${command}`];
    }
  }, [commands, cpuUsage, memUsage, networkActivity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newEntry = {
      command: input,
      output: executeCommand(input)
    };

    setHistory(prev => [...prev, newEntry]);
    setCommandHistory(prev => [input, ...prev.slice(0, 49)]); // Keep last 50 commands
    setHistoryIndex(-1);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <div className="terminal-container">
      {/* Header Bar */}
      <div className="header">
        <div className="header-left">
          <Terminal size={20} color="white" />
          <span className="title">NECRO TERMINAL</span>
          <div className="connection-status">
            <div className={`status-dot ${isConnected ? 'connected' : 'disconnected'}`}></div>
            <span>{isConnected ? 'CONNECTED' : 'DISCONNECTED'}</span>
          </div>
        </div>
        
        <div className="header-right">
          <div className="stat-item">
            <Cpu size={12} />
            <span>{cpuUsage.toFixed(0)}%</span>
          </div>
          <div className="stat-item">
            <HardDrive size={12} />
            <span>{memUsage.toFixed(0)}%</span>
          </div>
          <div className="stat-item">
            <Activity size={12} />
            <span>{networkActivity.toFixed(0)}M</span>
          </div>
        </div>
      </div>

      {/* Terminal Content */}
      <div 
        ref={terminalRef}
        className="terminal-content"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Command History */}
        {history.map((entry, index) => (
          <div key={index} className="command-entry">
            {entry.command !== 'welcome' && (
              <div className="command-line">
                <span className="prompt">necro@darknet:</span>
                <span className="path">{currentPath}</span>
                <span className="dollar">$</span>
                <span className="command-text">{entry.command}</span>
              </div>
            )}
            <div className={entry.command === 'welcome' ? 'welcome-output' : 'command-output'}>
              {entry.output.map((line, lineIndex) => (
                <div key={lineIndex} className="output-line">
                  {line}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Input Line */}
        <div className="input-line">
          <span className="prompt">necro@darknet:</span>
          <span className="path">{currentPath}</span>
          <span className="dollar">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSubmit(e);
              } else {
                handleKeyDown(e);
              }
            }}
            className="terminal-input"
            autoComplete="off"
            spellCheck={false}
          />
          <div className="cursor"></div>
        </div>
      </div>

      {/* Footer - Complete v28 Version with All Sections */}
      <div className="footer">
        {/* Main Footer Bar */}
        <div className="footer-main">
          <span>ESC: Clear | TAB: Autocomplete | ↑↓: History</span>
          <div className="footer-right">
            <div className="footer-item">
              <Database size={12} />
              <span>NECRO-NET</span>
            </div>
            <div className="footer-item">
              <Zap size={12} />
              <span>QUANTUM</span>
            </div>
          </div>
        </div>

        {/* System Status Bar */}
        <div className="status-bars">
          <div className="status-bar">
            <div className="status-header">
              <div className="status-label">SOULS</div>
              <div className="status-value">{cpuUsage.toFixed(0)}%</div>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${cpuUsage}%` }}></div>
            </div>
          </div>

          <div className="status-bar">
            <div className="status-header">
              <div className="status-label">DARK ENERGY</div>
              <div className="status-value">{memUsage.toFixed(0)}%</div>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${memUsage}%` }}></div>
            </div>
          </div>

          <div className="status-bar">
            <div className="status-header">
              <div className="status-label">SHADOW NET</div>
              <div className="status-value">{networkActivity.toFixed(0)}%</div>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${networkActivity}%` }}></div>
            </div>
          </div>

          <div className="status-bar">
            <div className="status-header">
              <div className="status-label">VOID LEVEL</div>
              <div className="status-value">{Math.floor(35 + cpuUsage * 0.3)}</div>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${Math.min(100, 35 + cpuUsage * 0.65)}%` }}></div>
            </div>
          </div>
        </div>

        {/* Additional Info Bar */}
        <div className="system-info">
          <div className="system-info-left">
            <div className="info-item">
              <Shield size={12} />
              <span>CRYPT SHIELD: ACTIVE</span>
            </div>
            <div className="info-item">
              <Wifi size={12} />
              <span>NECRO NET: LINKED</span>
            </div>
            <div className="info-item">
              <Battery size={12} />
              <span>LIFE FORCE: ∞</span>
            </div>
          </div>
          
          <div className="system-info-right">
            <div className="info-item">
              <Code size={12} />
              <span>RITUAL: #{Math.floor(Math.random() * 9000) + 1000}</span>
            </div>
            <div className="info-item">
              <div className="live-dot"></div>
              <span>UNDEAD</span>
            </div>
          </div>
        </div>

        {/* Extended Footer Information */}
        <div className="extended-footer">
          <div className="footer-grid-3">
            <div className="info-panel">
              <div className="panel-title">ACTIVE PROCESSES</div>
              <div className="panel-content">
                <div>shadow-daemon.exe</div>
                <div>soul-harvester.bin</div>
                <div>void-listener.sys</div>
                <div>necro-core.dll</div>
              </div>
            </div>
            
            <div className="info-panel">
              <div className="panel-title">NETWORK STATUS</div>
              <div className="panel-content">
                <div>Darknet Nodes: 1,337</div>
                <div>Shadow Peers: 666</div>
                <div>Encrypted Tunnels: 13</div>
                <div>Quantum Links: 7</div>
              </div>
            </div>
            
            <div className="info-panel">
              <div className="panel-title">SYSTEM LOGS</div>
              <div className="panel-content">
                <div>[WARN] Soul capacity: 95%</div>
                <div>[INFO] Void breach sealed</div>
                <div>[OK] Crypt sync complete</div>
                <div>[ALERT] Unknown entity detected</div>
              </div>
            </div>
          </div>

          <div className="footer-grid-2">
            <div className="info-panel">
              <div className="panel-title">THREAT MATRIX</div>
              <div className="panel-content">
                <div className="data-row">
                  <span>Intrusion Attempts</span>
                  <span>247</span>
                </div>
                <div className="data-row">
                  <span>Blocked Entities</span>
                  <span>1,984</span>
                </div>
                <div className="data-row">
                  <span>Quarantined Souls</span>
                  <span>42</span>
                </div>
              </div>
            </div>
            
            <div className="info-panel">
              <div className="panel-title">DIMENSIONAL STATUS</div>
              <div className="panel-content">
                <div className="data-row">
                  <span>Reality Stability</span>
                  <span>78.3%</span>
                </div>
                <div className="data-row">
                  <span>Void Resonance</span>
                  <span>-2.7 Hz</span>
                </div>
                <div className="data-row">
                  <span>Quantum Phase</span>
                  <span>φ = π/4</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;