import {
  Box,
  InputAdornment,
  MenuItem,
  Modal,
  Select,
  TextField,
  Button,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { useSelector, useDispatch } from "react-redux";
import { setIsAddExpenseModalOpen, setExpenses } from "../Store";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

export default function AddExpenseModal() {
  const isAddExpenseModalOpen = useSelector(
    (state) => state.isAddExpenseModalOpen
  );
  const dispatch = useDispatch();
  const [expenseAmount, setExpenseAmount] = useState();
  const [expenseDate, setExpenseDate] = useState();
  const [expenseCategory, setExpenseCategory] = useState();
  const expenseCategories = useSelector((state) => state.expenseCategories);
  // const [expenses, setExpenses] = useState([]);
  const expenses = useSelector((state) => state.expenses);
  const userDetail = useSelector((state) => state.userDetail);
  const [expenseDescription, setExpenseDescription] = useState();

  // useEffect(() => {
  //   const entries = Array.from(localStorage).map((entry, index) => {
  //     const key = localStorage.key(index);
  //     if (key.includes("Expense:" && key.includes(userDetail.email))) {
  //       return JSON.parse(localStorage.getItem(key));
  //     }
  //   });
  //   const filteredEntries = entries.filter((entry) => entry || null);

  //   dispatch(setExpenses(filteredEntries));
  // }, []);

  function addExpenseHandler() {
    if (expenseAmount && expenseAmount > 0 && expenseDate && expenseCategory) {
      localStorage.setItem(
        `${userDetail.email} Expense id:${new Date().getTime()}`,
        JSON.stringify({
          id: new Date().getTime(),
          amount: expenseAmount,
          description: expenseDescription,
          date: expenseDate,
          category: expenseCategory,
        })
      );
      dispatch(
        setExpenses([
          ...expenses,
          {
            id: new Date().getTime(),
            amount: expenseAmount,
            description: expenseDescription,
            date: expenseDate,
            category: expenseCategory,
          },
        ])
      );
      dispatch(setIsAddExpenseModalOpen(false));

      setExpenseDescription(null);
      setExpenseCategory(null);
      setExpenseDate(null);
      setExpenseAmount(null);
    } else {
      dispatch(setIsAddExpenseModalOpen(false));
      setExpenseDescription(null);
      return;
    }
  }

  return (
    <Modal
      open={isAddExpenseModalOpen}
      onClose={() => {
        dispatch(setIsAddExpenseModalOpen(false));
      }}
      className="flex flex-col justify-center"
    >
      <Box className="bg-white sm:w-1/3 w-fit  h-fit m-auto p-4 rounded-lg flex flex-col items-center gap-3">
        <Typography variant="h6">Add Expense</Typography>
        <TextField
          fullWidth
          label="Amount"
          required
          onChange={(e) => setExpenseAmount(e.target.value.trim())}
          type="number"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">PKR</InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          label="Description"
          onChange={(e) => setExpenseDescription(e.target.value.trim())}
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer sx={{ width: "100%" }} components={["DateTimePicker"]}>
            <MobileDatePicker
              onChange={(value) =>
                setExpenseDate(new Date(value).toLocaleDateString())
              }
              required
              label="Pick Date"
              disableFuture
            />
          </DemoContainer>
        </LocalizationProvider>

        <Select
          onChange={(e) => setExpenseCategory(e.target.value)}
          fullWidth
          defaultValue="Select Category"
        >
          <MenuItem value="Select Category">Select Category</MenuItem>
          {expenseCategories.map((category) => (
            <MenuItem value={category}>{category}</MenuItem>
          ))}
        </Select>

        <Button variant="contained" onClick={addExpenseHandler}>
          Add
        </Button>
      </Box>
    </Modal>
  );
}
