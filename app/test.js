// "use client";
// import { useState, useEffect } from "react";
// import { firestore } from "@/firebase";
// import {
//   Box,
//   CssBaseline,
//   Container,
// } from "@mui/material";
// import {
//   query,
//   collection,
//   getDocs,
//   addDoc,
//   doc,
//   deleteDoc,
//   getDoc,
//   setDoc
// } from "firebase/firestore";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "@/firebase";
// import { useRouter } from "next/navigation";
// import { ThemeProvider, createTheme } from "@mui/material/styles";
// import AppBar from "@/app/components/AppBar.js";
// import Drawer from "@/app/components/Drawer.js";
// import AddProductForm from "@/app/components/AddProduct.js";
// import InventoryTable from "@/app/components/InventoryTable.js";
// import InventoryStats from "@/app/components/InventoryStats.js";

// export default function Home() {
//   const [inventory, setInventory] = useState([]);
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [addProductOpen, setAddProductOpen] = useState(false);
//   const [user] = useAuthState(auth);
//   const router = useRouter();

//   useEffect(() => {
//     const userSession = sessionStorage.getItem("user");
//     if (!user && !userSession) {
//       router.push("/sign-in");
//     }
//   }, [user, router]);

//   const updateInventory = async () => {
//     const snapshot = query(collection(firestore, "inventory"));
//     const docs = await getDocs(snapshot);
//     const inventoryList = [];
//     docs.forEach((doc) => {
//       inventoryList.push({
//         id: doc.id,
//         ...doc.data(),
//       });
//     });
//     setInventory(inventoryList);
//   };

//   const addProductToInventory = async (product) => {
//     try {
//       await addDoc(collection(firestore, "inventory"), product);
//       updateInventory();
//     } catch (error) {
//       console.error("Error adding product: ", error);
//     }
//   };

//   const addProduct = async (product) => {
//     await addProductToInventory(product);
//     // Fetch updated inventory after adding product
//     updateInventory();
//   };

// //   const removeItem = async (item) => {
// //     const docRef = doc(collection(firestore, "inventory"), item);
// //     const docSnap = await getDoc(docRef);
// //     if (docSnap.exists()) {
// //       const { quantity } = docSnap.data();
// //       if (quantity > 1) {
// //         await setDoc(docRef, { quantity: quantity - 1 });
// //       } else {
// //         await deleteDoc(docRef);
// //       }
// //       updateInventory();
// //     }
// //   };

// const removeItem = async (id) => {
//     const docRef = doc(collection(firestore, "inventory"), id);
//     const docSnap = await getDoc(docRef);
//     if (docSnap.exists()) {
//       const { quantity } = docSnap.data();
//       if (quantity > 1) {
//         await setDoc(docRef, { quantity: quantity - 1 });
//       } else {
//         await deleteDoc(docRef);
//       }
//       updateInventory();
//     }

// };

//   const handleDrawerOpen = () => {
//     setDrawerOpen(true);
//   };

//   const handleDrawerClose = () => {
//     setDrawerOpen(false);
//   };

//   const handleAddProductOpen = () => {
//     setAddProductOpen(true);
//   };

//   const handleAddProductClose = () => {
//     setAddProductOpen(false);
//   };

//   useEffect(() => {
//     updateInventory();
//   }, []);

//   const theme = createTheme({
//     palette: {
//       mode: "dark",
//       background: {
//         paper: "#5e4955",
//         default: "#2a2b2a",
//       },
//       text: {
//         primary: "#c6ddf0",
//         secondary: "#c99da3",
//       },
//       primary: {
//         main: "#996888",
//       },
//       secondary: {
//         main: "#c99da3",
//       },
//     },
//   });

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <AppBar handleDrawerOpen={handleDrawerOpen} />
//       <Drawer
//         drawerOpen={drawerOpen}
//         handleDrawerClose={handleDrawerClose}
//         handleAddProductOpen={handleAddProductOpen}
//       />
//       <Box
//         display="flex"
//         flexDirection="column"
//         alignItems="center"
//         justifyContent="center"
//         sx={{
//           minHeight: "100vh",
//           background: "linear-gradient(130deg, #2a2b2a, #996888, #c6ddf0)",
//           paddingTop: "64px",
//         }}
//       >
//         <InventoryStats />
//         <InventoryTable
//           inventory={inventory}
//           addItem={addProduct}
//           removeItem={removeItem}
//         />
//       </Box>
//       <AddProductForm
//         open={addProductOpen}
//         handleClose={handleAddProductClose}
//         addProduct={addProduct}
//       />
//     </ThemeProvider>
//   );
// }

