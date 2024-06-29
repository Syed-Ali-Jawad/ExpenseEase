import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Box,
  Select,
  Typography,
  Button,
  ListItem,
  MenuItem,
  Menu,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  setIsAddExpenseModalOpen,
  setIsAddIncomeModalOpen,
  setSelectedCategory,
  setSelectedSource,
  setSelectedMonth,
  setSelectedYear,
  setSelectedAccount,
  setExpenses,
  setAccountsArray,
  setIsDeleteAccountModalOpen,
  setShallShowNavBar,
} from "../Store";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
export default function NavBar() {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userDetail);
  const dispatch = useDispatch();
  const currentYear = new Date().getFullYear();
  const months = useSelector((state) => state.months);
  const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState(false);
  const [areFiltersOpen, setAreFiltersOpen] = useState(false);
  const isExpenseClicked = useSelector((state) => state.isExpenseClicked);
  const isIncomeClicked = useSelector((state) => state.isIncomeClicked);
  const expenseCategories = useSelector((state) => state.expenseCategories);
  const incomeSources = useSelector((state) => state.incomeSources);
  const accountsArray = useSelector((state) => state.accountsArray);
  const [account, setAccount] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const [category, setCategory] = useState();
  const [source, setSource] = useState();
  const [isFiltering, setIsFiltering] = useState();
  const shallShowNavBar = useSelector((state) => state.shallShowNavBar);

  function filterHandler() {
    dispatch(setSelectedAccount(account));
    dispatch(setSelectedCategory(category));
    dispatch(setSelectedMonth(month));
    dispatch(setSelectedSource(source));
    dispatch(setSelectedYear(year));

    setAreFiltersOpen(false);
  }
  function clearFiltersHandler() {
    setCategory(null);
    setAccount(null);
    setMonth(null);
    setYear(null);
    setSource(null);
    dispatch(setSelectedAccount(null));
    dispatch(setSelectedCategory(null));
    dispatch(setSelectedMonth(null));
    dispatch(setSelectedSource(null));
    dispatch(setSelectedYear(null));
    setIsFiltering(false);
  }

  // function deleteAcoountHandler() {
  //   navigate("/login");
  //   const itemsToRemove = [];
  //   for (let i = 0; i < localStorage.length; i++) {
  //     const key = localStorage.key(i);
  //     if (key.includes(userData.email)) {
  //       itemsToRemove.push(key);
  //     }
  //   }
  //   itemsToRemove.forEach((itemKey) => localStorage.removeItem(itemKey));
  //   dispatch(setExpenses([]));
  //   dispatch(setIncomes([]));
  //   dispatch(setAccountsArray([]));
  //   localStorage.removeItem(`${userData.email}`);
  //   localStorage.removeItem("Logged in ID");
  // }

  if (shallShowNavBar) {
    return (
      <Box
        // sx={{ background: "linear-gradient(90deg,#FFDAB9, #FFA500)" }}
        className="h-screen w-fit flex flex-col fixed top-0 left-0 shadow-2xl bg-indigo-500 sm:py-6 px-4 left  gap-4 z-10 "
      >
        <div className="sm:hidden block w-fit">
          <IconButton
            size="large"
            edge="start"
            sx={{ marginLeft: "0px" }}
            onClick={() =>
              dispatch(setShallShowNavBar(shallShowNavBar ? false : true))
            }
          >
            <ArrowBackIcon sx={{ color: "white" }} />
          </IconButton>
        </div>

        <Typography
          className="sm:block text-white justify-start text-center hidden"
          variant="h7"
          component="div"
        >
          Welcome back <br />
          <Typography variant="h5">{userData.username}</Typography>
        </Typography>

        <Button
          onClick={() => {
            dispatch(setIsAddExpenseModalOpen(true));
            {
              window.innerWidth < 767
                ? dispatch(setShallShowNavBar(false))
                : null;
            }
          }}
          sx={{ color: "white" }}
        >
          Add Expense
        </Button>

        <Button
          onClick={() => {
            dispatch(setIsAddIncomeModalOpen(true));
            {
              window.innerWidth < 767
                ? dispatch(setShallShowNavBar(false))
                : null;
            }
          }}
          sx={{ color: "white" }}
        >
          Add Income
        </Button>

        <Button
          id="filter-btn"
          onClick={(e) => setAreFiltersOpen(e.currentTarget)}
          sx={{ color: "white" }}
        >
          Filter
        </Button>
        {isFiltering ? (
          <Button
            onClick={() => {
              clearFiltersHandler();
              {
                window.innerWidth < 767
                  ? dispatch(setShallShowNavBar(false))
                  : null;
              }
            }}
            sx={{ color: "white" }}
          >
            Remove <br />
            Filters
          </Button>
        ) : null}
        <Menu
          open={Boolean(areFiltersOpen)}
          anchorEl={areFiltersOpen}
          onClose={() => setAreFiltersOpen(null)}
          MenuListProps={{ "aria-labeledby": "filter-btn" }}
          disableScrollLock
        >
          <MenuItem
            sx={{
              position: "relative",
              left: "20%",

              "&:hover": { backgroundColor: "white" },
            }}
          >
            <Button
              variant="outlined"
              onClick={() => {
                filterHandler();
                setIsFiltering(true);
                {
                  window.innerWidth < 767
                    ? dispatch(setShallShowNavBar(false))
                    : null;
                }
              }}
            >
              Filter
            </Button>
          </MenuItem>
          <MenuItem sx={{ "&:hover": { backgroundColor: "white" } }}>
            <Select
              onChange={(e) => setMonth(e.target.value)}
              sx={{
                width: "130px",
                color: "black",
                border: "none",
              }}
              defaultValue={month || "Month"}
            >
              <MenuItem value="Month">Month</MenuItem>
              {months.map((month, index) => (
                <MenuItem value={index + 1}>{month}</MenuItem>
              ))}
            </Select>
          </MenuItem>
          <MenuItem sx={{ "&:hover": { backgroundColor: "white" } }}>
            <Select
              onChange={(e) => setYear(e.target.value)}
              sx={{
                width: "130px",
                color: "black",
                border: "none",
              }}
              defaultValue={year || "Year"}
            >
              <MenuItem value="Year">Year</MenuItem>
              <MenuItem value={currentYear}>{currentYear}</MenuItem>
              <MenuItem value={currentYear - 1}>{currentYear - 1}</MenuItem>
              <MenuItem value={currentYear - 2}>{currentYear - 2}</MenuItem>
              <MenuItem value={currentYear - 3}>{currentYear - 3}</MenuItem>
              <MenuItem value={currentYear - 4}>{currentYear - 4}</MenuItem>
              <MenuItem value={currentYear - 5}>{currentYear - 5}</MenuItem>
            </Select>
          </MenuItem>

          {isExpenseClicked ? (
            <MenuItem sx={{ "&:hover": { backgroundColor: "white" } }}>
              {" "}
              <Select
                onChange={(e) => setCategory(e.target.value)}
                sx={{
                  width: "130px",
                  color: "black",
                  border: "none",
                }}
                defaultValue={category || "Category"}
              >
                <MenuItem value="Category">Category</MenuItem>
                {expenseCategories.map((category) => (
                  <MenuItem value={category}>{category}</MenuItem>
                ))}
              </Select>
            </MenuItem>
          ) : null}
          {isIncomeClicked ? (
            <>
              <MenuItem sx={{ "&:hover": { backgroundColor: "white" } }}>
                <Select
                  onChange={(e) => setSource(e.target.value)}
                  sx={{
                    width: "130px",
                    color: "black",
                    border: "none",
                  }}
                  defaultValue={source || "Source"}
                >
                  <MenuItem value="Source">Source</MenuItem>
                  {incomeSources.map((source) => (
                    <MenuItem value={source}>{source}</MenuItem>
                  ))}
                </Select>
              </MenuItem>
              <MenuItem sx={{ "&:hover": { backgroundColor: "white" } }}>
                <Select
                  onChange={(e) => setAccount(e.target.value)}
                  sx={{
                    width: "130px",
                    color: "black",
                    border: "none",
                  }}
                  defaultValue="Account"
                >
                  <MenuItem value="Account">Account</MenuItem>
                  {accountsArray.map((account) => (
                    <MenuItem value={account}>{account}</MenuItem>
                  ))}
                </Select>
              </MenuItem>
            </>
          ) : null}
        </Menu>
        <Button
          id="settings-btn"
          onClick={(e) => setIsSettingsMenuOpen(e.currentTarget)}
          sx={{ color: "white" }}
        >
          Settings
        </Button>
        <Menu
          open={Boolean(isSettingsMenuOpen)}
          anchorEl={isSettingsMenuOpen}
          onClose={() => setIsSettingsMenuOpen(null)}
          MenuListProps={{ "aria-labelledby": "settings-btn" }}
          disableScrollLock
        >
          <MenuItem
            onClick={() => {
              navigate("/"), localStorage.removeItem("Logged in ID");
              setIsSettingsMenuOpen(false);
            }}
            sx={{ color: "black" }}
          >
            Logout
          </MenuItem>
          <MenuItem
            onClick={() => {
              dispatch(setIsDeleteAccountModalOpen(true));
              setIsSettingsMenuOpen(false);
              {
                window.innerWidth < 767
                  ? dispatch(setShallShowNavBar(false))
                  : null;
              }
            }}
            sx={{ color: "black" }}
          >
            Delete Account
          </MenuItem>
        </Menu>
      </Box>

      // <div
      //   style={{ boxShadow: "5px 5px 5px black" }}
      //   className="w-screen h-1/6 bg-slate-100 grid grid-cols-3"
      // >
      //   <h1 className="col-span-1 font-bold">Expense Manager</h1>
      // </div>
    );
  }
}
