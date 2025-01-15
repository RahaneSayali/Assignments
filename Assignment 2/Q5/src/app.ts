import { createTableIfNotExists } from './logic';

// Call the function to create the table if it doesn't exist
createTableIfNotExists().catch((err) => {
  console.error('Unexpected error:', err);
});
