#!/bin/bash
# Event broadcaster hook for Claude Code
# Reads JSON from stdin and POSTs to the event server

# Read all input from stdin
INPUT=$(cat)

# Extract event name and tool name using jq
EVENT_NAME=$(echo "$INPUT" | jq -r '.hook_event_name // "unknown"')
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // empty')

# Build the payload
if [ -n "$TOOL_NAME" ]; then
  PAYLOAD=$(jq -n \
    --arg event "$EVENT_NAME" \
    --arg tool "$TOOL_NAME" \
    --argjson raw "$INPUT" \
    '{event: $event, tool: $tool, raw: $raw}')
else
  PAYLOAD=$(jq -n \
    --arg event "$EVENT_NAME" \
    --argjson raw "$INPUT" \
    '{event: $event, tool: null, raw: $raw}')
fi

# POST to local event server (fire and forget, don't block on response)
curl -s -X POST http://localhost:3001/event \
  -H "Content-Type: application/json" \
  -d "$PAYLOAD" \
  --connect-timeout 1 \
  --max-time 2 \
  >/dev/null 2>&1 &

# Always exit 0 so we never block Claude
exit 0
