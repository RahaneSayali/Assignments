import { Sequelize, DataTypes, Model } from 'sequelize';

// Initialize Sequelize with the database URL
const sequelize = new Sequelize(process.env.DATABASE_URL as string);

export class Weather extends Model {
  public id!: number;
  public city!: string;
  public country!: string;
  public weather!: object;
  public longitude!: number;
  public latitude!: number;
  public time!: Date;
}

// Define the model for the `weather_data` table
Weather.init(
  {
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weather: {
      type: DataTypes.JSONB,  // Store weather data as JSON
      allowNull: false,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW'),  // Default current timestamp
    },
  },
  {
    sequelize,
    tableName: 'weather_data',  // Name of the table in the database
    timestamps: false,           // Disable automatic `createdAt` and `updatedAt` columns
  }
);

// Sync the model with the database to ensure the table exists
sequelize.sync()
  .then(() => console.log('Table created or already exists.'))
  .catch((error) => console.error('Error syncing the table:', error));

export default Weather;
