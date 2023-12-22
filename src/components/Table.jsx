import React from 'react';
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import "./Table.css";

// type Props = {}
// const Table = (props: Props) => {

// Extracting props from App.jsx :: rows, deleteRow

const Table = ({ rows, deleteRow, editRow }) => {
    return (
        <div className='table-wrapper'>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Page</th>
                        <th className='expand'>Description</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        rows.map((row, idx) => {

                            const statusText =
                                row.status.charAt(0).toUpperCase + row.status.slice(1);

                            return <tr key={idx}>
                                <td>{row.page}</td>
                                <td className='expand'>{row.description}</td>
                                <td>
                                    <span
                                        className={`label label-${row.status}`}
                                    >
                                        {row.status}
                                        {/* {statusText} */}
                                    </span>
                                    {/* Removing String 'label-live' */}
                                    {/* using String Interpolation instead */}
                                </td>
                                {/* Column below will contain Delete icon and Edit icon */}
                                <td>
                                    <span className='actions'>
                                        <BsFillTrashFill
                                            className='delete-btn'
                                            onClick={() => deleteRow(idx)}
                                        />

                                        <BsFillPencilFill
                                            className='edit-btn'
                                            onClick={() => editRow(idx)}
                                        />
                                    </span>
                                </td>
                            </tr>
                        })
                    }

                    {/* First row of Actual Data */}
                </tbody>
            </table>
        </div>
    )
}

export default Table;
