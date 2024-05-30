
const express = require('express')
const app = express()
const bookingRoutes = require('./routes/booking');
const userRoutes = require('./routes/user');
const port = 4000
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.use('/api/hall/', bookingRoutes);
app.use('/api/user/', userRoutes);

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
