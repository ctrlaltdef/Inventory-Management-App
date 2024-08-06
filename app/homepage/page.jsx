"use client";

import { useState, useEffect } from "react";
import { firestore, auth } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import {
  Box,
  CssBaseline,
  Container,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Button,
  Typography,
} from "@mui/material";
import { Edit, Delete, Add as AddIcon } from "@mui/icons-material";
import {
  query,
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import { InView } from "react-intersection-observer";
import AppBar from "@/app/components/AppBar";
import InventoryStats from "@/app/components/InventoryStats";
 

const categories = [
  "Beverages",
  "Dairy Products",
  "Fruits",
  "Vegetables",
  "Meat and Poultry",
  "Seafood",
  "Bakery Products",
  "Grains and Cereals",
  "Snacks",
  "Condiments and Sauces",
  "Others",
];

const units = [
  "Kilogram (kg)",
  "Gram (g)",
  "Pound (lb)",
  "Liter (L)",
  "Milliliter (mL)",
  "Each (ea)",
  "Pack",
];

const labelStyle = { color: "#c6ddf0" };

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [addProductOpen, setAddProductOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [user] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!user && !sessionStorage.getItem("user")) {
      router.push("/");
    }
  }, [user, router]);

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, "products"));
    const docs = await getDocs(snapshot);
    const inventoryList = docs.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setInventory(inventoryList);
  };

  const addProductToInventory = async (product) => {
    try {
      const docRef = await addDoc(collection(firestore, "products"), product);
      return { ...product, id: docRef.id };
    } catch (error) {
      console.error("Error adding product: ", error);
    }
  };

  const handleAddProduct = async (product) => {
    const newProduct = await addProductToInventory(product);
    if (newProduct) {
      setInventory((prev) => [...prev, newProduct]);
    }
    handleAddProductClose();
  };

  const removeItem = async (id) => {
    await deleteDoc(doc(firestore, "products", id));
    setInventory((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddProductOpen = () => setAddProductOpen(true);

  const handleAddProductClose = () => {
    setAddProductOpen(false);
    setCurrentProduct(null);
  };

  const handleEditProduct = (product) => {
    setInventory((prev) =>
      prev.map((p) => (p.id === product.id ? product : p))
    );
    handleAddProductClose();
  };

  useEffect(() => {
    updateInventory();
  }, []);

  const theme = createTheme({
    palette: {
      mode: "dark",
      background: {
        paper: "#5e4955",
        default: "#2a2b2a",
      },
      text: {
        primary: "#c6ddf0",
        secondary: "#c99da3",
      },
      primary: {
        main: "#996888",
      },
      secondary: {
        main: "#c99da3",
      },
    },
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const dialogVariants = {
    hidden: { opacity: 0, scale: 0.75 },
    visible: { opacity: 1, scale: 1 },
  };

  const tableRowVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const filteredInventory = inventory.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{
          minHeight: "100vh",
          backgroundColor: "#232523",
          paddingTop: "64px",
        }}
      >
        <Box
          component={motion.div}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }} // Adjust the duration as needed
          sx={{
            display: "inline-block",
            padding: "10px 20px",
            borderRadius: "40px",
            background:
              "linear-gradient(315deg, #996888 20%, #c6ddf0 50%, #c99da3 80%)",
            border: "2px solid transparent",
            backgroundClip: "padding-box, border-box",
            backgroundOrigin: "border-box",
            position: "relative",
            zIndex: 1,
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: "inherit",
              padding: "2px",
              background: "inherit",
              zIndex: -1,
            },
          }}
        >
          <Typography variant="h3" sx={{ color: "#232523", fontWeight: 800 }}>
            INVENTORY OVERVIEW
          </Typography>
        </Box>

        <InventoryStats inventory={inventory} />
        <Box sx={{ paddingX: 10, width: "100%", paddingBottom: 10 }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                variant="outlined"
                placeholder="Search by name"
                fullWidth
                sx={{ marginBottom: 2, borderColor: "#fff" }}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Grid>
            <Grid item>
              <Button
                onClick={handleAddProductOpen}
                variant="contained"
                sx={{
                  color: "#fff",
                  backgroundColor: "#5e4955",
                  "&:hover": {
                    backgroundColor: "#996888",
                  },
                }}
              >
                <AddIcon sx={{ color: "#fff" }} />
                Add New Item
              </Button>
            </Grid>
          </Grid>
          <InView triggerOnce>
            {({ inView, ref }) => (
              <TableContainer
                ref={ref}
                sx={{
                  width: "100%",
                  backgroundColor: "#2a2b2a",
                  backgroundImage:
                    "linear-gradient(170deg, #2a2b2a 0%, #51404a 30%, #6d3c4b 50%, #9a6581 70%, #c6ddf0 100%)",
                }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>No.</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Price($)</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Unit</TableCell>
                      <TableCell>Action</TableCell>
                      <TableCell>Image</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredInventory.map((item, index) => (
                      <InView key={item.id} triggerOnce>
                        {({ inView, ref }) => (
                          <TableRow
                            ref={ref}
                            component={motion.tr}
                            initial="hidden"
                            animate={inView ? "visible" : "hidden"}
                            variants={tableRowVariants}
                            whileHover={{
                              scale: 1.01,
                              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                            }}
                            transition={{ type: "spring", stiffness: 100 }}
                          >
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{item.name || "N/A"}</TableCell>
                            <TableCell>{item.category || "N/A"}</TableCell>
                            <TableCell>{item.price || "N/A"}</TableCell>
                            <TableCell>{item.quantity || "N/A"}</TableCell>
                            <TableCell>{item.unit || "N/A"}</TableCell>
                            <TableCell>
                              <IconButton
                                onClick={() => {
                                  setCurrentProduct(item);
                                  handleAddProductOpen();
                                }}
                              >
                                <Edit />
                              </IconButton>
                              <IconButton onClick={() => removeItem(item.id)}>
                                <Delete />
                              </IconButton>
                            </TableCell>
                            <TableCell>
                              {item.imageUrl ? (
                                <img
                                  src={item.imageUrl}
                                  alt={item.name}
                                  style={{ width: "50px", height: "50px" }}
                                  onError={(e) =>
                                    (e.target.style.display = "none")
                                  }
                                />
                              ) : (
                                "N/A"
                              )}
                            </TableCell>
                          </TableRow>
                        )}
                      </InView>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </InView>
        </Box>
        <motion.div
          initial="hidden"
          animate={addProductOpen ? "visible" : "hidden"}
          variants={dialogVariants}
        >
          <Dialog
            open={addProductOpen}
            onClose={handleAddProductClose}
            PaperProps={{
              style: {
                backgroundColor: "#51404a",
                backgroundImage:
                  "linear-gradient(170deg, #2a2b2a 0%, #51404a 30%, #6d3c4b 50%, #9a6581 70%, #c6ddf0 100%)",
              },
            }}
          >
            <DialogTitle sx={{ color: "#fff" }}>
              {currentProduct ? "Edit Product" : "Add New Product"}
            </DialogTitle>
            <DialogContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const { name, category, price, quantity, unit, imageUrl } =
                    e.target;
                  const product = {
                    name: name.value,
                    category: category.value,
                    price: parseFloat(price.value),
                    quantity: parseInt(quantity.value),
                    unit: unit.value,
                    imageUrl: imageUrl.value,
                  };

                  currentProduct
                    ? handleEditProduct({ ...product, id: currentProduct.id })
                    : handleAddProduct(product);
                }}
              >
                <TextField
                  fullWidth
                  name="name"
                  label="Name"
                  defaultValue={currentProduct?.name || ""}
                  variant="outlined"
                  sx={{ marginBottom: 2 }}
                  InputLabelProps={{ style: labelStyle }}
                  InputProps={{
                    style: { color: "#c6ddf0" },
                  }}
                />
                <TextField
                  select
                  fullWidth
                  name="category"
                  label="Category"
                  defaultValue={currentProduct?.category || ""}
                  variant="outlined"
                  sx={{ marginBottom: 2 }}
                  InputLabelProps={{ style: labelStyle }}
                  InputProps={{
                    style: { color: "#c6ddf0" },
                  }}
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  fullWidth
                  name="price"
                  label="Price"
                  type="number"
                  defaultValue={currentProduct?.price || ""}
                  variant="outlined"
                  sx={{ marginBottom: 2 }}
                  InputLabelProps={{ style: labelStyle }}
                  InputProps={{
                    style: { color: "#c6ddf0" },
                  }}
                />
                <TextField
                  fullWidth
                  name="quantity"
                  label="Quantity"
                  type="number"
                  defaultValue={currentProduct?.quantity || ""}
                  variant="outlined"
                  sx={{ marginBottom: 2 }}
                  InputLabelProps={{ style: labelStyle }}
                  InputProps={{
                    style: { color: "#c6ddf0" },
                  }}
                />
                <TextField
                  select
                  fullWidth
                  name="unit"
                  label="Unit"
                  defaultValue={currentProduct?.unit || ""}
                  variant="outlined"
                  sx={{ marginBottom: 2 }}
                  InputLabelProps={{ style: labelStyle }}
                  InputProps={{
                    style: { color: "#c6ddf0" },
                  }}
                >
                  {units.map((unit) => (
                    <MenuItem key={unit} value={unit}>
                      {unit}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  fullWidth
                  name="imageUrl"
                  label="Image URL"
                  defaultValue={currentProduct?.imageUrl || ""}
                  variant="outlined"
                  sx={{ marginBottom: 2 }}
                  InputLabelProps={{ style: labelStyle }}
                  InputProps={{
                    style: { color: "#c6ddf0" },
                  }}
                />
                <DialogActions>
                  <Button
                    onClick={handleAddProductClose}
                    sx={{ color: "#5e4955" }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      color: "#fff",
                      backgroundColor: "#5e4955",
                      "&:hover": {
                        backgroundColor: "#996888",
                      },
                    }}
                  >
                    {currentProduct ? "Save Changes" : "Add Product"}
                  </Button>
                </DialogActions>
              </form>
            </DialogContent>
          </Dialog>
        </motion.div>
      </Box>
    </ThemeProvider>
  );
}
