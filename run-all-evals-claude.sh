#!/usr/bin/env bash
set -uo pipefail

# run-all-evals-claude.sh — Run all evals with Claude Code and print a summary.
# Usage:
#   ./run-all-evals-claude.sh
#   ./run-all-evals-claude.sh --model opus

MODEL="opus"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --model) MODEL="${2:?--model requires a value}"; shift 2 ;;
    *) shift ;;
  esac
done

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
EVALS_DIR="$SCRIPT_DIR/evals"

PASS=0
FAIL=0
TOTAL=0
RESULTS=()

echo "========================================"
echo "  Running all evals with Claude Code"
echo "  Model: $MODEL"
echo "  Evals dir: $EVALS_DIR"
echo "========================================"
echo ""

START_TIME="$(date +%s)"

for eval_dir in "$EVALS_DIR"/*/; do
  eval_name="$(basename "$eval_dir")"
  TOTAL=$((TOTAL + 1))

  echo "--- [$TOTAL] $eval_name ---"

  if "$SCRIPT_DIR/run-eval-claude.sh" "evals/$eval_name" --model "$MODEL"; then
    PASS=$((PASS + 1))
    RESULTS+=("PASS  $eval_name")
  else
    FAIL=$((FAIL + 1))
    RESULTS+=("FAIL  $eval_name")
  fi

  echo ""
done

END_TIME="$(date +%s)"
DURATION=$((END_TIME - START_TIME))

echo "========================================"
echo "  SUMMARY (Claude Code / $MODEL)"
echo "========================================"
for r in "${RESULTS[@]}"; do
  echo "  $r"
done
echo ""
echo "  Total: $TOTAL | Pass: $PASS | Fail: $FAIL"
echo "  Duration: ${DURATION}s"
echo "========================================"

# Exit with failure if any eval failed
[ "$FAIL" -eq 0 ]
