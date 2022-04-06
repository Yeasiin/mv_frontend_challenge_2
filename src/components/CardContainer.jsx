import React from "react";
import { sortableContainer } from "react-sortable-hoc";

export const SortableContainer = sortableContainer(({ children }) => {
  return (
    <div className="max-w-2xl mx-auto bg-white shadow p-3 mb-10 ">
      {children}
    </div>
  );
});

export default SortableContainer;
