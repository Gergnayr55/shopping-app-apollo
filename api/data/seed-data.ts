import { seedDatabase} from '../dbconnection/index';
import data from './product-data-local';

seedDatabase('YourDatabaseNameHere', data)
    .then(console.error)
    .catch(console.error)
    .finally(() => {
    console.log("MongoDB migration finished.");
    });
