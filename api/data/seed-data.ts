import { seedDatabase} from '../dbconnection/index';
import { seedData } from './product-data-local';

seedDatabase('YourDatabaseNameHere', seedData)
    .then(console.error)
    .catch(console.error)
    .finally(() => {
    console.log("MongoDB migration finished.");
    });
