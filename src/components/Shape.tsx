import { FC, useMemo, MouseEvent, useState } from "react";

type MatrisType = number[][];

interface ShapeProps {
  data: MatrisType;
}

const Shape: FC<ShapeProps> = ({ data }) => {
  const boxes = useMemo(() => data.flat(Infinity), [data]);

  const [selected, setSelected] = useState(new Set());

  const handleClickBoxes = (event: MouseEvent<HTMLDivElement>) => {
    const { target } = event;
    if (target instanceof HTMLDivElement) {
      const index = target.getAttribute("data-index");
      const status = target.getAttribute("data-status");

      if (index === null || status === "hidden") {
        return;
      }
      setSelected((prev) => {
        return new Set(prev.add(index));
      });
    }
  };
  console.log("selected", selected);

  return (
    <div className="boxes" onClick={handleClickBoxes}>
      {boxes.map((box, index) => {
        const status = box === 1 ? "visible" : "hidden";
        const isSelected = selected.has(index.toString());
        return (
          <div
            key={`${box}-${index}`}
            className={`box ${status} ${isSelected ? "selected" : ""}`}
            data-index={index}
            data-status={status}
          />
        );
      })}
    </div>
  );
};
export default Shape;