// "use client";
// import { useState, useEffect } from "react";
// import { firestore } from "@/firebase";
// import {
//   Box,
//   CssBaseline,
//   Container,
// } from "@mui/material";
// import {
//   query,
//   collection,
//   getDocs,
//   addDoc,
//   doc,
//   deleteDoc,
//   getDoc,
//   setDoc
// } from "firebase/firestore";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "@/firebase";
// import { useRouter } from "next/navigation";
// import { ThemeProvider, createTheme } from "@mui/material/styles";
// import AppBar from "@/app/components/AppBar.js";
// import Drawer from "@/app/components/Drawer.js";
// import AddProductForm from "@/app/components/AddProduct.js";
// import InventoryTable from "@/app/components/InventoryTable.js";
// import InventoryStats from "@/app/components/InventoryStats.js";

// export default function Home() {
//   const [inventory, setInventory] = useState([]);
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [addProductOpen, setAddProductOpen] = useState(false);
//   const [user] = useAuthState(auth);
//   const router = useRouter();
//   const userSession = sessionStorage.getItem("user");

//   if (!user && !userSession) {
//     router.push("/");
//   }

//   const updateInventory = async () => {
//     const snapshot = query(collection(firestore, "products"));
//     const docs = await getDocs(snapshot);
//     const inventoryList = [];
//     docs.forEach((doc) => {
//       inventoryList.push({
//         id: doc.id,
//         ...doc.data(),
//       });
//     });
//     setInventory(inventoryList);
//   };

//   const addProductToInventory = async (product) => {
//     try {
//       await addDoc(collection(firestore, "products"), product);
//       updateInventory();
//     } catch (error) {
//       console.error("Error adding product: ", error);
//     }
//   };

//   const addProduct = async (product) => {
//     await addProductToInventory(product);
//     // Fetch updated inventory after adding product
//     updateInventory();
//   };

//   const removeItem = async (id) => {
//     const docRef = doc(collection(firestore, "products"), id);
//     const docSnap = await getDoc(docRef);
//     if (docSnap.exists()) {
//       const { quantity } = docSnap.data();
//       if (quantity > 1) {
//         await setDoc(docRef, { quantity: quantity - 1 });
//       } else {
//         await deleteDoc(docRef);
//       }
//       updateInventory();
//     }
//   };

//   const handleDrawerOpen = () => {
//     setDrawerOpen(true);
//   };

//   const handleDrawerClose = () => {
//     setDrawerOpen(false);
//   };

//   const handleAddProductOpen = () => {
//     setAddProductOpen(true);
//   };

//   const handleAddProductClose = () => {
//     setAddProductOpen(false);
//   };

//   useEffect(() => {
//     updateInventory();
//   }, []);

//   const theme = createTheme({
//     palette: {
//       mode: "dark",
//       background: {
//         paper: "#5e4955",
//         default: "#2a2b2a",
//       },
//       text: {
//         primary: "#c6ddf0",
//         secondary: "#c99da3",
//       },
//       primary: {
//         main: "#996888",
//       },
//       secondary: {
//         main: "#c99da3",
//       },
//     },
//   });

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <AppBar handleDrawerOpen={handleDrawerOpen} />
//       <Drawer
//         drawerOpen={drawerOpen}
//         handleDrawerClose={handleDrawerClose}
//         handleAddProductOpen={handleAddProductOpen}
//       />
//       <Box
//         display="flex"
//         flexDirection="column"
//         alignItems="center"
//         justifyContent="center"
//         sx={{
//           minHeight: "100vh",
//           background: "linear-gradient(130deg, #2a2b2a, #996888, #c6ddf0)",
//           paddingTop: "64px",
//         }}
//       >
//         <InventoryStats />
//         <InventoryTable
//           inventory={inventory}
//           removeItem={removeItem}
//         />
//       </Box>
//       <AddProductForm
//         open={addProductOpen}
//         handleClose={handleAddProductClose}
//         addProduct={addProduct}
//       />
//     </ThemeProvider>
//   );
// }

// "use client";

// import { useState, useEffect } from "react";
// import { firestore } from "@/firebase";
// import { Box, CssBaseline, Container } from "@mui/material";
// import {
//   query,
//   collection,
//   getDocs,
//   addDoc,
//   doc,
//   deleteDoc,
//   getDoc,
//   setDoc,
// } from "firebase/firestore";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "@/firebase";
// import { useRouter } from "next/navigation";
// import { ThemeProvider, createTheme } from "@mui/material/styles";
// import AppBar from "@/app/components/AppBar.js";
// import Drawer from "@/app/components/Drawer.js";
// import AddProductForm from "@/app/components/AddProduct.js";
// import InventoryTable from "@/app/components/InventoryTable.js";
// import InventoryStats from "@/app/components/InventoryStats.js";

