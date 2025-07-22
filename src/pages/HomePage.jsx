import React, { useState } from "react";
import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import { Link as RouterLink } from "react-router";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";

function HomePage() {
  const [category, setCategory] = useState("");
  const [updated, setUpdated] = useState("");
  const handleChange = (event) => {
    setCategory(event.target.value);
  };
  return (
    <Container>
      <Box
        component="span"
        sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
      ></Box>
      ;
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h3" sx={{ py: "20px" }}>
          All Notes
        </Typography>
        <div style={{ display: "flex" }}>
          <FormControl sx={{ mt: "20px", minWidth: 160, paddingRight: "20px" }}>
            <InputLabel id="note_category-label">All Categories</InputLabel>
            <Select
              labelId="note_category-label"
              id="note_category"
              label="All Categories"
              value={category}
              onChange={handleChange}
              autoWidth
            >
              <MenuItem value="">All Categories</MenuItem>
              <MenuItem value="Personal">Personal</MenuItem>
              <MenuItem value="Work">Work</MenuItem>
              <MenuItem value="Idea">Idea</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ mt: "20px", minWidth: 160 }}>
            <InputLabel id="note_category-label">Last Updated</InputLabel>
            <Select
              labelId="note_category-label"
              id="note_category"
              label="Last Updated"
              value={updated}
              onChange={handleChange}
              autoWidth
            >
              <MenuItem value="">Last Updated</MenuItem>
              <MenuItem value="Title">Title</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <Grid container spacing={3}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Which theme should we pick?
            </Typography>
            <Typography
              autoWidth
              sx={{
                display: "inline-block",
                bgcolor: "lightgrey",
                p: "5px",
                mb: 1.5,
                borderRadius: "20px",
                mt: "15px",
              }}
            >
              adjective
            </Typography>
            <Typography variant="body2">TIME</Typography>
          </CardContent>
          <CardActions>
            <Button size="small" component={RouterLink} to="/edit">
              <CreateIcon /> EDIT
            </Button>
            <Button size="small" color="error">
              <DeleteIcon />
              DELETE
            </Button>
          </CardActions>
        </Card>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Project making week
            </Typography>
            <Typography
              autoWidth
              sx={{
                display: "inline-block",
                bgcolor: "lightgrey",
                p: "5px",
                mb: 1.5,
                borderRadius: "20px",
                mt: "15px",
              }}
            >
              Personal
            </Typography>
            <Typography variant="body2">TIME</Typography>
          </CardContent>
          <CardActions>
            <Button size="small">
              <CreateIcon /> EDIT
            </Button>
            <Button size="small" color="error">
              <DeleteIcon />
              DELETE
            </Button>
          </CardActions>
        </Card>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Assignment Sheets
            </Typography>
            <Typography
              autoWidth
              sx={{
                display: "inline-block",
                bgcolor: "lightgrey",
                p: "5px",
                mb: 1.5,
                borderRadius: "20px",
                mt: "15px",
              }}
            >
              work
            </Typography>
            <Typography variant="body2">TIME</Typography>
          </CardContent>
          <CardActions>
            <Button size="small">
              <CreateIcon /> EDIT
            </Button>
            <Button size="small" color="error">
              <DeleteIcon />
              DELETE
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <IconButton
        component={RouterLink}
        to="/add"
        color="primary"
        size="large"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        <AddCircleRoundedIcon fontSize="inherit" />
      </IconButton>
    </Container>
  );
}
export default HomePage;
