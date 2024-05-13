const outerRadius = 5;
const thickness = 1;
const innerRadius = outerRadius - thickness;

const param = {
  N: 100,
  height: 4,
  angle: Math.PI / 2,
  space: 1,
  thickness: thickness,
  outerRadius: outerRadius,
  innerRadius: innerRadius,
  diameter: outerRadius + innerRadius,
  objectsDistance: 200,
};

export { param };
