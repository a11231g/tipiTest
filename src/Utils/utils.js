export function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}
export function Capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
