// Raw hook event from Claude Code
export interface HookEvent {
  session_id?: string;
  transcript_path?: string;
  cwd?: string;
  hook_event_name: string;
  tool_name?: string;
  tool_input?: Record<string, unknown>;
}

// Incoming POST payload from hook script
export interface HookPayload {
  event: string;
  tool: string | null;
  raw: HookEvent;
}

// Animation states for the mobile app
export type AnimationState =
  | 'idle'        // No activity, character at rest
  | 'thinking'    // Between tool calls, processing
  | 'typing'      // Edit, Write tools
  | 'reading'     // Read, Glob tools
  | 'searching'   // Grep, WebSearch tools
  | 'terminal'    // Bash tool
  | 'browsing'    // WebFetch tool
  | 'delegating'  // Task tool (subagent)
  | 'waiting'     // Notification (needs user input)
  | 'success'     // PostToolUse (brief celebration)
  | 'error'       // PostToolUseFailure
  | 'entering'    // SessionStart
  | 'leaving';    // SessionEnd

// Normalized event sent to clients
export interface AnimationEvent {
  type: 'activity' | 'state_change';
  animation: AnimationState;
  tool?: string;
  description?: string;
  timestamp: number;
  sessionId?: string;
}
