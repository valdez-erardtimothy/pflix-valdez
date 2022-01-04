
/* for generating rgba(r,g,b,a) strings for ChartJS  */
export const generateRGBAStrings = (count) => {
  let backgroundColor = [];
  let borderColor = [];
  [...Array(count)].forEach(()=> {
    let r = Math.round(Math.random()*255);
    let g = Math.round(Math.random()*255);
    let b = Math.round(Math.random()*255);
    backgroundColor.push(`rgba(${r},${g},${b},0.4)`);
    borderColor.push(`rgba(${r},${g},${b},1.0)`);
  });
  return { backgroundColor, borderColor};
};

