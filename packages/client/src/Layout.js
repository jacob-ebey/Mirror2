import React, { useState, useEffect } from "react";
import GridLayout from "react-grid-layout";

function getWidth() {
  return window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;
}

function getHeight() {
  return window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;
}

export default function Layout({ config, modules }) {
  const [width, setWidth] = useState(getWidth());
  const [rowHeight, setRowHeight] = useState(getHeight() / config.grid.rows);

  useEffect(() => {
    const listener = () => {
      setWidth(getWidth());
      setRowHeight(getHeight() / config.grid.rows)
    };

    window.addEventListener("resize", listener);

    return () => {
      window.removeEventListener("resize", listener);
    }
  });

  const layout = config.modules.filter(mod => mod.name in modules).map((mod, key) => {
    return {
      ...mod.layout,
      i: key.toString()
    };
  });

  const { rows, ...gridProps } = config.grid;

  return (
    <GridLayout
      {...gridProps}
      layout={layout}
      width={width}
      rowHeight={rowHeight}
      margin={[0, 0]}
    >
      {config.modules.filter(mod => mod.name in modules).map((mod, key) => {
        const props = {
          ...modules[mod.name].defaults,
          ...mod.config,
        };

        const Component = modules[mod.name].component;

        return (
          <div key={key.toString()}>
            <Component {...props} />
          </div>
        );
      })}
    </GridLayout>
  );
}
