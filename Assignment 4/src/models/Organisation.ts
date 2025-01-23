import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "../database/db";
import { Customer } from "./Customer";

interface OrganizationAttributes {
  id: number;
  gstNo: string;
  panNo: string;
  legalOrganizationName: string;
  invoiceTemplateId: string;
  shortName: string;
  contactName: string;
  displayName: string;
  email: string;
  addressId: string;
  phone: number;
  password: string;
}

class Organization
  extends Model<OrganizationAttributes>
  implements OrganizationAttributes
{
  public id!: number;
  public gstNo!: string;
  public panNo!: string;
  public legalOrganizationName!: string;
  public invoiceTemplateId!: string;
  public shortName!: string;
  public contactName!: string;
  public displayName!: string;
  public email!: string;
  public addressId!: string;
  public phone!: number;
  public password!: string;
}

Organization.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    gstNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    panNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    legalOrganizationName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    invoiceTemplateId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shortName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contactName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    addressId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },

  {
    sequelize,
    tableName: "organizations",
  }
);
export { Organization };
