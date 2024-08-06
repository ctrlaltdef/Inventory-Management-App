import { motion } from "framer-motion";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const InventoryStats = ({ inventory }) => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const calculateStats = () => {
      const totalProducts = inventory.length;
      const totalValue = inventory.reduce(
        (sum, item) => sum + (parseFloat(item.price) || 0),
        0
      );
      const outOfStock = inventory.filter(item => parseInt(item.quantity) === 0).length;
      const categories = new Set(inventory.map(item => item.category));

      setStats([
        {
          label: "TOTAL PRODUCTS",
          value: totalProducts,
          sx: {
            backgroundColor: "#5e4955",
            backgroundImage: "linear-gradient(135deg, #996888 24%, #c6ddf0 48%, #c99da3 72%)",
            color: "#232523",
          } 
        },
        {
          label: "TOTAL STORE VALUE",
          value: `$${totalValue.toLocaleString()}`,
          sx: {
            backgroundColor: "#5e4955",
            backgroundImage: " linear-gradient(225deg, #996888 24%, #c6ddf0 48%, #c99da3 72%);",
            color: "#232523"
          }
          
        }, 
        {
          label: "OUT OF STOCK",
          value: outOfStock,
          sx: {
            backgroundColor: "#c99da3",
            backgroundImage: "linear-gradient(45deg, #996888 30%, #c6ddf0 50%, #c99da3 80%);",
            color: "#232523"
          }
        },
        {
          label: "ALL CATEGORIES",
          value: categories.size,
          sx: {
            backgroundColor: "#c6ddf0",
            backgroundImage: "linear-gradient(315deg, #996888 20%, #c6ddf0 50%, #c99da3 80%)",
            color: "#232523"
          }
        },
      ]);
    };

    calculateStats();
  }, [inventory]);

  return (
    <Grid container spacing={2} sx={{ marginBottom: 8, display: 'flex', justifyContent: "center", marginTop: 5 }}>
      {stats.map((stat, index) => (
        <Grid item xs={12} sm={7} md={2.5} key={index}>
          <Card
            component={motion.div}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
              transition: { duration: 0.3, ease: "easeOut" },
            }}
            transition={{ delay: index * 0.3, duration: 0.5 }}
            sx={{ ...stat.sx, minHeight: "170px", display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                {stat.label}
              </Typography>
              <Typography variant="h4" component="div" sx={{ marginTop: 2 }}>
                {stat.value}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default InventoryStats;
