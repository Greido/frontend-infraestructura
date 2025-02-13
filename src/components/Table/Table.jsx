import axios from "axios";
import { Button, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "../modal/Modal";
import { ClipLoader } from "react-spinners";
const Table = ({ apiUrl, columns, customStyles, modalConfig }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const { open, selectedItem, handleOpen, handleClose, handleUpdate } =
    modalConfig;

  /* Use Effect de data */

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        setData(response);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [apiUrl]);

  const filteredData = data.filter((item) =>
    columns.some((col) =>
      col
        .selector(item)
        ?.toString()
        .toLowerCase()
        .includes(searchText.toLowerCase())
    )
  );
  return (
    <>
      <div>
        <TextField
          label="Buscar"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        {loading ? (
          <ClipLoader size={50} color={"#123abc"} loading={loading} />
        ) : (
          <div className="overflow-x-auto shadow-md rounded-lg">
            <DataTable
              customStyles={customStyles}
              columns={columns.map((col) =>
                col.name === "Acciones"
                  ? {
                      ...col,
                      cell: (row) => (
                        <div style={{ display: "flex", gap: "8px" }}>
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={() => handleOpen(row)}
                          >
                            <EditIcon />
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            size="small"
                            onClick={() => handleDelete(row._id)}
                          >
                            <DeleteForeverIcon />
                          </Button>
                        </div>
                      ),
                    }
                  : col
              )}
              highlightOnHover
              data={filteredData}
              striped
              pagination
              responsive
            />
          </div>
        )}

        <Modal
          open={open}
          selectedProduct={selectedItem}
          handleClose={handleClose}
          handleUpdate={handleUpdate}
        />
      </div>
    </>
  );
};

export default Table;
