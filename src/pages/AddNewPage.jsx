import { useState } from "react";
import { Link as RouterLink } from "react-router";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Editor from "react-simple-wysiwyg";

function AddNewPage() {
  /*
    rule for form fields state: one state for one field
  */
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("Welcome to <b>Forward College</b>");

  return (
    <Container
      maxWidth="md"
      sx={{
        py: "60px",
      }}
    >
      <Typography variant="h3">Edit Note</Typography>
      <Paper
        elevation={3}
        sx={{
          p: "20px",
          mt: "20px",
        }}
      >
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
            <MenuItem value={"Personal"}>Personal</MenuItem>
            <MenuItem value={"Work"}>Work</MenuItem>
            <MenuItem value={"Idea"}>Idea</MenuItem>
          </Select>
        </FormControl>
        <Box sx={{ mt: "20px" }}>
          <Typography variant="body1" sx={{ mb: "10px" }}>
            Content
          </Typography>
          <Editor
            containerProps={{ style: { height: "400px" } }}
            value={content}
            onChange={(event) => {
              setContent(event.target.value);
            }}
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
          <Button color="primary" variant="contained">
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
