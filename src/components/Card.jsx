import React from "react";
import { useDispatch } from "react-redux";
import { sortableElement } from "react-sortable-hoc";
import { editTodo, removeTodo } from "../redux/todoSlice";

const Card = sortableElement(({ title, details, id }) => {
  const dispatch = useDispatch();
  return (
    <div className="bg-slate-100  rounded-sm px-3 py-3 m-1 my-3 cursor-move ">
      <h1 className="font-bold capitalize ">{title}</h1>
      <p>{details}</p>
      <hr className="my-2" />
      <div className="flex gap-10">
        <span
          className="cursor-pointer inline-block"
          onClick={() => dispatch(editTodo(id))}
        >
          &nbsp; 📝 Update &nbsp;
        </span>
        <span
          className="cursor-pointer inline-block"
          onClick={() => dispatch(removeTodo(id))}
        >
          &nbsp; 🗑️ Delete &nbsp;
        </span>
      </div>
    </div>
  );
});

export default Card;
