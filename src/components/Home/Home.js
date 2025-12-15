import React, { useState, useEffect } from "react";
import axios from "axios";

import PosterCarousal from "./Carousals/PosterCarousal";
import Header from "./Header";
import CompanyMoto from "./CompanyMoto";
import MainCard from "./MainCard";
import ProductCard from "../Product/ProductCard";

import { Box, Grid } from "@material-ui/core";
import Row from "react-bootstrap/Row";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const res = await axios.get("/bestsellers");

        // 🔐 HARD VALIDATION
        if (Array.isArray(res.data)) {
          setData(res.data);
        } else if (Array.isArray(res.data?.products)) {
          setData(res.data.products);
        } else {
          console.error("INVALID API RESPONSE:", res.data);
          setData([]);
        }
      } catch (err) {
        console.error("API FAILED:", err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, []);

  // 🔐 SECOND HARD GUARD (MOST IMPORTANT)
  if (!Array.isArray(data)) {
    return <h3 style={{ textAlign: "center" }}>No products available</h3>;
  }

  return (
    <>
      <PosterCarousal />
      <Header header="COLLECTIONS" />

      <Grid container style={{ marginTop: 10, marginBottom: 15 }}>
        <MainCard url="./images/Collection/NewArrival.jpg" alt="New Arrival" link="/" />
        <MainCard url="./images/Collection/bestseller.jpg" alt="BestSeller" link="/bestseller" />
        <MainCard url="./images/Collection/NewArrivals_solids.jpg" alt="Basic" link="/" />
      </Grid>

      <Header header="Recommendation For You" />

      <Box className="container" style={{ marginTop: 40, marginBottom: 30 }}>
        <Row xs={1} md={2} className="g-4">
          {loading ? (
            <h4>Loading...</h4>
          ) : data.length === 0 ? (
            <h4>No products found</h4>
          ) : (
            data.slice(10, 16).map((item) => (
              <ProductCard
                key={item.product_id}
                id={item.product_id}
                url={item.img1}
                title={item.title}
                pTitle={item.title}
                type={item.product_type}
                price={item.variant_price}
                aPrice={item.variant_compare_at_price}
              />
            ))
          )}
        </Row>
      </Box>

      <CompanyMoto />
    </>
  );
};

export default Home;
