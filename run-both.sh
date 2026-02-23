#!/usr/bin/env bash
set -uo pipefail

# run-both.sh — Run all evals with both opencode and Claude Code in parallel.
# Usage:
#   ./run-both.sh
#   ./run-both.sh --opencode-model nvidia/moonshotai/kimi-k2.5 --claude-model sonnet

OPENCODE_MODEL="nvidia/moonshotai/kimi-k2.5"
CLAUDE_MODEL="sonnet"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --opencode-model) OPENCODE_MODEL="${2:?--opencode-model requires a value}"; shift 2 ;;
    --claude-model)   CLAUDE_MODEL="${2:?--claude-model requires a value}"; shift 2 ;;
    *) shift ;;
  esac
done

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
LOGS_DIR="$SCRIPT_DIR/results"
mkdir -p "$LOGS_DIR"

TIMESTAMP="$(date +%Y%m%d-%H%M%S)"
OPENCODE_LOG="$LOGS_DIR/run-all-opencode_${TIMESTAMP}.log"
CLAUDE_LOG="$LOGS_DIR/run-all-claude_${TIMESTAMP}.log"

echo "========================================"
echo "  Running both agents in parallel"
echo "  OpenCode model: $OPENCODE_MODEL"
echo "  Claude model:   $CLAUDE_MODEL"
echo "========================================"
echo ""
echo "  OpenCode log: $OPENCODE_LOG"
echo "  Claude log:   $CLAUDE_LOG"
echo ""

# Launch both in background
"$SCRIPT_DIR/run-all-evals.sh" --model "$OPENCODE_MODEL" > "$OPENCODE_LOG" 2>&1 &
PID_OPENCODE=$!

"$SCRIPT_DIR/run-all-evals-claude.sh" --model "$CLAUDE_MODEL" > "$CLAUDE_LOG" 2>&1 &
PID_CLAUDE=$!

echo "  OpenCode PID: $PID_OPENCODE"
echo "  Claude PID:   $PID_CLAUDE"
echo ""
echo "  Waiting for both to finish..."
echo "  (tail -f the log files to watch progress)"
echo ""

# Wait for both, capture exit codes
set +e
wait $PID_OPENCODE
EXIT_OPENCODE=$?
wait $PID_CLAUDE
EXIT_CLAUDE=$?
set -e

echo "========================================"
echo "  BOTH FINISHED"
echo "========================================"
echo ""

# Print the summary section from each log
echo "--- OpenCode Results ---"
grep -A 100 "SUMMARY" "$OPENCODE_LOG" || echo "  (no summary found — check $OPENCODE_LOG)"
echo ""

echo "--- Claude Code Results ---"
grep -A 100 "SUMMARY" "$CLAUDE_LOG" || echo "  (no summary found — check $CLAUDE_LOG)"
echo ""

# Overall
if [ $EXIT_OPENCODE -eq 0 ] && [ $EXIT_CLAUDE -eq 0 ]; then
  echo "Both agents passed all evals."
else
  echo "Some evals failed. Check logs for details."
fi
