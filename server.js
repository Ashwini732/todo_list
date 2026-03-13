const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(
  "https://trqbdtczxlduxyosijcs.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRycWJkdGN6eGxkdXh5b3NpamNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0NTEwOTgsImV4cCI6MjA4ODAyNzA5OH0.zUncFQKTTCAosSmBlbCZ00ULKKvgIDDsIzxijLSioWM"
);

// Get tasks
app.get("/tasks", async (req, res) => {

  const { data, error } = await supabase
    .from("tasks")
    .select("*");

  if (error) return res.json(error);

  res.json(data);
});

// Add task
app.post("/add-task", async (req, res) => {

  const { task } = req.body;

  const { data, error } = await supabase
    .from("tasks")
    .insert([{ task }]);

  if (error) return res.json(error);

  res.json(data);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});