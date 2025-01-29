import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "../database/db";
import { Organization } from "./Organisation";

interface CustomerContent {
  id: number;
  email: string;
  msaValidFrom: Date;
  organizationId: number;
  msaValidUpto: Date;
  legalName: string;
  ndaSignedOn: Date;
  shortName: string;
  ndaValidFrom: Date;
  ndaValidUpto: Date;
  addressId: string;
  displayName: string;
  isNDASigned: boolean;
  isMSASigned: boolean;
  msaSignedOn: Date;
  password: string;
}

class Customer extends Model<CustomerContent> implements CustomerContent {
  public id!: number;
  public password!: string;
  public msaValidFrom!: Date;
  public organizationId!: number;
  public msaValidUpto!: Date;
  public legalName!: string;
  public ndaSignedOn!: Date;
  public shortName!: string;
  public ndaValidFrom!: Date;
  public ndaValidUpto!: Date;
  public addressId!: string;
  public displayName!: string;
  public isNDASigned!: boolean;
  public isMSASigned!: boolean;
  public msaSignedOn!: Date;
  public email!: string;
}

Customer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    msaValidFrom: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    organizationId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    msaValidUpto: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    legalName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ndaSignedOn: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    shortName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ndaValidFrom: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    ndaValidUpto: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    addressId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isNDASigned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isMSASigned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    msaSignedOn: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "customers",
    underscored: true,
  }
);

export { Customer };
