import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router";
import {
  Box,
  Button,
  Container,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  FormControl,
} from "@mui/material";
import Editor from "react-simple-wysiwyg";
import { toast } from "sonner";

function createId() {
  return Math.random().toString(36).slice(2, 10);
}

function AddNewPage() {
  const navigate = useNavigate();

  const categoriesLocal = localStorage.getItem("categories");
  const categories = categoriesLocal ? JSON.parse(categoriesLocal) : [];

  const notesLocal = localStorage.getItem("notes");
  const notes = notesLocal ? JSON.parse(notesLocal) : [];

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  const handleSave = () => {
    if (title === "" || category === "" || content === "") {
      toast("Please fill all fields");
      return;
    }

    const newNote = {
      id: createId(),
      title,
      category,
      content,
      updatedAt: new Date().valueOf(),
    };

    const updatedNotes = [...notes, newNote];

    localStorage.setItem("notes", JSON.stringify(updatedNotes));

    toast("Note added!");
    navigate("/");
  };

  return (
    <Container maxWidth="md" sx={{ py: "60px" }}>
      <Typography variant="h3">Add New Note</Typography>

      <Paper sx={{ p: 3, mt: 2 }}>
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="cat-label">Category</InputLabel>
          <Select
            labelId="cat-label"
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((c) => (
              <MenuItem key={c.id} value={c.id}>
                {c.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ mt: 3 }}>
          <Typography sx={{ mb: 1 }}>Content</Typography>
          <Editor
            value={content}
            onChange={(e) => setContent(e.target.value)}
            containerProps={{ style: { height: "300px" } }}
          />
        </Box>

        <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
          <Button component={RouterLink} to="/" variant="outlined">
            Cancel
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default AddNewPage;
