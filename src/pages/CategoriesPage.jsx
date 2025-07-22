import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
} from "@mui/material";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
function CategoriesPage() {
  const [category, setCategory] = useState("");
  return (
    <>
      <Container maxWidth="md">
        <Typography variant="h3" sx={{ pt: "30px" }}>
          Manage Categories
        </Typography>
        <Paper elevation={3} sx={{ p: "20px", mt: "20px" }}>
          <Typography sx={{ pb: "10px" }}>Add New Category</Typography>
          <div style={{ display: "flex" }}>
            <TextField
              fullWidth
              id="note_title"
              label="title"
              variant="outlined"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            />
            <Button sx={{ ml: "10px" }} variant="contained">
              Add
            </Button>
          </div>
        </Paper>
        <Paper sx={{ mt: "30px", p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Existing Categories (3)
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Personal" />
              <IconButton edge="end">
                <EditIcon />
              </IconButton>
              <IconButton edge="end">
                <DeleteIcon />
              </IconButton>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="Work" />
              <IconButton edge="end">
                <EditIcon />
              </IconButton>
              <IconButton edge="end">
                <DeleteIcon />
              </IconButton>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="Ideas" />
              <IconButton edge="end">
                <EditIcon />
              </IconButton>
              <IconButton edge="end">
                <DeleteIcon />
              </IconButton>
            </ListItem>
          </List>
        </Paper>
      </Container>
    </>
  );
}
export default CategoriesPage;
