import React from "react";
import Item from "./ExpenseItem";
import { MdDelete } from "react-icons/md";
function ExpenseList({ expenses, handleItems, handleDelete, handleEdit }) {
  return (
    <>
      <ul className="list">
        {expenses.map((expense) => {
          return (
            <Item
              key={expense.id}
              expense={expense}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          );
        })}
      </ul>
      {expenses.length > 0 && (
        <button className="btn" onClick={handleItems}>
          Clear expense <MdDelete className="btn-icon" />
        </button>
      )}
    </>
  );
}
export default ExpenseList;
