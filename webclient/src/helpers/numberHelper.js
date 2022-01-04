
/**
 * converts large numbers to short ones with suffix e.g. 2,000 => 2K
 */
export function toShorthand(num) {
  num = parseInt(num);
  if(!num) {
    return new TypeError(`Parameter num(${num}) must be a number!`);
  } 
  let suffixes = ['', 'Thousand', 'Million', 'Billion'];
  let suffixChangeConstant = 1000; 
  let suffixIndex = Math.floor(
    Math.log10(Math.abs(num))
    / Math.log10(suffixChangeConstant)
  );
  // prevent suffix out of bounds
  if(suffixIndex>suffixes.length-1) {
    suffixIndex = suffixes.length-1;
  }
  let suffix = " " + suffixes[suffixIndex];
  return (num/Math.pow(suffixChangeConstant, suffixIndex))
    .toFixed(2)
    + suffix;
}
