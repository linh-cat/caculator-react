import React from "react";
import { MdSend } from "react-icons/md";

function ExpenseForm({
  charge,
  amount,
  handlecharge,
  handleamount,
  handlesubmit,
  edit,
}) {
  return (
    <form onSubmit={handlesubmit}>
      <div className="form-center">
        <div className="form-group">
          <label htmlFor="charge">charge </label>
          <input
            type="text"
            className="form-control"
            id="charge"
            name="charge"
            placeholder="e.g rent"
            value={charge}
            onChange={handlecharge}
          />
        </div>
      </div>
      <div className="form-center">
        <div className="form-group">
          <label htmlFor="amount">amount </label>
          <input
            type="number"
            className="form-control"
            id="amount"
            name="amount"
            placeholder="e.g 100"
            value={amount}
            onChange={handleamount}
          />
        </div>
      </div>
      <button type="submit" className="btn" onChange={handlesubmit}>
        {edit ? "Edit" : "Submit"} <MdSend className="btn-icon" />
      </button>
    </form>
  );
}
export default ExpenseForm;
