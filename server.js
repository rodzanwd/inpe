const app = require('./config/express')();

const PORT = 3000;

app.listen(PORT, () => console.log(`App listening in port ${PORT}`));