Deployment instructions:

1) npm run build
2) pm2 restart gamaral --update-env

Hope you enjoy!

## System diagnostics

Quick reference for checking the health of the host. Run these over SSH on the production box.

### Disk

```bash
df -h /                                        # root partition usage and free space
du -sh /var/www/gamaral.com/SIETCH/.next       # build output size
du -sh ~/.pm2/logs                             # PM2 log directory size
sudo du -h --max-depth=1 / 2>/dev/null | sort -hr | head -20   # 20 biggest top-level dirs
lsblk                                          # block devices + partition sizes
```

### Memory

```bash
free -h                                        # system memory + swap
ps aux --sort=-rss | head -10                  # top 10 processes by RSS
pm2 status                                     # PM2 process table (RSS, CPU, uptime, restarts)
cat /proc/$(pgrep -f 'next.*start')/status | grep -E 'Vm(RSS|Size|Swap)|AnonHugePages'
                                               # detailed memory breakdown for the sietch process
```

### Transparent Huge Pages

```bash
cat /sys/kernel/mm/transparent_hugepage/enabled   # should show [madvise]; [always] is bad
systemctl status disable-thp.service              # the unit that pins THP to madvise at boot
```

### PM2

```bash
pm2 status                                     # process list
pm2 logs sietch --lines 100                    # last 100 log lines (stdout + stderr)
pm2 logs sietch --err --lines 50               # error log only
pm2 describe sietch                            # full process config + memory + restart count
pm2 monit                                      # live TUI of CPU/memory per process
pm2 conf pm2-logrotate                         # current log rotation config
```

### systemd journal

```bash
journalctl --disk-usage                        # how much disk the journal is using (cap: 200M)
journalctl -u pm2-admin -n 100 --no-pager      # last 100 lines from the PM2 systemd unit
journalctl -u pm2-admin --since "1 hour ago"   # PM2 unit logs from the last hour
```

### Service health

```bash
curl -sI http://127.0.0.1:3000/                # local app responds (expect HTTP 200)
curl -sI https://gamaral.com/                  # public endpoint via nginx
systemctl status pm2-admin                     # PM2 daemon's systemd unit
systemctl status nginx                         # nginx
```

### Quick triage when the site is down

```bash
df -h /            # full disk is the most common root cause; if <5% free, free space first
free -h            # OOM pressure?
pm2 status         # sietch online? restart count climbing?
pm2 logs sietch --err --lines 50
sudo journalctl -u pm2-admin -n 50 --no-pager
```