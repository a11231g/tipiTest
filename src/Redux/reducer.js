/**
 * rootreducer anad whitelist for presisting state
 */

import auth from "./Modules/auth";
import filmImage from './Modules/filmImage';


const rootReducres = {
  auth,
  filmImage

};

const whitelist = [
  "auth",
  "filmImage"
];

export { rootReducres, whitelist };
