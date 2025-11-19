import React, { useState } from "react";
import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Grid,
  Chip,
} from "@mui/material";
import { Link as RouterLink } from "react-router";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";

function NotesPage() {
  const notesInStorage = localStorage.getItem("notes");
  const [notes, setNotes] = useState(
    notesInStorage ? JSON.parse(notesInStorage) : []
  );

  const categoriesInStorage = localStorage.getItem("categories");
  const [categories] = useState(
    categoriesInStorage ? JSON.parse(categoriesInStorage) : []
  );

  const getCategoryLabel = (note) => {
    const selectedCategory = categories.find((c) => c.id === note.category);
    if (selectedCategory) {
      return selectedCategory.label;
    }
  };

  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("updatedAt");

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleDelete = (note) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      const updatedNotes = notes.filter((item) => item.id !== note.id);
      setNotes(updatedNotes);
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
    }
  };

  const filteredNotes = (
    selectedCategory
      ? notes.filter((note) => note.category === selectedCategory)
      : notes
  ).sort((a, b) => {
    if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    } else {
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    }
  });

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography variant="h3" sx={{ py: "20px" }}>
          All Notes ({notes.length})
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="filter-category-label">All Categories </InputLabel>
            <Select
              labelId="filter-category-label"
              id="filter-category"
              label="All Categories"
              value={selectedCategory}
              onChange={(event) => {
                setSelectedCategory(event.target.value);
              }}
            >
              <MenuItem value="">All Categories</MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="sort-label">Sort By</InputLabel>
            <Select
              labelId="sort-label"
              id="sort"
              value={sortBy}
              label="Sort By"
              onChange={handleSortChange}
            >
              <MenuItem value="updatedAt">Last Updated</MenuItem>
              <MenuItem value="title">Title</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {filteredNotes.map((note) => {
          return (
            <Grid item xs={12} sm={6} md={4} key={note.id}>
              <Card sx={{ minHeight: 220 }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {note.title}
                  </Typography>
                  <Chip label={getCategoryLabel(note)} />

                  <Typography variant="body2">
                    {note.updatedAt
                      ? new Date(note.updatedAt).toLocaleString()
                      : "No date"}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    component={RouterLink}
                    to={`/edit/${note.id}`}
                  >
                    <CreateIcon fontSize="small" sx={{ mr: 1 }} /> EDIT
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleDelete(note)}
                  >
                    <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
                    DELETE
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Floating Add Button */}
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

export default NotesPage;