// export default function Home() {
//   const [inventory, setInventory] = useState([]);
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [addProductOpen, setAddProductOpen] = useState(false);
//   const [currentProduct, setCurrentProduct] = useState(null); // Manage the current product for editing
//   const [user] = useAuthState(auth);
//   const router = useRouter();
//   const userSession = sessionStorage.getItem("user");

//   if (!user && !userSession) {
//     router.push("/");
//   }

//   const updateInventory = async () => {
//     const snapshot = query(collection(firestore, "products"));
//     const docs = await getDocs(snapshot);
//     const inventoryList = [];
//     docs.forEach((doc) => {
//       inventoryList.push({
//         id: doc.id,
//         ...doc.data(),
//       });
//     });
//     setInventory(inventoryList);
//   };

//   const addProductToInventory = async (product) => {
//     try {
//       await addDoc(collection(firestore, "products"), product);
//       updateInventory();
//     } catch (error) {
//       console.error("Error adding product: ", error);
//     }
//   };

//   const addProduct = async (product) => {
//     await addProductToInventory(product);
//     // Fetch updated inventory after adding product
//     updateInventory();
//   };

//   const removeItem = async (id) => {
//     const docRef = doc(firestore, "products", id);
//     const docSnap = await getDoc(docRef);
//     if (docSnap.exists()) {
//       const { quantity } = docSnap.data();
//       if (quantity > 1) {
//         await setDoc(docRef, { quantity: quantity - 1 });
//       } else {
//         await deleteDoc(docRef);
//       }
//       updateInventory();
//     }
//   };

//   const handleDrawerOpen = () => {
//     setDrawerOpen(true);
//   };

//   const handleDrawerClose = () => {
//     setDrawerOpen(false);
//   };

//   const handleAddProductOpen = () => {
//     setAddProductOpen(true);
//   };

//   const handleAddProductClose = () => {
//     setAddProductOpen(false);
//     setCurrentProduct(null); // Clear the current product when closing
//   };

//   const handleAddProduct = (product) => {
//     setInventory(prev => [...prev, product]);
//     handleAddProductClose(); // Close the form
//   };

//   const handleEditProduct = (product) => {
//     setInventory(prev => prev.map(p => p.id === product.id ? product : p));
//     handleAddProductClose(); // Close the form
//   };

//   useEffect(() => {
//     updateInventory();
//   }, []);

//   const theme = createTheme({
//     palette: {
//       mode: "dark",
//       background: {
//         paper: "#5e4955",
//         default: "#2a2b2a",
//       },
//       text: {
//         primary: "#c6ddf0",
//         secondary: "#c99da3",
//       },
//       primary: {
//         main: "#996888",
//       },
//       secondary: {
//         main: "#c99da3",
//       },
//     },
//   });

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <AppBar handleDrawerOpen={handleDrawerOpen} />
//       <Drawer
//         drawerOpen={drawerOpen}
//         handleDrawerClose={handleDrawerClose}
//         handleAddProductOpen={handleAddProductOpen}
//       />
//       <Box
//         display="flex"
//         flexDirection="column"
//         alignItems="center"
//         justifyContent="center"
//         sx={{
//           minHeight: "100vh",
//           background: "linear-gradient(130deg, #2a2b2a, #996888, #c6ddf0)",
//           paddingTop: "64px",
//         }}
//       >
//         <InventoryStats />
//         <InventoryTable inventory={inventory} removeItem={removeItem} />
//       </Box>
//       <AddProductForm
//         open={addProductOpen}
//         handleClose={handleAddProductClose}
//         editProduct={currentProduct}
//         handleAddProduct={handleAddProduct}
//         handleEditProduct={handleEditProduct}
//       />
//     </ThemeProvider>
//   );
// }

///////////////////////////////////////////////////////////////////////////////////////////////////////////

"use client";

