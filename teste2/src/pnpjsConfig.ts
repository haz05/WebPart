// import { WebPartContext } from "@microsoft/sp-webpart-base";

// // import pnp and pnp logging system
// import { spfi, SPFI, SPFx } from "@pnp/sp";
// import { LogLevel, PnPLogging } from "@pnp/logging";
// import "@pnp/sp/webs";
// import "@pnp/sp/lists";
// import "@pnp/sp/items";
// import "@pnp/sp/batching";
// // @ts-ignore
// let  _sp: SPFI = null;

// export const getSP = (context?: WebPartContext): SPFI => {
//   if (_sp === null && context !== null) {
//     //You must add the @pnp/logging package to include the PnPLogging behavior it is no longer a peer dependency
//     // The LogLevel set's at what level a message will be written to the console
//     _sp = spfi().using(SPFx(context)).using(PnPLogging(LogLevel.Warning));
//   }
//   return _sp;
// };

import { WebPartContext } from "@microsoft/sp-webpart-base";
import { spfi, SPFI, SPFx, ISPFXContext } from "@pnp/sp";
import { LogLevel, PnPLogging } from "@pnp/logging";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/batching";

let _sp: SPFI;
// @ts-ignore
_sp = null;

export const getSP = (context?: WebPartContext): SPFI => {
  if (_sp === null && context !== undefined) { // Check for undefined here
    // Cast 'context' to ISPFXContext before passing it to SPFx
    _sp = spfi().using(SPFx(context as ISPFXContext)).using(PnPLogging(LogLevel.Warning));
  }
  return _sp;
};