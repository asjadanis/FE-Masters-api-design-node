import app from "./server";

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server is listening on: http://localhost:${PORT}`);
});
