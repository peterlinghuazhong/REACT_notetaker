import { useState } from "react";
import { useParams, useNavigate, Link as RouterLink } from "react-router";
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

function EditNote() {
  const { id } = useParams();
  const navigate = useNavigate();

  const categoriesLocal = localStorage.getItem("categories");
  const categories = categoriesLocal ? JSON.parse(categoriesLocal) : [];

  const notesLocal = localStorage.getItem("notes");
  const notes = notesLocal ? JSON.parse(notesLocal) : [];

  const selectedNote = notes.find((n) => n.id === id);

  if (!selectedNote) {
    return <div>Note not found. (ID: {id})</div>;
  }

  const [title, setTitle] = useState(selectedNote.title);
  const [category, setCategory] = useState(selectedNote.category);
  const [content, setContent] = useState(selectedNote.content);

  const handleUpdate = () => {
    if (title === "" || category === "" || content === "") {
      toast("Please fill all fields");
      return;
    }

    const updatedNotes = notes.map((note) =>
      note.id === id
        ? {
            ...note,
            title,
            category,
            content,
            updatedAt: new Date().valueOf(),
          }
        : note
    );

    localStorage.setItem("notes", JSON.stringify(updatedNotes));

    toast("Note updated!");
    navigate("/");
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3">Edit Note</Typography>

      <Paper sx={{ p: 3, mt: 2 }}>
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Category</InputLabel>
          <Select
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
            containerProps={{ style: { height: "500px" } }}
          />
        </Box>

        <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
          <Button variant="contained" onClick={handleUpdate}>
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

export default EditNote;
