import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { supabase } from "../../../supabase/config";
import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../../../AppContext/AppContext";
import { useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";
import stylePlanning from "../Planning/Planning.module.css";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState("panel1");
  const { isDarkTheme } = useContext(AppContext);
  const [vehicleName, setVehicleName] = useState();
  const [registrationNumber, setRegistrationNumber] = useState();
  const [dates, setDates] = useState();
  const [all, setAll] = useState([]);

  const [checked, setChecked] = useState({ input: false });
  const [checkedAll, setCheckedAll] = useState(false);

  const handleChecked = (e) => {
    setChecked(e.target.checked);
  };

  const toggleCheck = (input) => {
    setChecked((prevState) => {
      const newState = { ...prevState };
      newState[input] = !prevState[input];
      return newState;
    });
  };

  const selectAll = (value) => {
    setCheckedAll(value);
    setChecked((prevState) => {
      const newState = { ...prevState };
      for (const input in newState) {
        newState[input] = value;
      }
      return newState;
    });
  };

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  useEffect(() => {
    let allChecked = true;
    for (const input in checked) {
      if (checked[input] === false) {
        allChecked = false;
      }
    }
    if (allChecked) {
      setCheckedAll(true);
    } else {
      setCheckedAll(false);
    }
    getData();
  }, [checked]);

  const getData = async (e) => {
    let { data: Servis, error } = await supabase
      .from("Servis")
      .select(vehicleName, registrationNumber, dates);
    if (error) {
      console.log(error);
    }
    if (Servis) {
      setAll(Servis);
    }
  };

  const deleteServis = async (id) => {
    const { data: Servis, error } = await supabase
      .from("Servis")
      .delete()
      .eq("id", id);
    if (error) throw error;

    if (Servis) {
      console.log(Servis);
    }
    getData();
  };

  return (
    <>
      <div>Historia przeglądów</div>

      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Przeglądy</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="left"
                      style={{
                        fontWeight: "bold",
                        background: isDarkTheme ? "#000" : "#4caf4faf",
                        color: isDarkTheme ? "#ffff" : "#000",
                      }}
                    ></TableCell>

                    <TableCell
                      align="center"
                      style={{
                        fontWeight: "bold",
                        background: isDarkTheme ? "#000" : "#4caf4faf",
                        color: isDarkTheme ? "#ffff" : "#000",
                      }}
                    >
                      Nazwa pojazdu
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        fontWeight: "bold",
                        background: isDarkTheme ? "#000" : "#4caf4faf",
                        color: isDarkTheme ? "#ffff" : "#000",
                      }}
                    >
                      Nr Rejestracyjny
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        fontWeight: "bold",
                        background: isDarkTheme ? "#000" : "#4caf4faf",
                        color: isDarkTheme ? "#ffff" : "#000",
                      }}
                    >
                      Termin przeglądu
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        fontWeight: "bold",
                        background: isDarkTheme ? "#000" : "#4caf4faf",
                        color: isDarkTheme ? "#ffff" : "#000",
                      }}
                    >
                      {/* {checked ? (
                        <Checkbox
                          inputProps={{ "aria-label": "controlled" }}
                          onChange={handleChecked}
                          checked={checked}
                        />
                      ) : null} */}

                      <input
                        name="inputAll"
                        type="checkbox"
                        onChange={(event) => selectAll(event.target.checked)}
                      />
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {all.map((name, id) => (
                    <TableRow
                      sx={
                        ({ "&:last-child td, &:last-child th": { border: 0 } },
                        {
                          "&:nth-of-type(odd)": {
                            backgroundColor: "lightgray",
                          },
                        })
                      }
                    >
                      <TableCell align="left">
                        {checkedAll ? (
                          <DeleteIcon
                            className={stylePlanning.deleteIcon}
                            onClick={() => deleteServis(name.id)}
                          />
                        ) : null}
                      </TableCell>

                      <TableCell align="center">
                        <p key={id}>{name.vehicleName}</p>
                      </TableCell>

                      <TableCell align="center">
                        <p key={id}>{name.registrationNumber}</p>
                      </TableCell>

                      <TableCell align="center">
                        <p key={id}>{name.dates}</p>
                      </TableCell>

                      <TableCell align="center" sx={{ width: 150 }}>
                        {/* <Checkbox
                          checked={checked.id}
                          onChange={handleChecked}
                          inputProps={{ "aria-label": "controlled" }}
                        /> */}
                        {checked ? (
                          <input
                            type="checkbox"
                            name="input"
                            onChange={() => toggleCheck("input")}
                            checked={checked["input"]}
                          />
                        ) : null}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Prace</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
            lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
