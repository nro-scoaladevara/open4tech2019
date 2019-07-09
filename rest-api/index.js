import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import listRoutes from './list/list.routes';
import itemRoutes from './item/item.routes';
import addErrorHandlers from './addErrorHandlers';

/* Fix mongoose warnings */
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);

/* Establish connection to the local MongoDB server using the open4tech2019 database */
mongoose.connect('mongodb+srv://netrom:netrom@open4tech-knecu.mongodb.net/test?retryWrites=true&w=majority');

/* Create a new web server instance */
const app = express();

/* Enhance app to parse JSON request bodies */
app.use(bodyParser.json());

/* Enhance app to allow requests coming from other applications (React/Angular), not only direct callers like Postman */
app.use(cors());

/* Attach developer defined routes */
listRoutes(app);
itemRoutes(app);

addErrorHandlers(app);

const port = 3001;
app.listen(port, () => console.log(`Open4Tech 2019 REST API listening on port ${port}!`));
