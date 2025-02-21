import { Column, DataType, Model, Table, PrimaryKey, Default } from 'sequelize-typescript';

@Table
export class User extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({ type: DataType.UUID })
    declare id: string;

    @Column({ allowNull: false })
    declare firstName: string;

    @Column({ allowNull: false })
    declare lastName: string;

    @Column({ defaultValue: true })
    declare isActive: boolean;
}
