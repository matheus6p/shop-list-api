import app from "./index.js";
const port = 3333
app.listen(process.env.PORT || port, () => console.log(`Server Running at ${port}`));
