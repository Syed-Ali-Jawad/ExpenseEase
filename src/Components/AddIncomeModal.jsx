import {
  Box,
  InputAdornment,
  MenuItem,
  Modal,
  Select,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { useSelector, useDispatch } from "react-redux";
import {
  setIsAddIncomeModalOpen,
  setIncomes,
  setAccountsArray,
} from "../Store";
import { useState, useEffect } from "react";

export default function AddIncomeModal() {
  const isAddIncomeModalOpen = useSelector(
    (state) => state.isAddIncomeModalOpen
  );
  const dispatch = useDispatch();
  const [incomeAmount, setIncomeAmount] = useState();
  const [incomeDate, setIncomeDate] = useState();
  const [incomeSource, setIncomeSource] = useState();
  // const [incomes, setIncomes] = useState();
  const incomes = useSelector((state) => state.incomes);
  const userDetail = useSelector((state) => state.userDetail);
  const [incomeAccount, setIncomeAccount] = useState();
  const accountsArray = useSelector((state) => state.accountsArray);
  const [isAddIncomeAccountClicked, setIsAddIncomeAccountClicked] =
    useState(false);
  const [newIncomeAccount, setNewIncomeAccount] = useState();

  function addIncomeHandler() {
    if (incomeAmount && incomeAmount > 0 && incomeDate && incomeSource) {
      localStorage.setItem(
        `${userDetail.email} Income: id:${new Date().getTime()}`,
        JSON.stringify({
          id: new Date().getTime(),
          amount: incomeAmount,
          date: incomeDate,
          source: incomeSource,
          account: incomeAccount,
        })
      );
      dispatch(
        setIncomes([
          ...incomes,
          {
            id: new Date().getTime(),
            amount: incomeAmount,
            date: incomeDate,
            source: incomeSource,
            account: incomeAccount,
          },
        ])
      );
      dispatch(setIsAddIncomeModalOpen(false));
      setIncomeAccount(null);
      setIncomeAmount(null);
      setIncomeDate(null);
      setIncomeSource(null);
    } else {
      dispatch(setIsAddIncomeModalOpen(false));
      return;
    }
  }

  return (
    <Modal
      open={isAddIncomeModalOpen}
      onClose={() => {
        dispatch(setIsAddIncomeModalOpen(false));
        setIsAddIncomeAccountClicked(false);
      }}
      className="flex flex-col justify-center "
    >
      <Box className="bg-white sm:w-1/3 w-fit h-fit m-auto p-4 rounded-lg flex flex-col items-center gap-3">
        <Typography variant="h6">Add Income</Typography>
        <TextField
          fullWidth
          label="Amount"
          required
          onChange={(e) => setIncomeAmount(e.target.value.trim())}
          type="number"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">PKR</InputAdornment>
            ),
          }}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer sx={{ width: "100%" }} components={["DateTimePicker"]}>
            <MobileDatePicker
              onChange={(value) =>
                setIncomeDate(new Date(value).toLocaleDateString())
              }
              required
              label="Pick Date"
              disableFuture
            />
          </DemoContainer>
        </LocalizationProvider>

        <Select
          fullWidth
          onChange={(e) => setIncomeSource(e.target.value)}
          defaultValue="Select Income Source"
        >
          <MenuItem value="Select Income Source">Select Income Source</MenuItem>
          <MenuItem value="Salary">Salary</MenuItem>
          <MenuItem value="Investment">Investment</MenuItem>
          <MenuItem value="Allowance">Allowance</MenuItem>
        </Select>
        <Select
          fullWidth
          onChange={(e) => setIncomeAccount(e.target.value)}
          defaultValue="Select Income Account"
        >
          <MenuItem value="Select Income Account">
            Select Income Account
          </MenuItem>
          {accountsArray.map((account) => (
            <MenuItem value={account}>{account}</MenuItem>
          ))}
        </Select>
        {!isAddIncomeAccountClicked ? (
          <Button onClick={() => setIsAddIncomeAccountClicked(true)}>
            Add Income Account
          </Button>
        ) : null}
        {isAddIncomeAccountClicked ? (
          <>
            <TextField
              fullWidth
              label="Account Name"
              onChange={(e) => setNewIncomeAccount(e.target.value.trim())}
            />
            <Button
              onClick={() => {
                setIsAddIncomeAccountClicked(false);
                localStorage.setItem(
                  `${userDetail?.email} IncomeAccounts`,
                  JSON.stringify([...accountsArray, newIncomeAccount])
                );
                dispatch(
                  setAccountsArray([...accountsArray, newIncomeAccount])
                );
              }}
            >
              Add
            </Button>
          </>
        ) : null}

        <Button variant="contained" onClick={addIncomeHandler}>
          Add
        </Button>
      </Box>
    </Modal>
  );
}
