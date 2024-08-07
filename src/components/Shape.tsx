import { FC, useMemo, MouseEvent, useState, useEffect, useRef } from "react";

type MatrisType = number[][];

interface ShapeProps {
  boxes: MatrisType;
}

const Shape: FC<ShapeProps> = ({ boxes }) => {
  const [selected, setSelected] = useState(new Set());
  const [unloading, setUnloading] = useState(false);
  const timerRef = useRef<number | undefined>(undefined);

  /* It has some problem with other dementions of data*/
  // const boxes = useMemo(() => data.flat(Infinity) as number[], [data]);

  const countOfVisibleBoxes = useMemo(() => {
    return boxes.reduce((acc, row) => {
      row.forEach((column) => {
        if (column === 1) {
          acc += 1;
        }
      });

      return acc;
    }, 0);
  }, [boxes]);

  const handleClickBoxes = (event: MouseEvent<HTMLDivElement>) => {
    const { target } = event;
    if (target instanceof HTMLDivElement) {
      const index = target.getAttribute("data-index");
      // const status = target.getAttribute("data-status");

      if (index === null || selected.has(index) || unloading) {
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
    let index = 0;

    const removeNextKey = () => {
      if (keys[index]) {
        // const currentKey = keys.shift();
        const next = keys[index];
        index += 1;

        setSelected((prev) => {
          const updatedKeys = new Set(prev);
          updatedKeys.delete(next);
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
      {boxes.map((row, rowIndex) => {
        // const status = box === 1 ? "visible" : "hidden";
        // const isSelected = selected.has(index.toString());
        return (
          <div className="row" key={`${rowIndex}`}>
            {row.map((column, columnIndex) => {
              const identifier = `${rowIndex}-${columnIndex}`;
              const isSelected = selected.has(identifier);

              return column === 1 ? (
                <div
                  key={identifier}
                  // className={`box ${status} ${isSelected ? "selected" : ""}`}
                  className={`box ${isSelected ? "selected" : ""}`}
                  data-index={identifier}
                  // data-status={status}
                />
              ) : (
                <div key={identifier} className="box-placeholder" />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
export default Shape;
