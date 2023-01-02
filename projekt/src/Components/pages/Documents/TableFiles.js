import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { supabase } from "../../../supabase/config";
import { useState } from "react";
import { useEffect } from "react";
import { saveAs } from "file-saver";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { useContext } from "react";
import { AppContext } from "../../../AppContext/AppContext";
// function createData(id, NazwaPliku, DataUtworzenia, TypPliku, RozmiarPliku) {
//   return {
//     id,
//     NazwaPliku,
//     DataUtworzenia,
//     TypPliku,
//     RozmiarPliku,
//   };
// }

// const allfiles = [
//   createData(1, 305, 3.7, 67, 4.3),
//   createData(3, 452, 25.0, 51, 4.9),
//   createData(4, 262, 16.0, 24, 6.0),
//   createData(5, 159, 6.0, 24, 4.0),
//   createData(6, 356, 16.0, 49, 3.9),
//   createData(7, 408, 3.2, 87, 6.5),
//   createData(8, 237, 9.0, 37, 4.3),
//   createData(9, 375, 0.0, 94, 0.0),
//   createData(10, 518, 26.0, 65, 7.0),
//   createData(11, 392, 0.2, 98, 0.0),
//   createData(12, 318, 0, 81, 2.0),
//   createData(13, 360, 19.0, 9, 37.0),
//   createData(14, 437, 18.0, 63, 4.0),
// ];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
  },

  {
    id: "NazwaPliku",
    numeric: false,
    disablePadding: false,
    label: "Nazwa pliku",
  },

  {
    id: "DataUtworzenia",
    numeric: false,
    disablePadding: false,
    label: "Data utworzenia",
  },

  {
    id: "TypPliku",
    numeric: false,
    disablePadding: false,
    label: "Typ pliku",
  },

  {
    id: "RozmiarPliku",
    numeric: false,
    disablePadding: false,
    label: "Rozmiar pliku (w bajtach)",
  },
  {
    id: "Pobierz",
    numeric: false,
    disablePadding: false,
    label: "Pobierz plik",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;
  const { isDarkTheme } = useContext(AppContext);

  // const [allesfiles, setFiles] = useState([]);

  // useEffect(() => {
  //   getAllFiles();
  // }, []);

  // const getAllFiles = async () => {
  //   let { data: files, error } = await supabase.from("files").select("*");
  //   if (error) {
  //     console.log(error);
  //   }
  //   if (files) {
  //     setFiles(files);
  //   }
  // };

  const deleteFiles = async (NazwaPliku) => {
    const { data: files, error } = await supabase
      .from("files")
      .delete()
      .eq("NazwaPliku", NazwaPliku);
    if (error) throw error;
    if (files) {
      console.log(files);
    }
    // window.location.reload();
  };

  return (
    <Toolbar
      style={{
        background: isDarkTheme ? "#000" : "#4caf4faf",
        color: isDarkTheme ? "#ffff" : "#000",
      }}
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Dokumenty
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip
          title="Delete"
          style={{
            color: isDarkTheme ? "#ffff" : "#000",
          }}
        >
          <IconButton onClick={deleteFiles}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip
          title="Filter list"
          style={{
            color: isDarkTheme ? "#ffff" : "#000",
          }}
        >
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("NazwaPliku");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [allfiles, setAllFiles] = useState([]);
  // const [namefile, setNameFile] = useState("");

  useEffect(() => {
    getFiles();
    // getName();
  }, []);

  // const getName = async () => {
  //   let { data: files, error } = await supabase
  //     .from("files")
  //     .select("NazwaPliku");
  //   if (files) {
  //     setNameFile(files);
  //   } else if (error) console.log(error);
  // };

  // let url = `https://aaxzlvyhfqnxraqbdibd.supabase.co/storage/v1/object/images/${allfiles.NazwaPliku}`;

  const downloadFile = async (NazwaPliku) => {
    const { data, error } = await supabase.storage
      .from("images")
      .download(allfiles.NazwaPliku);
    if (data) {
      saveAs(data, allfiles.NazwaPliku);
    } else if (error) console.log(error);
  };

  const getFiles = async () => {
    let { data: files, error } = await supabase.from("files").select("*");
    if (error) {
      console.log(error);
    }
    if (files) {
      setAllFiles(files);
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = allfiles.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - allfiles.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={allfiles.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.sort(getComparator(order, orderBy)).slice() */}
              {stableSort(allfiles, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((allfiles, index) => {
                  const isItemSelected = isSelected(allfiles.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, allfiles.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={allfiles.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {allfiles.name}
                      </TableCell>
                      <TableCell align="center">
                        {allfiles.NazwaPliku}
                      </TableCell>
                      <TableCell align="center">
                        {allfiles.DataUtworzenia}
                      </TableCell>
                      <TableCell align="center">{allfiles.TypPliku}</TableCell>
                      <TableCell align="center">
                        {allfiles.RozmiarPliku}
                      </TableCell>
                      <TableCell align="center">
                        <FileDownloadIcon onClick={downloadFile} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={allfiles.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}
