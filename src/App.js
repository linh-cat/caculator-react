import React, { useState, useEffect } from "react";
import Alert from "./components/Alert";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

const initialExpenses = localStorage.getItem("expenses")
  ? JSON.parse(localStorage.getItem("expenses"))
  : [];
function App() {
  const [expense, setExpense] = useState(initialExpenses);
  const [charge, setCharge] = useState("");
  const [amount, setAmount] = useState("");
  const [alert, setAlert] = useState({ isShow: false });
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(0);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expense));
  });

  const HandleCharge = (e) => {
    setCharge(e.target.value);
  };
  const HandleAmount = (e) => {
    setAmount(e.target.value);
  };
  const HandleAlert = ({ type, text }) => {
    setAlert({ isShow: true, type, text });
    setTimeout(() => {
      setAlert({ isShow: false });
    }, 3000);
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    if ((charge !== "", amount > 0)) {
      if (edit) {
        let tempExpenses = expense.map((item) => {
          return item.id === id ? { ...item, charge, amount } : item;
        });
        setExpense(tempExpenses);
        setEdit(false);
        setCharge("");
        setAmount("");
        HandleAlert({ type: "success", text: "Edit success!" });
      } else {
        const newExpense = { id: uuidv4(), charge, amount };
        setExpense([...expense, newExpense]);
        HandleAlert({ type: "success", text: "Item added" });
        setCharge("");
        setAmount("");
      }
    } else {
      HandleAlert({ type: "danger", text: "Error!" });
    }
  };
  const HandleItems = () => {
    setExpense([]);
    HandleAlert({ type: "danger", text: "Clear All Items" });
  };
  const HandleDelete = (id) => {
    let tempExpenses = expense.filter((item) => item.id !== id);
    setExpense(tempExpenses);
    HandleAlert({ type: "danger", text: "Delete successfull!" });
  };
  const HandleEdit = (id) => {
    let expenses = expense.find((item) => item.id === id);
    let { charge, amount } = expenses;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  };
  return (
    <>
      {alert.isShow && <Alert type={alert.type} text={alert.text} />}

      <h1>bugget calculator</h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          handlecharge={HandleCharge}
          handleamount={HandleAmount}
          handlesubmit={HandleSubmit}
          edit={edit}
        />
        <ExpenseList
          expenses={expense}
          handleDelete={HandleDelete}
          handleEdit={HandleEdit}
          handleItems={HandleItems}
        />
      </main>
      <h1>
        total spending: $
        {expense.reduce((acc, cur) => {
          return (acc += parseInt(cur.amount));
        }, 0)}
      </h1>
    </>
  );
}

export default App;
