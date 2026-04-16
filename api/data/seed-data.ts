import { seedDatabase} from '../dbconnection/index';
import { seedData } from './product-data-local';

seedDatabase('test', seedData)
    .catch(console.error)
    .finally(() => {
    console.log("MongoDB migration finished.");
    });
