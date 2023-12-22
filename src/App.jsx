import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Table from "./components/Table";
import Modal from './components/Modal';
import './App.css';


function App() {
  // reference: https://www.youtube.com/watch?v=9Lgc_NtwApQ

  const [modalOpen, setModalOpen] = useState(false); // useStateFull variable

  /* 
  * Storing Table Data in a variable and rendering that as it changes
  * Making tableRows, a stateful variable.
  * Whenever we update this data using `setTableRows`, the component will re-render with new data.
  */
  const [tableRows, setTableRows] = useState([
    {
      page: "Home",
      description: "Homepage must engage visitors immediately",
      status: "live",
    },
    {
      page: "Products/Services",
      description: "Showcases the Business offerings detailing each option and its advantages",
      status: "draft",
    },
    {
      page: "About us",
      description: "Most frequently visited webpages",
      status: "error",
    },
  ]);

  // Logic for deleting a particular row at an index
  const handleDeleteRow = (targetIndex) => {
    setTableRows(
      tableRows.filter((_, idx) => idx !== targetIndex)
    )
  };

  const deleteRowConfirmation = () => {

  };

  // Need to track which row we are going to edit
  const [rowToEdit, setRowToEdit] = useState(null);

  const handleEditRow = (idx) => {
    setRowToEdit(idx);

    setModalOpen(true);
  };

  // Handling addition of new Rows
  // The function needs to check if We are editing a row or adding a new row.
  const handleSubmitNewRow = (newRow) => {
    rowToEdit === null ?
      setTableRows([...tableRows, newRow]) :
      setTableRows(
        tableRows.map((currentRow, idx) => {
          if (idx !== rowToEdit) {
            return currentRow;
          } else {
            return newRow;
          }
        })
      )
  };
  // Pass this "handleSubmitNewRow" function as a prop to "Modal.jsx" function


  {/* in Table Component: rows is a prop */ }
  {/* in Table Component: deleteRow is a prop */ }
  {/* in Table Component: editRow is a prop */ }
  {/* in Modal Component: closeModal is a prop */ }
  {/* in Modal Component: handleSubmitNewRow is a prop */ }
  {/* in Modal Component: defaultValue is a prop */ }

  return (
    <div className='App'>
      <Table rows={tableRows} deleteRow={handleDeleteRow} editRow={handleEditRow} />
      <button
        className='btn'
        onClick={() => setModalOpen(true)} // Anonymous Arrow function
      >
        Add new Record
      </button>

      {/* Conditional Rendering of Modal based on value of useState variable */}
      {
        modalOpen && (
          <Modal
            closeModal={() => setModalOpen(false)} // Anonymous Arrow function
            onSubmit={handleSubmitNewRow}
            defaultValue={rowToEdit !== null && tableRows[rowToEdit]}
          // defaultValue for the input fields based on the row we are currently editing
          // 1st, check if rowToEdit is NOT Null
          // 2nd, We try to edit a row, we pass row values at rowToEdit index 
          />
        )}

    </div>
  )
}

export default App;
