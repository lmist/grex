import Logger from "https://deno.land/x/logger@v1.0.2/logger.ts";


// interface fileLoggerOptions {
//   rotate?: boolean;  // cut by day
//   maxBytes?: number, // the maximum size in bytes that the log file can grow to before rolling over to a new one
//   maxBackupCount?: number // maxBackupCount must work with maxBytes
// }
//
// interface LoggerInterface {
//   // constructor() {}
//
//   info(...args: unknown[]): void
//   warn(...args: unknown[]): void
//   error(...args: unknown[]): void
//
//   async initFileLogger(dir: string, options: fileLoggerOptions = {}): Promise<void>
//
//   disableConsole(): void
//   enableConsole(): void
//
//   disableFile(): void;
//   enableFile(): void;
//
//   disable(): void;
//   enable(): void;
// }

export const logger = new Logger();
