import AddExpenseModal from "../Components/AddExpenseModal";
import AddIncomeModal from "../Components/AddIncomeModal";
import NavBar from "../Components/NavBar";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { PieChart, LineChart } from "@mui/x-charts";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import MenuIcon from "@mui/icons-material/Menu";
import {
  setIsIncomeClicked,
  setIsExpenseClicked,
  setExpenses,
  setIncomes,
  setAccountsArray,
  setShallShowNavBar,
  getExpenses,
  getIncomes,
} from "../Store";
import DeleteAccountAlertModal from "../Components/DeleteAccountAlertModal";
import zIndex from "@mui/material/styles/zIndex";

export default function Home() {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses);
  const incomes = useSelector((state) => state.incomes);
  const expenseCategories = useSelector((state) => state.expenseCategories);
  const incomeSources = useSelector((state) => state.incomeSources);
  const [expenseTableData, setExpenseTableData] = useState([]);
  const [incomeTableData, setIncomeTableData] = useState([]);
  // let expensePieData = [];
  const [expensePieData, setExpensePieData] = useState([]);
  // let incomePieData = [];
  const [incomePieData, setIncomePieData] = useState([]);
  const selectedCategory = useSelector((state) => state.selectedCategory);
  const selectedSource = useSelector((state) => state.selectedSource);
  const selectedAccount = useSelector((state) => state.selectedAccount);
  const [expenseLineChartData, setExpenseLineChartData] = useState([]);
  const [incomeLineChartData, setIncomeLineChartData] = useState([]);
  const months = useSelector((state) => state.months);
  const [incomeCardsData, setIncomeCardsData] = useState([]);
  const accountsArray = useSelector((state) => state.accountsArray);
  const userDetail = useSelector((state) => state.userDetail);
  const [isExpenseDeleted, setIsExpenseDeleted] = useState();
  const [isIncomeDeleted, setIsIncomeDeleted] = useState();
  function deleteIncome(row) {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.includes(userDetail.email) && key.includes("Income")) {
        const income = JSON.parse(localStorage.getItem(key));
        if (income.id === row.id) {
          localStorage.removeItem(key);
          dispatch(setIncomes(getIncomes()));
          break;
        }
      }
    }
    setIsIncomeDeleted(false);
  }
  function deleteExpense(row) {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.includes(userDetail.email) && key.includes("Expense")) {
        const expense = JSON.parse(localStorage.getItem(key));
        if (expense.id === row.id) {
          localStorage.removeItem(key);
          dispatch(setExpenses(getExpenses()));
          break;
        }
      }
    }
  }
  const expensesTableColumns = [
    { field: "category", headerName: "Category", width: 120 },
    { field: "description", headerName: "Description", width: 150 },
    {
      field: "amount",
      headerName: "Amount (PKR)",
      width: 110,
    },
    { field: "date", headerName: "Date", width: 90 },
    {
      field: "action",
      headerName: "Action",
      width: 120,
      renderCell: (params) => (
        <Button onClick={() => deleteExpense(params.row)}>Delete</Button>
      ),
    },
  ];
  const incomesTableColumns = [
    { field: "amount", headerName: "Amount (PKR)", width: 120 },
    { field: "source", headerName: "Source", width: 120 },
    { field: "date", headerName: "Date", width: 90 },
    {
      field: "account",
      headerName: "Account",
      width: 120,
    },
    {
      field: "action",
      headerName: "Action",
      width: 120,
      renderCell: (params) => (
        <Button onClick={() => deleteIncome(params.row)}>Delete</Button>
      ),
    },
  ];
  // const [isExpenseClicked, setIsExpenseClicked] = useState(false);
  const isExpenseClicked = useSelector((state) => state.isExpenseClicked);
  // const [isIncomeClicked, setIsIncomeClicked] = useState(false);
  const isIncomeClicked = useSelector((state) => state.isIncomeClicked);
  const selectedMonth = useSelector((state) => state.selectedMonth);
  const selectedYear = useSelector((state) => state.selectedYear);
  const isDeleteAccountModalOpen = useSelector(
    (state) => state.isDeleteAccountModalOpen
  );
  const shallShowNavBar = useSelector((state) => state.shallShowNavBar);

  useEffect(() => {
    setExpensePieData([]);
    expenseCategories.forEach((category) => {
      let filteredExpenses = expenses.filter(
        (expense) => expense.category === category
      );
      if (selectedMonth && selectedMonth !== "Month") {
        filteredExpenses = filteredExpenses.filter(
          (expense) => new Date(expense.date).getMonth() + 1 == selectedMonth
        );
      }
      if (selectedYear && selectedYear !== "Year") {
        filteredExpenses = filteredExpenses.filter(
          (expense) => new Date(expense.date).getFullYear() == selectedYear
        );
      }
      let expenseSum = filteredExpenses.reduce((sum, expense) => {
        sum += +expense.amount;
        return sum;
      }, 0);

      // expensePieData.push({ value: expenseSum, label: category });
      setExpensePieData((prevPieData) => [
        ...prevPieData,
        { value: expenseSum, label: category },
      ]);
    });
    let expenseTableData = expenses.filter((entry) => entry);
    if (selectedCategory && selectedCategory !== "Category") {
      expenseTableData = expenseTableData.filter(
        (expense) => expense.category === selectedCategory
      );
    }
    if (selectedMonth && selectedMonth !== "Month") {
      expenseTableData = expenseTableData.filter(
        (expense) => new Date(expense.date).getMonth() + 1 == selectedMonth
      );
    }
    if (selectedYear && selectedYear !== "Year") {
      expenseTableData = expenseTableData.filter(
        (expense) => new Date(expense.date).getFullYear() == selectedYear
      );
    }
    console.log(expenseTableData, expenses);
    setExpenseTableData(expenseTableData);
  }, [
    expenses,
    isExpenseClicked,
    selectedMonth,
    selectedYear,
    selectedCategory,
  ]);

  useEffect(() => {
    setExpenseLineChartData([]);
    for (let i = 1; i <= 12; i++) {
      let monthExpenses = expenses.filter(
        (expense) => new Date(expense.date).getMonth() + 1 == i
      );
      if (selectedCategory && selectedCategory !== "Category") {
        monthExpenses = monthExpenses.filter(
          (expense) => expense.category === selectedCategory
        );
      }
      let monthTotalExpense = null;
      if (monthExpenses.length > 0) {
        monthTotalExpense = monthExpenses.reduce(
          (acc, expense) => (acc += +expense.amount),
          0
        );
      } else {
        monthTotalExpense = 0;
      }
      setExpenseLineChartData((prevData) => [...prevData, monthTotalExpense]);
    }
  }, [expenses, isExpenseClicked, selectedCategory]);

  useEffect(() => {
    setIncomeLineChartData([]);
    for (let i = 1; i <= 12; i++) {
      let monthIncomes = incomes.filter(
        (income) => new Date(income.date).getMonth() + 1 == i
      );
      if (selectedSource && selectedSource !== "Source") {
        monthIncomes = monthIncomes.filter(
          (income) => income.source === selectedSource
        );
      }
      let monthTotalIncome = null;
      if (monthIncomes.length > 0) {
        monthTotalIncome = monthIncomes.reduce(
          (acc, income) => (acc += +income.amount),
          0
        );
      } else {
        monthTotalIncome = 0;
      }
      setIncomeLineChartData((prevData) => [...prevData, monthTotalIncome]);
    }
  }, [incomes, isIncomeClicked, selectedSource]);

  useEffect(() => {
    setIncomeCardsData([]);
    accountsArray.forEach((account) => {
      let incomeAccountData = incomes.filter(
        (income) => income.account === account
      );
      if (selectedMonth && selectedMonth !== "Month") {
        incomeAccountData = incomeAccountData.filter(
          (income) => new Date(income.date).getMonth() + 1 === selectedMonth
        );
      }
      if (selectedYear && selectedYear !== "Year") {
        incomeAccountData = incomeAccountData.filter(
          (income) => new Date(income.date).getFullYear() === selectedYear
        );
      }

      const incomeInAccount = incomeAccountData.reduce(
        (sum, account) => (sum += +account.amount),
        0
      );
      setIncomeCardsData((prevData) => [
        ...prevData,
        { account: account, income: incomeInAccount },
      ]);
    });
  }, [incomes, isIncomeClicked, selectedMonth, selectedYear]);

  useEffect(() => {
    setIncomePieData([]);
    incomeSources.forEach((source) => {
      let filteredIncomes = incomes.filter(
        (income) => income.source === source
      );
      if (selectedMonth && selectedMonth !== "Month") {
        filteredIncomes = filteredIncomes.filter(
          (income) => new Date(income.date).getMonth() + 1 == selectedMonth
        );
      }
      if (selectedYear && selectedYear !== "Year") {
        filteredIncomes = filteredIncomes.filter(
          (income) => new Date(income.date).getFullYear() == selectedYear
        );
      }
      if (selectedAccount && selectedAccount !== "Account") {
        filteredIncomes = filteredIncomes.filter(
          (income) => income.account === selectedAccount
        );
      }
      let incomeSum = filteredIncomes.reduce((sum, income) => {
        sum += +income.amount;
        return sum;
      }, 0);

      // console.log(filtered, incomeSum);
      // incomePieData.push({ value: incomeSum, label: source });
      setIncomePieData((prevPieData) => [
        ...prevPieData,
        { value: incomeSum, label: source },
      ]);
    });
    let incomeTableData = incomes.filter(
      (entry) => entry.amount && entry.source && entry.date && entry.account
    );
    if (selectedSource && selectedSource !== "Source") {
      incomeTableData = incomeTableData.filter(
        (income) => income.source === selectedSource
      );
    }
    if (selectedMonth && selectedMonth !== "Month") {
      incomeTableData = incomeTableData.filter(
        (income) => new Date(income.date).getMonth() + 1 == selectedMonth
      );
    }
    if (selectedYear && selectedYear !== "Year") {
      incomeTableData = incomeTableData.filter(
        (income) => new Date(income.date).getFullYear() == selectedYear
      );
    }
    if (selectedAccount && selectedAccount !== "Account") {
      incomeTableData = incomeTableData.filter(
        (income) => income.account === selectedAccount
      );
    }
    setIncomeTableData(incomeTableData);
  }, [
    incomes,
    isIncomeClicked,
    selectedMonth,
    selectedYear,
    selectedSource,

    selectedAccount,
  ]);

  return (
    <>
      <NavBar sx={{ zIndex: "1" }} />
      <AddExpenseModal />
      <AddIncomeModal />
      <div
        className="w-screen h-20 bg-white sm:bg-transparent fixed top-0"
        style={{ zIndex: "1" }}
      >
        <div className="sm:hidden block w-fit" style={{ zIndex: "2" }}>
          <IconButton
            size="large"
            edge="start"
            sx={{ mr: 2, margin: "4px" }}
            onClick={() =>
              dispatch(setShallShowNavBar(shallShowNavBar ? false : true))
            }
          >
            <MenuIcon sx={{ color: "blue", backgroundColor: "white" }} />
          </IconButton>
        </div>
        <div
          style={{ zIndex: "1" }}
          className="fixed top-0  sm:right-0   sm:w-screen   right-16  w-4/6 flex flex-col sm:bg-transparent bg-white z-10"
        >
          {window.innerWidth <= 767 ? (
            <h2 className="m-auto">Expense Manager</h2>
          ) : null}
          <div
            style={{ marginLeft: "12%", width: "85%" }}
            className=" w-5/6 flex bg-white shadow-lg  rounded-full sm:my-1 my-4"
          >
            <button
              className="w-full hover:bg-blue-100 py-1 rounded-l-full"
              style={
                isExpenseClicked
                  ? {
                      backgroundColor: "#2196F3",
                      color: "white",
                      fontWeight: "bold",
                    }
                  : null
              }
              onClick={() => {
                dispatch(setIsExpenseClicked(true));
                dispatch(setIsIncomeClicked(false));
              }}
            >
              Expenses
            </button>
            <button
              style={
                isIncomeClicked
                  ? {
                      backgroundColor: "#2196F3",
                      color: "white",
                      fontWeight: "bold",
                    }
                  : null
              }
              className="w-full  hover:bg-blue-100 py-1 rounded-r-full"
              onClick={() => {
                dispatch(setIsIncomeClicked(true));
                dispatch(setIsExpenseClicked(false));
              }}
            >
              Income
            </button>
          </div>
        </div>
      </div>
      {isExpenseClicked ? (
        <div className="flex flex-col sm:mt-10 mt-12 " style={{ zIndex: "0" }}>
          <Card
            sx={{
              width: window.innerWidth > 767 ? "83%" : "100%",
              position: "relative",
              margin: window.innerWidth > 767 ? "2% 13%" : "2% 0",
            }}
          >
            <LineChart
              series={[{ data: expenseLineChartData }]}
              xAxis={[{ scaleType: "point", data: months }]}
              height={300}
            />
          </Card>
          <div
            className="grid sm:grid-cols-2  w-fit gap-6 relative grid-cols-1 "
            style={
              window.innerWidth > 767
                ? { marginLeft: "13%" }
                : { marginLeft: "2%" }
            }
          >
            <DataGrid
              className="w-full m-auto bg-white col-span-1"
              rows={expenseTableData}
              columns={expensesTableColumns}
              getRowId={(row) => row.id || new Date().getTime()}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              disableRowSelectionOnClick
            />

            <Card
              sx={{
                width: window.innerWidth > 767 ? "90%" : "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "5% 0",
              }}
            >
              <PieChart
                series={[
                  {
                    data: expensePieData,
                    highlightScope: { faded: "global", highlighted: "item" },
                    faded: {
                      innerRadius: 30,
                      additionalRadius: -30,
                      color: "gray",
                    },
                  },
                ]}
                height={window.innerWidth > 767 ? 200 : 120}
              />
            </Card>
            {/* <Card
                sx={{
                  width: "90%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "5% 0",
                }}
              >
                <LineChart
                  series={[{ data: expenseLineChartData }]}
                  xAxis={[{ scaleType: "point", data: months }]}
                  height={300}
                  width={900}
                />
              </Card> */}
          </div>
          {/* <Card
            sx={{
              width: "83%",
              position: "absolute",
              right: "4%",
              marginTop: "2%",
            }}
          >
            <LineChart
              series={[{ data: expenseLineChartData }]}
              xAxis={[{ scaleType: "point", data: months }]}
              height={300}
            />
          </Card> */}
        </div>
      ) : null}
      {isIncomeClicked ? (
        <div className="flex flex-col sm:mt-10 sm:m-20 mt-20 ">
          <div className="flex gap-4 w-fit  mx-auto sm:mt-6 mt-4">
            {incomeCardsData.map((cardData) => (
              <Card className="m-auto w-fit">
                <CardContent>
                  <Typography sx={{ fontWeight: "bold" }}>
                    {cardData.account}
                  </Typography>{" "}
                  <Typography variant="h7">PKR {cardData.income}</Typography>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card
            sx={{
              width: window.innerWidth > 767 ? "95%" : "100%  ",
              position: "relative",
              margin: window.innerWidth > 767 ? "2% 8%" : "2%   0",
            }}
          >
            <LineChart
              series={[{ data: incomeLineChartData }]}
              xAxis={[{ scaleType: "point", data: months }]}
              height={300}
            />
          </Card>
          <div
            className="grid sm:grid-cols-2 grid-cols-1 mt-12 w-fit gap-6 sm:w-full"
            style={
              window.innerWidth > 767
                ? { marginLeft: "8%" }
                : { marginLeft: "1%" }
            }
          >
            <DataGrid
              className="w-full m-auto bg-white"
              rows={incomeTableData}
              columns={incomesTableColumns}
              getRowId={(row) => row.id || new Date().getTime()}
              disableRowSelectionOnClick
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              pageSizeOptions={[10]}
            />
            <div className="flex flex-col gap-2">
              <Card
                sx={{
                  width: window.innerWidth > 767 ? "90%" : "100%  ",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "5%",
                }}
              >
                <PieChart
                  series={[
                    {
                      data: incomePieData,
                      highlightScope: { faded: "global", highlighted: "item" },
                      faded: {
                        innerRadius: 30,
                        additionalRadius: -30,
                        color: "gray",
                      },
                    },
                  ]}
                  height={window.innerWidth > 767 ? 200 : 120}
                />
              </Card>
              <Card
                sx={{
                  width: window.innerWidth > 767 ? "90%" : "100%  ",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "5%",
                }}
              >
                <PieChart
                  series={[
                    {
                      data: [
                        ...incomeCardsData.map((data) => ({
                          value: data.income,
                          label: data.account,
                        })),
                      ],
                      highlightScope: { faded: "global", highlighted: "item" },
                      faded: {
                        innerRadius: 30,
                        additionalRadius: -30,
                        color: "gray",
                      },
                    },
                  ]}
                  height={window.innerWidth > 767 ? 200 : 120}
                />
              </Card>
            </div>
            {/* <Card
                sx={{
                  width: "90%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "5%",
                }}
              >
                <PieChart
                  series={[
                    {
                      data: incomePieData,
                      highlightScope: { faded: "global", highlighted: "item" },
                      faded: {
                        innerRadius: 30,
                        additionalRadius: -30,
                        color: "gray",
                      },
                    },
                  ]}
                  height={200}
                />
              </Card> */}
          </div>
        </div>
      ) : null}
      {!isExpenseClicked && !isIncomeClicked ? (
        <div className="flex  justify-center  mt-24 sm:mt-12   ">
          <p className=" text-gray-600">
            Select expenses or incomes to view data
          </p>
        </div>
      ) : null}
      {isDeleteAccountModalOpen ? <DeleteAccountAlertModal /> : null}
    </>
  );
}