import { useState, useEffect } from "react";
import { firestore } from "@/firebase";
import { Box, CssBaseline, Container } from "@mui/material";
import {
  query,
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase";
import { useRouter } from "next/navigation";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AppBar from "@/app/components/AppBar.js";
import Drawer from "@/app/components/Drawer.js";
import AddProductForm from "@/app/components/AddProduct.js";
import InventoryTable from "@/app/components/InventoryTable.js";
import InventoryStats from "@/app/components/InventoryStats.js";

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [addProductOpen, setAddProductOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null); // Manage the current product for editing
  const [user] = useAuthState(auth);
  const router = useRouter();
  const userSession = sessionStorage.getItem("user");

  if (!user && !userSession) {
    router.push("/");
  }

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, "products"));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({
        id: doc.id,
        ...doc.data(),
      });
    });
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

  const addProduct = async (product) => {
    const newProduct = await addProductToInventory(product);
    if (newProduct) {
      setInventory(prev => [...prev, newProduct]);
    }
    handleAddProductClose(); // Close the form
  };

  const removeItem = async (id) => {
    const docRef = doc(firestore, "products", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity > 1) {
        await setDoc(docRef, { quantity: quantity - 1 });
      } else {
        await deleteDoc(docRef);
      }
      updateInventory();
    }
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleAddProductOpen = () => {
    setAddProductOpen(true);
  };

  const handleAddProductClose = () => {
    setAddProductOpen(false);
    setCurrentProduct(null); // Clear the current product when closing
  };

  const handleEditProduct = (product) => {
    setInventory(prev => prev.map(p => p.id === product.id ? product : p));
    handleAddProductClose(); // Close the form
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar handleDrawerOpen={handleDrawerOpen} />
      <Drawer
        drawerOpen={drawerOpen}
        handleDrawerClose={handleDrawerClose}
        handleAddProductOpen={handleAddProductOpen}
      />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(130deg, #2a2b2a, #996888, #c6ddf0)",
          paddingTop: "64px",
        }}
      >
        <InventoryStats />
        <InventoryTable inventory={inventory} removeItem={removeItem} />
      </Box>
      <AddProductForm
        open={addProductOpen}
        handleClose={handleAddProductClose}
        editProduct={currentProduct}
        handleAddProduct={addProduct}
        handleEditProduct={handleEditProduct}
      />
    </ThemeProvider>
  );
}


