import { FC, useMemo, MouseEvent, useState, useEffect, useRef } from "react";

type MatrisType = number[][];

interface ShapeProps {
  data: MatrisType;
}

const Shape: FC<ShapeProps> = ({ data }) => {
  const [selected, setSelected] = useState(new Set());
  const [unloading, setUnloading] = useState(false);
  const timerRef = useRef<number | undefined>(undefined);

  const boxes = useMemo(() => data.flat(Infinity) as number[], [data]);

  const countOfVisibleBoxes = useMemo(() => {
    return boxes.reduce((acc, box) => {
      if (box === 1) {
        acc += 1;
      }
      return acc;
    }, 0);
  }, [boxes]);

  const handleClickBoxes = (event: MouseEvent<HTMLDivElement>) => {
    const { target } = event;
    if (target instanceof HTMLDivElement) {
      const index = target.getAttribute("data-index");
      const status = target.getAttribute("data-status");

      if (
        index === null ||
        status === "hidden" ||
        selected.has(index) ||
        unloading
      ) {
        return;
      }
      setSelected((prev) => {
        return new Set(prev.add(index));
      });
    }
  };
  console.log("selected", selected);

  const unload = () => {
    setUnloading(true);
    const keys = Array.from(selected.keys());

    const removeNextKey = () => {
      if (keys.length) {
        const currentKey = keys.shift();

        setSelected((prev) => {
          const updatedKeys = new Set(prev);
          updatedKeys.delete(currentKey);
          return updatedKeys;
        });
        timerRef.current = setTimeout(removeNextKey, 500);
      } else {
        setUnloading(false);
        clearTimeout(timerRef.current);
      }
    };
    timerRef.current = setTimeout(removeNextKey, 100);
  };

  useEffect(() => {
    if (selected.size >= countOfVisibleBoxes) {
      unload();
    }
  }, [selected]);

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
