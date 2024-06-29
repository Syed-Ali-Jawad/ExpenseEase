import { createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

const getIncomesFromLocalStorage = (email) => {
  const entries = Array.from({ length: localStorage.length }).map(
    (_, index) => {
      const key = localStorage.key(index);
      if (key.includes("Income:") && key.includes(email)) {
        return JSON.parse(localStorage.getItem(key));
      }
      return null;
    }
  );
  return entries.filter((entry) => entry || null);
};
const userDetail = JSON.parse(localStorage.getItem("Logged in ID"));
// const email = userDetail?.email;
const reduxSlice = createSlice({
  name: "States",
  initialState: {
    userDetail: JSON.parse(localStorage.getItem("Logged in ID")),
    isAddExpenseModalOpen: false,
    isAddIncomeModalOpen: false,
    expenses: [],
    incomes: [],
    selectedMonth: null,
    selectedYear: null,
    selectedCategory: null,
    selectedSource: null,
    isIncomeClicked: false,
    isExpenseClicked: true,
    expenseCategories: ["Housing", "Transportation", "Food and Dining"],
    incomeSources: ["Salary", "Investment", "Allowance"],
    accountsArray: JSON.parse(
      localStorage.getItem(`${userDetail?.email} IncomeAccounts`)
    ),

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
