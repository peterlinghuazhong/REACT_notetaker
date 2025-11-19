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
import { Link as RouterLink, useNavigate } from "react-router";
import { useState } from "react";
import Editor from "react-simple-wysiwyg";
import { nanoid } from "nanoid";
import { toast } from "sonner";

function AddNewPage() {
  const navigate = useNavigate();

  const dataInLocalStorage = localStorage.getItem("categories");
  const [categories, setCategories] = useState(
    dataInLocalStorage ? JSON.parse(dataInLocalStorage) : []
  );

  const notesInLocalStorage = localStorage.getItem("notes");
  const [notes, setNotes] = useState(
    notesInLocalStorage ? JSON.parse(notesInLocalStorage) : []
  );

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("Welcome to <b>Forward College</b>");

  const handleAddNew = () => {
    if (title === "" || category === "" || content === "") {
      alert("Please fill in all fields.");
    } else {
      const updatedNotes = [
        ...notes,
        {
          id: nanoid(),
          title,
          category, // category ID
          content,
          updatedAt: new Date().valueOf(),
        },
      ];
      setNotes(updatedNotes);
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      toast("new note added");
      setTitle("");
      setCategory("");
      setContent("Welcome to <b>Forward College</b>");

      navigate("/");
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: "60px" }}>
      <Typography variant="h3">Add New Note</Typography>
      <Paper elevation={3} sx={{ p: "20px", mt: "20px" }}>
        <TextField
          fullWidth
          id="note_title"
          label="Title"
          variant="outlined"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <FormControl fullWidth sx={{ mt: "20px" }}>
          <InputLabel id="note_category_label">Category</InputLabel>
          <Select
            labelId="note_category_label"
            id="note_category"
            label="Category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ mt: "20px" }}>
          <Typography variant="body1" sx={{ mb: "10px" }}>
            Content
          </Typography>
          <Editor
            containerProps={{ style: { height: "400px" } }}
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
            mt: "20px",
          }}
        >
          <Button color="primary" variant="contained" onClick={handleAddNew}>
            Save Note
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
