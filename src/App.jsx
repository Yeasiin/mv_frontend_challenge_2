import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, setTodo, clearInput, reArrange } from "./redux/todoSlice";
import { arrayMoveImmutable } from "array-move";
import SortableContainer from "./components/CardContainer";
import Card from "./components/Card";

function App() {
  const dispatch = useDispatch();
  const { todo, todoLists } = useSelector((state) => state.todos);

  const [title, setTitle] = useState(todo.title);
  const [details, setDetails] = useState(todo.details);

  const createTodo = () => {
    // basic validation (no empty Value on todo list)
    if (title === "" || details === "") {
      console.log("filed can't be empty");
      return;
    }
    dispatch(addTodo(todo));
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    dispatch(reArrange(arrayMoveImmutable(todoLists, oldIndex, newIndex)));
  };

  // Set input value on change
  useEffect(() => {
    setTitle(todo.title);
    setDetails(todo.details);
  }, [todo]);

  return (
    <div className="text-[#03002E]  ">
      <h2 className="text-center font-bold text-xl mb-2 py-3 bg-slate-100">
        Todo List
      </h2>
      <div className="max-w-lg mx-auto my-5 py-8 px-6 shadow ">
        <div className="flex flex-col">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="border-2 py-1 px-2 mt-2"
            placeholder="Title"
            value={todo.title}
            onChange={(e) =>
              dispatch(setTodo({ ...todo, title: e.target.value }))
            }
          />
        </div>
        <div className="flex flex-col mt-5">
          <label htmlFor="title">Details</label>
          <textarea
            className="border-2 py-1 px-2 mt-2"
            placeholder="Details"
            value={todo.details}
            onChange={(e) =>
              dispatch(setTodo({ ...todo, details: e.target.value }))
            }
          />
        </div>

        {todo.id ? (
          <button
            className=" bg-slate-500 py-2 px-4 text-white inline-block mt-5 rounded-sm hover:bg-slate-600 transition "
            onClick={createTodo}
          >
            Update
          </button>
        ) : (
          <button
            className=" bg-slate-500 py-2 px-4 text-white inline-block mt-5 rounded-sm hover:bg-slate-600 transition "
            onClick={createTodo}
            type="submit"
          >
            Create
          </button>
        )}

        <button
          className="ml-5 underline inline-block"
          onClick={() => dispatch(clearInput())}
        >
          Cancel
        </button>
      </div>

      {/* Check if There is any todo item. then show the list */}
      {todoLists.length > 0 && (
        <SortableContainer
          onSortEnd={onSortEnd}
          distance={10}
          useWindowAsScrollContainer={true}
        >
          {todoLists.map((value, index) => (
            <Card key={value.id} index={index} {...value} />
          ))}
        </SortableContainer>
      )}
    </div>
  );
}

export default App;
