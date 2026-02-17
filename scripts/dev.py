#!/usr/bin/env python
"""
Run KultureX development services from the monorepo root.

Default:
- Django API (backend)
- Next.js web app (web)

Optional:
- Expo mobile app (mobile) with --mobile
"""

from __future__ import annotations

import argparse
import os
import shutil
import subprocess
import sys
import threading
import time
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
BACKEND_DIR = ROOT / "backend"
WEB_DIR = ROOT / "web"
MOBILE_DIR = ROOT / "mobile"


def is_windows() -> bool:
    return os.name == "nt"


def resolve_backend_command() -> list[str]:
    candidates = [
        BACKEND_DIR / ".venv" / "Scripts" / "python.exe",  # Windows
        BACKEND_DIR / ".venv" / "bin" / "python",  # Unix
    ]
    for candidate in candidates:
        if candidate.exists():
            return [str(candidate), "manage.py", "runserver"]

    if is_windows():
        py_launcher = shutil.which("py")
        if py_launcher:
            return [py_launcher, "manage.py", "runserver"]

    return [sys.executable, "manage.py", "runserver"]


def resolve_npm_executable() -> str:
    if is_windows():
        npm_cmd = shutil.which("npm.cmd")
        if npm_cmd:
            return npm_cmd
    npm = shutil.which("npm")
    if npm:
        return npm
    return "npm"


def command_exists(name: str) -> bool:
    return shutil.which(name) is not None


def stream_output(name: str, proc: subprocess.Popen[str]) -> None:
    assert proc.stdout is not None
    for line in proc.stdout:
        print(f"[{name}] {line.rstrip()}")


def start_process(name: str, cmd: list[str], cwd: Path) -> tuple[subprocess.Popen[str], threading.Thread]:
    try:
        proc = subprocess.Popen(
            cmd,
            cwd=str(cwd),
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            bufsize=1,
        )
    except FileNotFoundError as exc:
        readable_cmd = " ".join(cmd)
        raise RuntimeError(
            f"Failed to start '{name}'. Command not found: {readable_cmd}",
        ) from exc
    thread = threading.Thread(target=stream_output, args=(name, proc), daemon=True)
    thread.start()
    return proc, thread


def stop_processes(processes: list[subprocess.Popen[str]]) -> None:
    for proc in processes:
        if proc.poll() is None:
            proc.terminate()
    for proc in processes:
        if proc.poll() is None:
            try:
                proc.wait(timeout=5)
            except subprocess.TimeoutExpired:
                proc.kill()


def main() -> int:
    parser = argparse.ArgumentParser(description="Start KultureX development services.")
    parser.add_argument(
        "--mobile",
        action="store_true",
        help="Also start the React Native Expo app from mobile/.",
    )
    args = parser.parse_args()

    npm_executable = resolve_npm_executable()
    if not command_exists(Path(npm_executable).name):
        print("Error: npm is not available in PATH.", file=sys.stderr)
        return 1

    backend_cmd = resolve_backend_command()

    services: list[tuple[str, list[str], Path]] = [
        ("api", backend_cmd, BACKEND_DIR),
        ("web", [npm_executable, "run", "dev"], WEB_DIR),
    ]
    if args.mobile:
        services.append(("mobile", [npm_executable, "run", "start"], MOBILE_DIR))

    processes: list[subprocess.Popen[str]] = []
    threads: list[threading.Thread] = []

    print("Starting KultureX services...")
    for name, cmd, cwd in services:
        proc, thread = start_process(name, cmd, cwd)
        processes.append(proc)
        threads.append(thread)

    try:
        while True:
            for index, proc in enumerate(processes):
                return_code = proc.poll()
                if return_code is not None:
                    print(f"\nService exited: {services[index][0]} (code {return_code})", file=sys.stderr)
                    stop_processes(processes)
                    return return_code
            time.sleep(0.5)
    except KeyboardInterrupt:
        print("\nStopping services...")
        stop_processes(processes)
        return 0


if __name__ == "__main__":
    raise SystemExit(main())