import { useState, useEffect } from "react";
import {
    Box,
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
    DialogTitle,
    DialogContent,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { getFirestore, collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import AddProductForm from './AddProduct';

const InventoryPage = () => {
    const [inventory, setInventory] = useState([]);
    const [isFormOpen, setFormOpen] = useState(false);
    const [editProduct, setEditProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchInventory();
    }, []);

    const fetchInventory = async () => {
        const db = getFirestore();
        const querySnapshot = await getDocs(collection(db, "products"));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setInventory(data);
    };

    const handleAddProduct = (product) => {
        setInventory(prev => [...prev, product]);
        setFormOpen(false); // Close the form
        // fetchInventory()
    };

    const handleEditProduct = (product) => {
        setInventory(prev => prev.map(item => (item.id === product.id ? product : item)));
        setFormOpen(false); // Close the form
        setEditProduct(null); // Clear the edit product state
    };

    const handleRemoveItem = async (id) => {
        const db = getFirestore();
        await deleteDoc(doc(db, "products", id));
        setInventory(prev => prev.filter(item => item.id !== id));
    };




    const filteredInventory = inventory.filter((item) =>
        item.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <Box sx={{ paddingX: 10, width: "100%", paddingBottom: 10 }}>
                <Grid container justifyContent="center">
                    <Grid item xs={12} sm={10} md={8}>
                        <TextField
                            variant="outlined"
                            placeholder="Search by name"
                            fullWidth
                            sx={{ marginBottom: 2, borderColor: "white" }}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </Grid>
                </Grid>
                <TableContainer
                    justifyContent="center"
                    component={Paper}
                    sx={{ width: "100%" }}
                >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>No.</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Price($)</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Action</TableCell>
                                <TableCell>Image</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredInventory.map((item, index) => (
                                <TableRow key={item.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{item.name || 'N/A'}</TableCell>
                                    <TableCell>{item.category || 'N/A'}</TableCell>
                                    <TableCell>{item.price || 'N/A'}</TableCell>
                                    <TableCell>{item.quantity || 'N/A'}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => {
                                            setEditProduct(item);
                                            setFormOpen(true);
                                        }}>
                                            <Edit />
                                        </IconButton>
                                        <IconButton onClick={() => handleRemoveItem(item.id)}>
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>
                                        {item.imageUrl ? (
                                            <img
                                                src={item.imageUrl}
                                                alt={item.name}
                                                style={{ width: '50px', height: '50px' }}
                                            />
                                        ) : (
                                            'N/A'
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Dialog open={isFormOpen} onClose={() => setFormOpen(false)}>
                    <DialogTitle>{editProduct ? "Edit Product" : "Add Product"}</DialogTitle>
                    <DialogContent>
                        <AddProductForm
                            open={isFormOpen}
                            handleClose={() => setFormOpen(false)}
                            editProduct={editProduct}
                            handleAddProduct={handleAddProduct}
                            handleEditProduct={handleEditProduct}
                        />
                    </DialogContent>
                </Dialog>
            </Box>
        </div>
    );
};

export default InventoryPage;


// "use client";

// import { useState, useEffect } from "react";
// import { firestore } from "@/firebase";
// import { Box, CssBaseline, Container } from "@mui/material";
// import {
//   query,
//   collection,
//   getDocs,
//   addDoc,
//   doc,
//   deleteDoc,
//   getDoc,
//   setDoc,
// } from "firebase/firestore";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "@/firebase";
// import { useRouter } from "next/navigation";
// import { ThemeProvider, createTheme } from "@mui/material/styles";
// import AppBar from "@/app/components/AppBar.js";
// import Drawer from "@/app/components/Drawer.js";
// import AddProductForm from "@/app/components/AddProduct.js";
// import InventoryTable from "@/app/components/InventoryTable.js";
// import InventoryStats from "@/app/components/InventoryStats.js";

// export default function Home() {
//   const [inventory, setInventory] = useState([]);
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [addProductOpen, setAddProductOpen] = useState(false);
//   const [currentProduct, setCurrentProduct] = useState(null); // Manage the current product for editing
//   const [user] = useAuthState(auth);
//   const router = useRouter();
//   const userSession = sessionStorage.getItem("user");

//   if (!user && !userSession) {
//     router.push("/");
//   }

//   const updateInventory = async () => {
//     const snapshot = query(collection(firestore, "products"));
//     const docs = await getDocs(snapshot);
//     const inventoryList = [];
//     docs.forEach((doc) => {
//       inventoryList.push({
//         id: doc.id,
//         ...doc.data(),
//       });
//     });
//     setInventory(inventoryList);
//   };

//   const addProductToInventory = async (product) => {
//     try {
//       const docRef = await addDoc(collection(firestore, "products"), product);
//       return { ...product, id: docRef.id };
//     } catch (error) {
//       console.error("Error adding product: ", error);
//     }
//   };

//   // const addProduct = async (product) => {
//   //   const newProduct = await addProductToInventory(product);
//   //   if (newProduct) {
//   //     setInventory((prev) => [...prev, newProduct]);
//   //   }
//   //   handleAddProductClose(); // Close the form
//   // };

  
//   const handleAddProduct = async (product) => {
//     const newProduct = await addProductToInventory(product);
//     // if (newProduct) {
//     //   setInventory((prev) => [...prev, newProduct]);
//     // }
//     handleAddProductClose(); // Close the form
//   };
//   const removeItem = async (id) => {
//     const docRef = doc(firestore, "products", id);
//     const docSnap = await getDoc(docRef);
//     if (docSnap.exists()) {
//       const { quantity } = docSnap.data();
//       if (quantity > 1) {
//         await setDoc(docRef, { quantity: quantity - 1 });
//       } else {
//         await deleteDoc(docRef);
//       }
//       updateInventory();
//     }
//   };

//   const handleDrawerOpen = () => {
//     setDrawerOpen(true);
//   };

//   const handleDrawerClose = () => {
//     setDrawerOpen(false);
//   };

//   const handleAddProductOpen = () => {
//     setAddProductOpen(true);
//   };

//   const handleAddProductClose = () => {
//     setAddProductOpen(false);
//     setCurrentProduct(null); // Clear the current product when closing
//   };

//   const handleEditProduct = (product) => {
//     setInventory((prev) =>
//       prev.map((p) => (p.id === product.id ? product : p))
//     );
//     handleAddProductClose(); // Close the form
//   };

//   useEffect(() => {
//     updateInventory();
//   }, []);

//   const theme = createTheme({
//     palette: {
//       mode: "dark",
//       background: {
//         paper: "#5e4955",
//         default: "#2a2b2a",
//       },
//       text: {
//         primary: "#c6ddf0",
//         secondary: "#c99da3",
//       },
//       primary: {
//         main: "#996888",
//       },
//       secondary: {
//         main: "#c99da3",
//       },
//     },
//   });

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <AppBar handleDrawerOpen={handleDrawerOpen} />
//       <Drawer
//         drawerOpen={drawerOpen}
//         handleDrawerClose={handleDrawerClose}
//         handleAddProductOpen={handleAddProductOpen}
//       />
//       <Box
//         display="flex"
//         flexDirection="column"
//         alignItems="center"
//         sx={{
//           minHeight: "100vh",
//           background: "linear-gradient(130deg, #2a2b2a, #996888, #c6ddf0)",
//           paddingTop: "64px",
//         }}
//       >
//         <InventoryStats />
//       </Box>
//       <Box>
//         <InventoryTable inventory={inventory} removeItem={removeItem} />
//         <AddProductForm
//           open={addProductOpen}
//           handleClose={handleAddProductClose}
//           editProduct={currentProduct}
//           handleAddProduct={handleAddProduct}
//           handleEditProduct={handleEditProduct}
//         />
//       </Box>
//     </ThemeProvider>
//   );
// }

// "use client";

// import { useState, useEffect } from "react";
// import { firestore } from "@/firebase";
// import { Box, CssBaseline, Container } from "@mui/material";
// import {
//   query,
//   collection,
//   getDocs,
//   addDoc,
//   doc,
//   deleteDoc,
//   getDoc,
//   setDoc,
// } from "firebase/firestore";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "@/firebase";
// import { useRouter } from "next/navigation";
// import { ThemeProvider, createTheme } from "@mui/material/styles";
// import AppBar from "@/app/components/AppBar.js";
// import Drawer from "@/app/components/Drawer.js";
// import AddProductForm from "@/app/components/AddProduct.js";
// import InventoryTable from "@/app/components/InventoryTable.js";
// import InventoryStats from "@/app/components/InventoryStats.js";

// export default function Home() {
//   const [inventory, setInventory] = useState([]);
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [addProductOpen, setAddProductOpen] = useState(false);
//   const [currentProduct, setCurrentProduct] = useState(null); // Manage the current product for editing
//   const [user] = useAuthState(auth);
//   const router = useRouter();
//   const userSession = sessionStorage.getItem("user");

//   if (!user && !userSession) {
//     router.push("/");
//   }

//   const updateInventory = async () => {
//     const snapshot = query(collection(firestore, "products"));
//     const docs = await getDocs(snapshot);
//     const inventoryList = [];
//     docs.forEach((doc) => {
//       inventoryList.push({
//         id: doc.id,
//         ...doc.data(),
//       });
//     });
//     setInventory(inventoryList);
//   };

//   const addProductToInventory = async (product) => {
//     try {
//       const docRef = await addDoc(collection(firestore, "products"), product);
//       return { ...product, id: docRef.id };
//     } catch (error) {
//       console.error("Error adding product: ", error);
//     }
//   };

//   const handleAddProduct = async (product) => {
//     await addProductToInventory(product);
//     handleAddProductClose(); // Close the form
//     updateInventory(); // Update inventory to fetch the latest list
//   };

//   const removeItem = async (id) => {
//     const docRef = doc(firestore, "products", id);
//     const docSnap = await getDoc(docRef);
//     if (docSnap.exists()) {
//       const { quantity } = docSnap.data();
//       if (quantity > 1) {
//         await setDoc(docRef, { quantity: quantity - 1 });
//       } else {
//         await deleteDoc(docRef);
//       }
//       updateInventory();
//     }
//   };

//   const handleDrawerOpen = () => {
//     setDrawerOpen(true);
//   };

//   const handleDrawerClose = () => {
//     setDrawerOpen(false);
//   };

//   const handleAddProductOpen = () => {
//     setAddProductOpen(true);
//   };

//   const handleAddProductClose = () => {
//     setAddProductOpen(false);
//     setCurrentProduct(null); // Clear the current product when closing
//   };

//   const handleEditProduct = (product) => {
//     setInventory((prev) =>
//       prev.map((p) => (p.id === product.id ? product : p))
//     );
//     handleAddProductClose(); // Close the form
//   };

//   useEffect(() => {
//     updateInventory();
//   }, []);

//   const theme = createTheme({
//     palette: {
//       mode: "dark",
//       background: {
//         paper: "#5e4955",
//         default: "#2a2b2a",
//       },
//       text: {
//         primary: "#c6ddf0",
//         secondary: "#c99da3",
//       },
//       primary: {
//         main: "#996888",
//       },
//       secondary: {
//         main: "#c99da3",
//       },
//     },
//   });

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <AppBar handleDrawerOpen={handleDrawerOpen} />
//       <Drawer
//         drawerOpen={drawerOpen}
//         handleDrawerClose={handleDrawerClose}
//         handleAddProductOpen={handleAddProductOpen}
//       />
//       <Box
//         display="flex"
//         flexDirection="column"
//         alignItems="center"
//         sx={{
//           minHeight: "100vh",
//           background: "linear-gradient(130deg, #2a2b2a, #996888, #c6ddf0)",
//           paddingTop: "64px",
//         }}
//       >
//         <InventoryStats />
//         <InventoryTable inventory={inventory} removeItem={removeItem} />
//       </Box>
//       <Box>
//         <AddProductForm
//           open={addProductOpen}
//           handleClose={handleAddProductClose}
//           editProduct={currentProduct}
//           handleAddProduct={handleAddProduct}
//           handleEditProduct={handleEditProduct}
//         />
//       </Box>
//     </ThemeProvider>
//   );
// }



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// "use client";

// import { useState, useEffect } from "react";
// import { firestore } from "@/firebase";
// import {
//   Box,
//   CssBaseline,
//   Container,
//   TextField,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   IconButton,
//   Grid,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   MenuItem,
//   Button,
// } from "@mui/material";
// import { Edit, Delete } from "@mui/icons-material";
// import {
//   query,
//   collection,
//   getDocs,
//   addDoc,
//   doc,
//   deleteDoc,
//   getDoc,
//   setDoc,
// } from "firebase/firestore";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "@/firebase";
// import { useRouter } from "next/navigation";
// import { ThemeProvider, createTheme } from "@mui/material/styles";
// import AppBar from "@/app/components/AppBar.js";
// import Drawer from "@/app/components/Drawer.js";
// import InventoryStats from "@/app/components/InventoryStats.js";
// const categories = [
//   'Beverages', 'Dairy Products', 'Fruits', 'Vegetables', 'Meat and Poultry',
//   'Seafood', 'Bakery Products', 'Grains and Cereals', 'Snacks', 'Condiments and Sauces', 'Others'
// ];

// const units = [
//   'Kilogram (kg)', 'Gram (g)', 'Pound (lb)', 'Liter (L)',
//   'Milliliter (mL)', 'Each (ea)', 'Pack'
// ];

// const labelStyle = { color: '#c6ddf0' };

// export default function Home() {
//   const [inventory, setInventory] = useState([]);
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [addProductOpen, setAddProductOpen] = useState(false);
//   const [currentProduct, setCurrentProduct] = useState(null); // Manage the current product for editing
//   const [user] = useAuthState(auth);
//   const router = useRouter();
//   const userSession = sessionStorage.getItem("user");

//   if (!user && !userSession) {
//     router.push("/");
//   }

//   const updateInventory = async () => {
//     const snapshot = query(collection(firestore, "products"));
//     const docs = await getDocs(snapshot);
//     const inventoryList = [];
//     docs.forEach((doc) => {
//       inventoryList.push({
//         id: doc.id,
//         ...doc.data(),
//       });
//     });
//     setInventory(inventoryList);
//   };

//   const addProductToInventory = async (product) => {
//     try {
//       const docRef = await addDoc(collection(firestore, "products"), product);
//       return { ...product, id: docRef.id };
//     } catch (error) {
//       console.error("Error adding product: ", error);
//     }
//   };

//   const handleAddProduct = async (product) => {
//     const newProduct = await addProductToInventory(product);
//     if (newProduct) {
//       setInventory((prev) => [...prev, newProduct]);
//     }
//     handleAddProductClose(); // Close the form
//   };

//   const removeItem = async (id) => {
//     const docRef = doc(firestore, "products", id);
//     const docSnap = await getDoc(docRef);
//     if (docSnap.exists()) {
//       const { quantity } = docSnap.data();
//       if (quantity > 1) {
//         await setDoc(docRef, { quantity: quantity - 1 });
//       } else {
//         await deleteDoc(docRef);
//       }
//       updateInventory();
//     }
//   };

//   const handleDrawerOpen = () => {
//     setDrawerOpen(true);
//   };

//   const handleDrawerClose = () => {
//     setDrawerOpen(false);
//   };

//   const handleAddProductOpen = () => {
//     setAddProductOpen(true);
//   };

//   const handleAddProductClose = () => {
//     setAddProductOpen(false);
//     setCurrentProduct(null); // Clear the current product when closing
//   };

//   const handleEditProduct = (product) => {
//     setInventory((prev) =>
//       prev.map((p) => (p.id === product.id ? product : p))
//     );
//     handleAddProductClose(); // Close the form
//   };

//   useEffect(() => {
//     updateInventory();
//   }, []);

//   const theme = createTheme({
//     palette: {
//       mode: "dark",
//       background: {
//         paper: "#5e4955",
//         default: "#2a2b2a",
//       },
//       text: {
//         primary: "#c6ddf0",
//         secondary: "#c99da3",
//       },
//       primary: {
//         main: "#996888",
//       },
//       secondary: {
//         main: "#c99da3",
//       },
//     },
//   });

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <AppBar handleDrawerOpen={handleDrawerOpen} />
//       <Drawer
//         drawerOpen={drawerOpen}
//         handleDrawerClose={handleDrawerClose}
//         handleAddProductOpen={handleAddProductOpen}
//       />
//       <Box
//         display="flex"
//         flexDirection="column"
//         alignItems="center"
//         sx={{
//           minHeight: "100vh",
//           background: "linear-gradient(130deg, #2a2b2a, #996888, #c6ddf0)",
//           paddingTop: "64px",
//         }}
//       >
//         <InventoryStats />
//       <Box sx={{ paddingX: 10, width: "100%", paddingBottom: 10 }}>
//         <Grid container justifyContent="center">
//           <Grid item xs={12} sm={10} md={8}>
//             <TextField
//               variant="outlined"
//               placeholder="Search by name"
//               fullWidth
//               sx={{ marginBottom: 2, borderColor: "white" }}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </Grid>
//         </Grid>
//         <TableContainer
//           justifyContent="center"
//           component={Paper}
//           sx={{ width: "100%" }}
//         >
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>No.</TableCell>
//                 <TableCell>Name</TableCell>
//                 <TableCell>Category</TableCell>
//                 <TableCell>Price($)</TableCell>
//                 <TableCell>Quantity</TableCell>
//                 <TableCell>Unit</TableCell>
//                 <TableCell>Action</TableCell>
//                 <TableCell>Image</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {inventory.map((item, index) => (
//                 <TableRow key={item.id}>
//                   <TableCell>{index + 1}</TableCell>
//                   <TableCell>{item.name || 'N/A'}</TableCell>
//                   <TableCell>{item.category || 'N/A'}</TableCell>
//                   <TableCell>{item.price || 'N/A'}</TableCell>
//                   <TableCell>{item.quantity || 'N/A'}</TableCell>
//                   <TableCell>{item.unit || 'N/A'}</TableCell>
//                   <TableCell>
//                     <IconButton onClick={() => {
//                       setCurrentProduct(item);
//                       handleAddProductOpen();
//                     }}>
//                       <Edit />
//                     </IconButton>
//                     <IconButton onClick={() => removeItem(item.id)}>
//                       <Delete />
//                     </IconButton>
//                   </TableCell>
//                   <TableCell>
//                     {item.imageUrl ? (
//                       <img
//                         src={item.imageUrl}
//                         alt={item.name}
//                         style={{ width: '50px', height: '50px' }}
//                         onError={(e) => e.target.style.display = 'none'}
//                       />
//                     ) : (
//                       'N/A'
//                     )}
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         </Box>

//         <Dialog open={addProductOpen} onClose={handleAddProductClose}>
//           <DialogTitle>{currentProduct ? "Edit Product" : "Add Product"}</DialogTitle>
//           <DialogContent>
//             <form onSubmit={(e) => {
//               e.preventDefault();
//               if (currentProduct) {
//                 handleEditProduct({
//                   ...currentProduct,
//                   name: e.target.name.value,
//                   category: e.target.category.value,
//                   price: e.target.price.value,
//                   quantity: e.target.quantity.value,
//                   unit: e.target.unit.value,
//                   imageUrl: e.target.imageUrl.value
//                 });
//               } else {
//                 handleAddProduct({
//                   name: e.target.name.value,
//                   category: e.target.category.value,
//                   price: e.target.price.value,
//                   quantity: e.target.quantity.value,
//                   unit: e.target.unit.value,
//                   imageUrl: e.target.imageUrl.value
//                 });
//               }
//             }}>
//               <Grid container spacing={2}>
//                 <Grid item xs={12}>
//                   <TextField
//                     label={<span style={labelStyle}>Name</span>}
//                     fullWidth
//                     defaultValue={currentProduct?.name || ''}
//                     name="name"
//                     required
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     select
//                     label={<span style={labelStyle}>Category</span>}
//                     fullWidth
//                     defaultValue={currentProduct?.category || ''}
//                     name="category"
//                     required
//                   >
//                     {categories.map((option) => (
//                       <MenuItem key={option} value={option}>
//                         {option}
//                       </MenuItem>
//                     ))}
//                   </TextField>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     label={<span style={labelStyle}>Price</span>}
//                     fullWidth
//                     defaultValue={currentProduct?.price || ''}
//                     name="price"
//                     type="number"
//                     required
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     label={<span style={labelStyle}>Quantity</span>}
//                     fullWidth
//                     defaultValue={currentProduct?.quantity || ''}
//                     name="quantity"
//                     type="number"
//                     required
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     select
//                     label={<span style={labelStyle}>Unit</span>}
//                     fullWidth
//                     defaultValue={currentProduct?.unit || ''}
//                     name="unit"
//                     required
//                   >
//                     {units.map((option) => (
//                       <MenuItem key={option} value={option}>
//                         {option}
//                       </MenuItem>
//                     ))}
//                   </TextField>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     label={<span style={labelStyle}>Image URL</span>}
//                     fullWidth
//                     defaultValue={currentProduct?.imageUrl || ''}
//                     name="imageUrl"
//                     type="url"
//                     // required={currentProduct?.imageUrl ? false : true}
//                   />
//                 </Grid>
//               </Grid>
//               <DialogActions>
//                 <Button onClick={handleAddProductClose} color="secondary">Cancel</Button>
//                 <Button type="submit" color="primary">{currentProduct ? 'Update' : 'Add'}</Button>
//               </DialogActions>
//             </form>
//           </DialogContent>
//         </Dialog>
//       </Box>
//     </ThemeProvider>
//   );
// }
