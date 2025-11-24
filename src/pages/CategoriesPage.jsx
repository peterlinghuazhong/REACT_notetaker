import { useState } from "react";
import { toast } from "sonner";
import {
  Container,
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  InputLabel,
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Edit, Delete } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

function id() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

function CategoriesPage() {
  const dataInLocalStorage = localStorage.getItem("categories");

  const [categories, setCategories] = useState(
    dataInLocalStorage ? JSON.parse(dataInLocalStorage) : []
  );

  const [label, setLabel] = useState("");

  const handleAddNew = () => {
    if (label === "") {
      toast("Please fill in the label");
    } else {
      const updatedCategories = [
        ...categories,
        {
          id: id(),
          label: label,
        },
      ];
      setCategories(updatedCategories);
      toast("New Category has been added");
      setLabel("");
      localStorage.setItem("categories", JSON.stringify(updatedCategories));
    }
  };

  const handleUpdate = (category) => {
    const newCategory = prompt(
      "Please enter the new label for the selected category.",
      category.label
    );

    if (newCategory) {
      const updatedCategories = categories.map((cat) => {
        if (cat.id === category.id) {
          return { ...cat, label: newCategory };
        }
        return cat;
      });

      setCategories(updatedCategories);
      toast("Category has been updated");
      localStorage.setItem("categories", JSON.stringify(updatedCategories));
    }
  };

  const handleDelete = (category) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this category?"
    );
    if (confirmDelete) {
      const updatedCategories = categories.filter(
        (item) => item.id !== category.id
      );

      setCategories(updatedCategories);
      toast("Category has been deleted");
      localStorage.setItem("categories", JSON.stringify(updatedCategories));
    }
  };

  return (
    <>
      <Container sx={{ py: 6 }}>
        <Typography variant="h4">Manage Categories</Typography>

        <Paper elevation={3} sx={{ p: "20px", mt: "20px" }}>
          <InputLabel>Add New Category</InputLabel>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: "10px",
              mt: "5px",
            }}
          >
            <TextField
              fullWidth
              label="Category"
              variant="outlined"
              value={label}
              onChange={(event) => setLabel(event.target.value)}
            />
            <Button color="primary" variant="contained" onClick={handleAddNew}>
              Add
            </Button>
          </Box>
        </Paper>

        <Paper elevation={3} sx={{ p: "20px", mt: "20px" }}>
          <InputLabel>Existing Categories ({categories.length})</InputLabel>
          <List sx={{ width: "100%" }}>
            {categories.map((category) => (
              <ListItem
                key={category.id}
                disableGutters
                divider
                secondaryAction={
                  <Box sx={{ display: "flex", gap: "10px" }}>
                    <IconButton
                      style={{ color: "blue" }}
                      onClick={() => handleUpdate(category)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      style={{ color: "red" }}
                      onClick={() => handleDelete(category)}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                }
              >
                <ListItemText primary={`${category.label}`} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Container>
    </>
  );
}

export default CategoriesPage;
