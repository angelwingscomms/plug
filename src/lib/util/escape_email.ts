export const escape_email = (input: string): string => input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace('@', '_at_');
