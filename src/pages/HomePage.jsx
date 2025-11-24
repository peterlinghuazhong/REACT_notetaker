import { useState } from "react";
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
    return selectedCategory ? selectedCategory.label : "";
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
  ).sort((a, b) =>
    sortBy === "title"
      ? a.title.localeCompare(b.title)
      : new Date(b.updatedAt) - new Date(a.updatedAt)
  );

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
            <InputLabel>All Categories</InputLabel>
            <Select
              value={selectedCategory}
              label="All Categories"
              onChange={(e) => setSelectedCategory(e.target.value)}
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
            <InputLabel>Sort By</InputLabel>
            <Select value={sortBy} label="Sort By" onChange={handleSortChange}>
              <MenuItem value="updatedAt">Last Updated</MenuItem>
              <MenuItem value="title">Title</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {filteredNotes.map((note) => (
          <Grid item xs={12} sm={6} md={4} key={note.id}>
            <Card sx={{ minHeight: 220 }}>
              <CardContent>
                <Typography variant="h5">{note.title}</Typography>
                <Chip label={getCategoryLabel(note)} />

                <Typography variant="body2">
                  {note.updatedAt
                    ? new Date(note.updatedAt).toLocaleString()
                    : "No date"}
                </Typography>
                <Typography variant="inherit">{note.content}</Typography>
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
                  <DeleteIcon fontSize="small" sx={{ mr: 1 }} /> DELETE
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
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

export default NotesPage;
