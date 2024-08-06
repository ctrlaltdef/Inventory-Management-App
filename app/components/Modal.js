import {
    Box,
    Typography,
    Modal,
    Stack,
    TextField,
    Button,
  } from "@mui/material";
  
  export default function ModalComponent({
    open,
    handleClose,
    itemName,
    setItemName,
    addItem,
  }) {
    const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "80%",
      maxWidth: 600,
      bgcolor: "#121212",
      border: "2px solid #333",
      boxShadow: 24,
      p: 4,
      display: "flex",
      flexDirection: "column",
      gap: 3,
      borderRadius: 2,
    };
  
    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            color="text.primary"
          >
            Add Item
          </Typography>
          <Stack width="100%" direction="row" spacing={2}>
            <TextField
              id="outlined-basic"
              label="Item"
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              InputLabelProps={{ style: { color: "text.secondary" } }}
              InputProps={{ style: { color: "text.primary" } }}
            />
            <Button
              variant="outlined"
              sx={{ color: "text.secondary", borderColor: "text.secondary" }}
              onClick={() => {
                addItem(itemName);
                setItemName("");
                handleClose();
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
    );
  }
  