import { EventHandler } from "react";

export default function mergeHandler<T extends EventHandler<any> | undefined>(
  originalHandler: T,
  handler: T
) {
  const _originalHandler = originalHandler;
  return ((...args) => {
    _originalHandler?.(...args);
    handler?.(...args);
  }) as T;
}
