import { useState } from "react";
import { nanoid } from "nanoid";
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

/*
  Requirements:
  - data will be stored in the local storage
  - state for managing the categories
  - Add new category
  - update category
  - delete category
  - explode yourself

  [
    { id: 684847, label: "Personal" },
    { id: 8489, label: "Work" },
    { id: 886, label: "Idea" }
  ]
*/

function CategoriesPage() {
  // 1. load the data from the local storage (key is categories).
  const dataInLocalStorage = localStorage.getItem("categories");
  // 2. assign the local storage to the state (if data is empty, pass in empty array)
  const [categories, setCategories] = useState(
    dataInLocalStorage ? JSON.parse(dataInLocalStorage) : []
  );
  // 3. state for the add new category field
  const [label, setLabel] = useState("");

  // 4. function to add new category into the state and also save it into local storage
  const handleAddNew = () => {
    // 4a. make sure the field is not empty, show error
    if (label === "") {
      toast("Please fill in the label");
    } else {
      // 4b. add the new category to the state
      const updatedCategories = [
        ...categories,
        {
          id: nanoid(),
          label: label,
        },
      ];
      setCategories(updatedCategories);
      // show notification of success message
      toast("New Category has been added");
      // reset the field
      setLabel("");
      // 4c. update the local storage with the updated categories
      localStorage.setItem("categories", JSON.stringify(updatedCategories));
    }
  };

  // 5. function to update the category name
  const handleUpdate = (category) => {
    // 5a. prompt the user to update the new label for the selected category (pass in the current value)
    const newCategory = prompt(
      "Please enter the new label for the selected category.",
      category.label
    );
    // 5b. update the categories with the update category label
    if (newCategory) {
      const updatedCategories = [...categories];
      setCategories(
        updatedCategories.map((cat) => {
          if (cat.id === category.id) {
            cat.label = newCategory;
          }
          return cat;
        })
      );
      // show notification of success message
      toast("Category has been updated");
      // 5c. update the local storage with the updated categories
      localStorage.setItem("categories", JSON.stringify(updatedCategories));
    }
  };

  // 6. function to delete the category
  const handleDelete = (category) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this category?"
    );
    if (confirmDelete) {
      // 6a. delete the category from the categories state
      const updatedCategories = categories.filter(
        (item) => item.id !== category.id
      );

      setCategories(updatedCategories);
      // show notification of success message
      toast("Category has been deleted");
      // 6b. update the local storage with the updated categories
      localStorage.setItem("categories", JSON.stringify(updatedCategories));
    }
  };

  return (
    <>
      <Container sx={{ py: 6 }}>
        <Typography variant="h4">Manage Categories</Typography>
        <Paper
          elevation={3}
          sx={{
            p: "20px",
            mt: "20px",
          }}
        >
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
        <Paper
          elevation={3}
          sx={{
            p: "20px",
            mt: "20px",
          }}
        >
          <InputLabel>Existing Categories ({categories.length})</InputLabel>
          <List sx={{ width: "100%" }}>
            {categories.map((category) => (
              <ListItem
                key={category.id}
                disableGutters
                divider
                secondaryAction={
                  <Box sx={{ display: "flex", gap: "10px" }}>
                    <IconButton onClick={() => handleUpdate(category)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(category)}>
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
