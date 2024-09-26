import React, {useEffect, useState} from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Typography, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

// display a list of product cards
const ProductList = () => {
  const [products, setProducts] = useState([]);
  // implement the get products function
  const fetchProducts = async() => {
    try{
      const response = await axios.get('http://localhost:5001/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // implement the delete function
  const handleDelete = async (id) => {
    try{
      await axios.delete(`http://localhost:5001/api/products/${id}`);
      setProducts(products.filter((products) => products.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // Fetch the products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Container sx={{ paddingTop:'32px'}}>
      {/* Main title of the page */}
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight:'bold'}}>
        Simple Card List
      </Typography>
      <Box my={4}/>
      {/* Grid container to align product cards in a responsive layout, ensuring cards are centered */}
      <Grid container spacing={4} justifyContent="center">
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
             {/* Card component representing an individual product */}
            <Card sx={{ position: 'relative' }}>
              {/* Delete button to remove a product */}
              <IconButton
                aria-label="delete"
                style={{ position: 'absolute', top: 8, left: 8 }}
                onClick={() => handleDelete(product.id)}
              >
                <DeleteIcon color="error" />
              </IconButton>
              {/* Display product image, with a fallback image if unavailable */}
              <CardMedia
                component="img"
                alt={product.name}
                height="200"
                image={product.imageUrl || 'https://via.placeholder.com/200'}
                title={product.name}
              />
              {/* Card content including product name, price, and description */}
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight:'bold'}}>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ${product.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductList;