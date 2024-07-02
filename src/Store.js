import { LocalLaundryService } from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

const userDetail = JSON.parse(localStorage.getItem("Logged in ID"));
// const email = userDetail?.email;
export function getExpenses() {
  const expenses = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.includes(userDetail?.email) && key.includes("Expense")) {
      const expense = JSON.parse(localStorage.getItem(key));
      expenses.push(expense);
    }
  }
  return expenses;
}
export function getIncomes() {
  const incomes = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.includes(userDetail?.email) && key.includes("Income")) {
      const income = JSON.parse(localStorage.getItem(key));
      incomes.push(income);
    }
  }
  return incomes;
}
function getIncomeAccounts() {
  if (localStorage.getItem(`${userDetail?.email} IncomeAccounts`)) {
    return JSON.parse(
      localStorage.getItem(`${userDetail?.email} IncomeAccounts`)
    );
  } else {
    localStorage.setItem(
      `${userDetail?.email} IncomeAccounts`,
      JSON.stringify(["Cash"])
    );
    return ["Cash"];
  }
}
const reduxSlice = createSlice({
  name: "States",
  initialState: {
    userDetail: userDetail,
    isAddExpenseModalOpen: false,
    isAddIncomeModalOpen: false,
    expenses: getExpenses(),
    incomes: getIncomes(),
    selectedMonth: null,
    selectedYear: null,
    selectedCategory: null,
    selectedSource: null,
    isIncomeClicked: false,
    isExpenseClicked: true,
    expenseCategories: [
      "Housing",
      "Transportation",
      "Food",
      "Utilities",
      "Insurance",
      "Healthcare",
    ],
    incomeSources: [
      "Salary",
      "Business",
      "Investments",
      "Freelancing",
      "Rental Income",
      "Interest",
    ],
    accountsArray: getIncomeAccounts(),

    selectedAccount: null,
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    isDeleteAccountModalOpen: false,
    shallShowNavBar: window.innerWidth <= 767 ? false : true,
  },
  reducers: {
    setUserDetail(state, action) {
      state.userDetail = action.payload;
    },
    setIsAddExpenseModalOpen(state, action) {
      state.isAddExpenseModalOpen = action.payload;
    },

    setIsAddIncomeModalOpen(state, action) {
      state.isAddIncomeModalOpen = action.payload;
    },
    setExpenses(state, action) {
      state.expenses = action.payload;
    },
    setIncomes(state, action) {
      state.incomes = action.payload;
    },
    setSelectedMonth(state, action) {
      state.selectedMonth = action.payload;
    },
    setSelectedYear(state, action) {
      state.selectedYear = action.payload;
    },
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
    },
    setSelectedSource(state, action) {
      state.selectedSource = action.payload;
    },
    setIsExpenseClicked(state, action) {
      state.isExpenseClicked = action.payload;
    },
    setIsIncomeClicked(state, action) {
      state.isIncomeClicked = action.payload;
    },
    setSelectedAccount(state, action) {
      state.selectedAccount = action.payload;
    },
    setAccountsArray(state, action) {
      state.accountsArray = action.payload;
    },
    setIsDeleteAccountModalOpen(state, action) {
      state.isDeleteAccountModalOpen = action.payload;
    },
    setShallShowNavBar(state, action) {
      state.shallShowNavBar = action.payload;
    },
  },
});

const store = configureStore({
  reducer: reduxSlice.reducer,
});

export const {
  setUserDetail,
  setIsAddExpenseModalOpen,
  setIsAddIncomeModalOpen,
  setExpenses,
  setIncomes,
  setSelectedMonth,
  setSelectedYear,
  setSelectedCategory,
  setSelectedSource,
  setIsExpenseClicked,
  setIsIncomeClicked,
  setSelectedAccount,
  setAccountsArray,
  setIsDeleteAccountModalOpen,
  setShallShowNavBar,
} = reduxSlice.actions;
export default store;
