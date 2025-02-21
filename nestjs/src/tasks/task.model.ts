import { Column, DataType, Model, Table, PrimaryKey, Default } from 'sequelize-typescript';

@Table
export class Task extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({ type: DataType.UUID })
    declare id: string;

    @Column({ allowNull: false })
    declare title: string;

    @Column({ defaultValue: 1 })
    declare isCompleted: number;
}
