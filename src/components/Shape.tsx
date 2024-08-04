import { FC, useMemo } from "react";

type MatrisType = number[][];

interface ShapeProps {
  data: MatrisType;
}

const Shape: FC<ShapeProps> = ({ data }) => {
  const boxes = useMemo(() => data.flat(Infinity), [data]);
  return (
    <div className="boxes">
      {boxes.map((box, index) => {
        return <div key={`${box}-${index}`} className="box"></div>;
      })}
    </div>
  );
};
export default Shape;
