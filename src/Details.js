import {
  Grid,
  Checkbox,
  Typography,
  Modal,
  TextField,
  Stack,
  Card,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import "./Details.css";

function Details({ n, checkedFn, mainChecked, checked, deleteFn, editFn }) {
  // let [isChecked, setIsChecked] = useState(false);
  let [open, setOpen] = useState(false);
  let [details, setDetails] = useState(n);

  return checked.includes(n.id) ? (
    <Grid
      container
      className="gridContainer"
      key={n.id}
      style={{ backgroundColor: "rgb(213, 214, 214)" }}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Grid item sm={1.5}>
        <Checkbox
          id={n.id}
          checked={checked.includes(n.id)}
          onChange={(e) => {
            checkedFn(n.id);
            // setIsChecked(e.target.checked);
            // console.log(e.target.checked);
          }}
        />
      </Grid>
      <Grid item sm={3}>
        <Typography>{n.name}</Typography>
      </Grid>
      <Grid item sm={3}>
        <Typography>{n.email}</Typography>
      </Grid>
      <Grid item sm={3}>
        <Typography>{n.role}</Typography>
      </Grid>
      <Grid item sm={1.5}>
        <EditNoteIcon
          onClick={() => {
            console.log({ details });
            setOpen(true);
          }}
        />
        <Modal
          open={open}
          // onClose={() => {
          //   // console.log(details === n);

          // }}
          style={{
            position: "absolute",
            top: "20%",
            left: "25%",
            right: "25%",
            width: "50%",
            height: "250px",
            // backgroundColor: "#80ffff",
            textAlign: "center",
            padding: "5%",
          }}
        >
          <Card style={{ width: "60%", padding: "10px", height: "100%" }}>
            <Stack justifyContent="flex-end" alignItems={"flex-end"}>
              <Button variant="text" onClick={() => setOpen(false)}>
                <HighlightOffOutlinedIcon color="error" />
              </Button>
            </Stack>

            <TextField
              className="editElements"
              type="text"
              label="UserName"
              value={details.name}
              onChange={(e) => setDetails({ ...details, name: e.target.value })}
            />
            <TextField
              type={"text"}
              className="editElements"
              label="Email"
              value={details.email}
              onChange={(e) =>
                setDetails({ ...details, email: e.target.value })
              }
            />
            <TextField
              className="editElements"
              type={"text"}
              label="Role"
              value={details.role}
              onChange={(e) => setDetails({ ...details, role: e.target.value })}
            />
            <Stack justifyContent={"flex-end"} alignItems="flex-end">
              <Button
                variant="contained"
                color={"success"}
                width="40%"
                sx={{ marginTop: ".5rem" }}
                onClick={() => {
                  if (
                    n.name !== details.name ||
                    n.email !== details.email ||
                    n.role !== details.role
                  ) {
                    editFn(details);
                  }
                  setOpen(false);
                }}
              >
                Ok
              </Button>
            </Stack>
          </Card>
        </Modal>
        <DeleteOutlineOutlinedIcon
          color="error"
          onClick={() => deleteFn(n.id)}
        />
      </Grid>
    </Grid>
  ) : (
    <Grid
      container
      className="gridContainer"
      key={n.id}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Grid item sm={1.5}>
        <Checkbox
          id={n.id}
          checked={checked.includes(n.id)}
          onChange={(e) => {
            checkedFn(n.id);
            // setIsChecked(e.target.checked);
            // console.log(e.target.checked);
          }}
        />
      </Grid>
      <Grid item sm={3}>
        <Typography>{n.name}</Typography>
      </Grid>
      <Grid item sm={3}>
        <Typography>{n.email}</Typography>
      </Grid>
      <Grid item sm={3}>
        <Typography>{n.role}</Typography>
      </Grid>
      <Grid item sm={1.5}>
        <EditNoteIcon
          onClick={() => {
            console.log({ details });
            setOpen(true);
          }}
        />
        <Modal
          open={open}
          // onClose={() => {
          //   // console.log(details === n);
          //   if (
          //     n.name !== details.name ||
          //     n.email !== details.email ||
          //     n.role !== details.role
          //   ) {
          //     editFn(details);
          //   }
          //   setOpen(false);
          // }}
          style={{
            position: "absolute",
            top: "20%",
            left: "25%",
            right: "25%",
            width: "50%",
            height: "250px",
            // backgroundColor: "#80ffff",
            textAlign: "center",
            padding: "5%",
          }}
        >
          <Card style={{ width: "60%", padding: "10px", height: "100%" }}>
            <Stack justifyContent="flex-end" alignItems={"flex-end"}>
              <Button variant="text" onClick={() => setOpen(false)}>
                <HighlightOffOutlinedIcon color="error" />
              </Button>
            </Stack>

            <TextField
              className="editElements"
              type={"text"}
              label="UserName"
              value={details.name}
              onChange={(e) => setDetails({ ...details, name: e.target.value })}
            />
            <TextField
              type={"text"}
              className="editElements"
              label="Email"
              value={details.email}
              onChange={(e) =>
                setDetails({ ...details, email: e.target.value })
              }
            />
            <TextField
              className="editElements"
              type={"text"}
              label="Role"
              value={details.role}
              onChange={(e) => setDetails({ ...details, role: e.target.value })}
            />
            <Stack justifyContent={"flex-end"} alignItems="flex-end">
              <Button
                variant="contained"
                color={"success"}
                width="40%"
                sx={{ marginTop: ".5rem" }}
                onClick={() => {
                  if (
                    n.name !== details.name ||
                    n.email !== details.email ||
                    n.role !== details.role
                  ) {
                    editFn(details);
                  }
                  setOpen(false);
                }}
              >
                Ok
              </Button>
            </Stack>
          </Card>
        </Modal>
        <DeleteOutlineOutlinedIcon
          color="error"
          onClick={() => deleteFn(n.id)}
        />
      </Grid>
    </Grid>
  );
}

export default Details;
