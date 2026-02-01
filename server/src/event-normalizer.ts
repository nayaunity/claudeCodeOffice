import { HookPayload, AnimationState, AnimationEvent } from './types';

// Map tool names to animation states
function mapToolToAnimation(toolName: string): AnimationState {
  switch (toolName) {
    case 'Edit':
    case 'Write':
    case 'NotebookEdit':
      return 'typing';

    case 'Read':
    case 'Glob':
      return 'reading';

    case 'Grep':
    case 'WebSearch':
      return 'searching';

    case 'Bash':
      return 'terminal';

    case 'WebFetch':
      return 'browsing';

    case 'Task':
      return 'delegating';

    case 'AskUserQuestion':
      return 'waiting';

    default:
      return 'thinking';
  }
}

// Get human-readable description for the action
function getDescription(payload: HookPayload): string | undefined {
  const { event, tool, raw } = payload;

  if (event === 'SessionStart') return 'Starting session';
  if (event === 'SessionEnd') return 'Ending session';
  if (event === 'Stop') return 'Finished responding';
  if (event === 'Notification') return 'Waiting for user input';

  if (tool && raw.tool_input) {
    const input = raw.tool_input;

    switch (tool) {
      case 'Bash':
        return `Running: ${(input.command as string)?.slice(0, 50) || 'command'}`;
      case 'Read':
        return `Reading: ${(input.file_path as string)?.split('/').pop() || 'file'}`;
      case 'Edit':
        return `Editing: ${(input.file_path as string)?.split('/').pop() || 'file'}`;
      case 'Write':
        return `Writing: ${(input.file_path as string)?.split('/').pop() || 'file'}`;
      case 'Grep':
        return `Searching for: ${(input.pattern as string)?.slice(0, 30) || 'pattern'}`;
      case 'Glob':
        return `Finding files: ${(input.pattern as string) || 'pattern'}`;
      case 'WebFetch':
        return `Fetching: ${(input.url as string)?.slice(0, 40) || 'URL'}`;
      case 'WebSearch':
        return `Searching web: ${(input.query as string)?.slice(0, 30) || 'query'}`;
      case 'Task':
        return `Delegating: ${(input.description as string) || 'task'}`;
      case 'AskUserQuestion':
        return 'Asking a question';
      default:
        return `Using ${tool}`;
    }
  }

  return undefined;
}

// Normalize a hook payload into an animation event
export function normalizeEvent(payload: HookPayload): AnimationEvent {
  const { event, tool, raw } = payload;
  let animation: AnimationState;

  switch (event) {
    case 'SessionStart':
      animation = 'entering';
      break;

    case 'SessionEnd':
      animation = 'leaving';
      break;

    case 'Stop':
      animation = 'idle';
      break;

    case 'Notification':
      animation = 'waiting';
      break;

    case 'PostToolUseFailure':
      animation = 'error';
      break;

    case 'PostToolUse':
      animation = 'success';
      break;

    case 'PreToolUse':
      animation = tool ? mapToolToAnimation(tool) : 'thinking';
      break;

    case 'SubagentStart':
      animation = 'delegating';
      break;

    case 'SubagentStop':
      animation = 'thinking';
      break;

    default:
      animation = 'thinking';
  }

  return {
    type: event === 'Stop' || event === 'SessionStart' || event === 'SessionEnd'
      ? 'state_change'
      : 'activity',
    animation,
    tool: tool || undefined,
    description: getDescription(payload),
    timestamp: Date.now(),
    sessionId: raw.session_id,
  };
}
