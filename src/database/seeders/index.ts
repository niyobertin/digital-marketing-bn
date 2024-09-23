import { dbconnection } from "../../config/db.connection"
import seedUsers from "./users.seed"
import seedProducts from "./products.seed";
dbconnection ().then(async () => {
  try {
    await seedUsers();
    await seedProducts();
    console.log('Database seeded Successfully');
    process.exit();
  } catch (error) {
    console.error('database seed errors ', { error });
    process.exit();
  }
})