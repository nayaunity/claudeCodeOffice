#!/bin/bash
# Test script for verifying the event server

BASE_URL="http://localhost:3001"

echo "=== Claude Code Office Event Server Test ==="
echo ""

# Test 1: Health check
echo "1. Health check..."
curl -s "$BASE_URL/health" | jq .
echo ""

# Test 2: Session start
echo "2. Sending SessionStart event..."
curl -s -X POST "$BASE_URL/event" \
  -H "Content-Type: application/json" \
  -d '{
    "event": "SessionStart",
    "tool": null,
    "raw": {
      "hook_event_name": "SessionStart",
      "session_id": "test-session-123",
      "cwd": "/test/project"
    }
  }' | jq .
echo ""

# Test 3: PreToolUse (Read)
echo "3. Sending PreToolUse (Read) event..."
curl -s -X POST "$BASE_URL/event" \
  -H "Content-Type: application/json" \
  -d '{
    "event": "PreToolUse",
    "tool": "Read",
    "raw": {
      "hook_event_name": "PreToolUse",
      "session_id": "test-session-123",
      "tool_name": "Read",
      "tool_input": {
        "file_path": "/test/project/src/index.ts"
      }
    }
  }' | jq .
echo ""

# Test 4: PostToolUse (success)
echo "4. Sending PostToolUse event..."
curl -s -X POST "$BASE_URL/event" \
  -H "Content-Type: application/json" \
  -d '{
    "event": "PostToolUse",
    "tool": "Read",
    "raw": {
      "hook_event_name": "PostToolUse",
      "session_id": "test-session-123",
      "tool_name": "Read"
    }
  }' | jq .
echo ""

# Test 5: PreToolUse (Bash)
echo "5. Sending PreToolUse (Bash) event..."
curl -s -X POST "$BASE_URL/event" \
  -H "Content-Type: application/json" \
  -d '{
    "event": "PreToolUse",
    "tool": "Bash",
    "raw": {
      "hook_event_name": "PreToolUse",
      "session_id": "test-session-123",
      "tool_name": "Bash",
      "tool_input": {
        "command": "npm test",
        "description": "Run tests"
      }
    }
  }' | jq .
echo ""

# Test 6: PostToolUseFailure
echo "6. Sending PostToolUseFailure event..."
curl -s -X POST "$BASE_URL/event" \
  -H "Content-Type: application/json" \
  -d '{
    "event": "PostToolUseFailure",
    "tool": "Bash",
    "raw": {
      "hook_event_name": "PostToolUseFailure",
      "session_id": "test-session-123",
      "tool_name": "Bash"
    }
  }' | jq .
echo ""

# Test 7: Stop
echo "7. Sending Stop event..."
curl -s -X POST "$BASE_URL/event" \
  -H "Content-Type: application/json" \
  -d '{
    "event": "Stop",
    "tool": null,
    "raw": {
      "hook_event_name": "Stop",
      "session_id": "test-session-123"
    }
  }' | jq .
echo ""

# Final status
echo "8. Final status check..."
curl -s "$BASE_URL/status" | jq .
echo ""

echo "=== Tests complete ==="
echo "If you have a WebSocket client connected, you should have seen 7 events broadcast."
