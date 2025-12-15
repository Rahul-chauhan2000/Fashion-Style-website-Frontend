import React, { useState, useEffect } from "react";
import axios from "axios";

// components
import PosterCarousal from "./Carousals/PosterCarousal";
import Header from "./Header";
import CompanyMoto from "./CompanyMoto";
import MainCard from "./MainCard";
import ProductCard from "../Product/ProductCard";

// styling
import { Box, Grid } from "@material-ui/core";
import Row from "react-bootstrap/Row";

const Home = () => {
  // states
  const [data, setData] = useState([]);   // ✅ always array
  const [loading, setLoading] = useState(false);
  const [count] = useState(6);

  const loadPost = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/bestsellers");

      // ✅ SAFETY: ensure array only
      if (Array.isArray(response.data)) {
        setData(response.data);
      } else if (Array.isArray(response.data?.products)) {
        setData(response.data.products);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("API ERROR:", error);
      setData([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadPost();
  }, []);

  return (
    <>
      {/* Poster */}
      <PosterCarousal />

      {/* Header */}
      <Header header="COLLECTIONS" />

      {/* Collection Images */}
      <Grid container style={{ marginTop: "10px", marginBottom: "15px" }}>
        <MainCard
          url="./images/Collection/NewArrival.jpg"
          alt="New Arrival Collection"
          link="/"
        />
        <MainCard
          url="./images/Collection/bestseller.jpg"
          alt="BestSeller Collection"
          link="/bestseller"
        />
        <MainCard
          url="./images/Collection/NewArrivals_solids.jpg"
          alt="Basic Collection"
          link="/"
        />
      </Grid>

      {/* Header 2 */}
      <Header header="Recommendation For You" />

      {/* Products */}
      <Box
        className="container"
        style={{ marginTop: "40px", marginBottom: "30px" }}
      >
        <Row xs={1} md={2} className="g-4">
          {loading ? (
            <h4>Loading...</h4>
          ) : (
            Array.isArray(data) &&
            data.slice(10, count + 10).map((item) => (
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

      {/* Company Moto */}
      <CompanyMoto />
    </>
  );
};

export default Home;
