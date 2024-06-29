import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  setIsDeleteAccountModalOpen,
  setExpenses,
  setIncomes,
  setAccountsArray,
} from "../Store";
import { useNavigate } from "react-router-dom";
export default function DeleteAccountAlertModal() {
  const isDeleteAccountModalOpen = useSelector(
    (state) => state.isDeleteAccountModalOpen
  );
  const userData = useSelector((state) => state.userDetail);
  const navigate = useNavigate();
  function deleteAccountHandler() {
    navigate("/ExpenseEase/");
    dispatch(isDeleteAccountModalOpen(false));
    let itemsToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.includes(userData.email)) {
        itemsToRemove.push(key);
      }
    }
    itemsToRemove.forEach((itemKey) => localStorage.removeItem(itemKey));
    dispatch(setExpenses([]));
    dispatch(setIncomes([]));
    dispatch(setAccountsArray([]));
    localStorage.removeItem(`${userData.email}`);
    localStorage.removeItem("Logged in ID");
  }

  const dispatch = useDispatch();
  return (
    <Dialog
      open={isDeleteAccountModalOpen}
      onClose={() => dispatch(setIsDeleteAccountModalOpen(false))}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Confirm Delete Account"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete the account? This will permenantaly
          delete the account.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => dispatch(setIsDeleteAccountModalOpen(false))}
        >
          Cancel
        </Button>
        <Button onClick={deleteAccountHandler} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
