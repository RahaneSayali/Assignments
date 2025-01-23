import { Sequelize,DataTypes,Model} from "sequelize";
import sequelize from "../database/db";
import {Customer} from './Customer'


interface SOWContents {
    id: string;
    InvoiceEmailAddresses: string[],
    customerId: string;
    customerPoNumber: string;
    title: string;
    customerSoNumber: string;
    ValidityFrom: string,
    ValidityUpto: string,
    totalValue: number;
    currency: string;
}


class SOW extends Model<SOWContents> implements SOWContents {
public id!: string;
public InvoiceEmailAddresses !: string[]
  public customerId!: string;
  public customerPoNumber!: string;
  public title!: string;
  public customerSoNumber!: string;
  public ValidityFrom!: string;
  public ValidityUpto!: string;
  public totalValue!: number;
  public currency!: string;
}

SOW.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },

    InvoiceEmailAddresses: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    
    customerId: {
        type: DataTypes.STRING,
        references: {
            model: Customer,
            key: 'id',
        },
        allowNull: false,
    },
    customerPoNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    customerSoNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ValidityFrom: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ValidityUpto: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    totalValue: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    currency: {
        type: DataTypes.STRING,
        allowNull: false,
    },

},
    {
      sequelize,
      tableName: 'sows',
})
export {SOW};