import { EventHandler } from "react";

export default function pipeEventHandlers<T extends EventHandler<any> | undefined>(...mergeableEvents: T[]) {
  return ((...args) => {
    for(const event of mergeableEvents){
      event?.(...args)
    }
  }) as T;
}


// export default function mergeHandler<T extends EventHandler<any> | undefined>(
//   originalHandler: T,
//   handler: T
// ) {
//   const _originalHandler = originalHandler;
//   return ((...args) => {
//     _originalHandler?.(...args);
//     handler?.(...args);
//   }) as T;
// }