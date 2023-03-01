import { StockEntity } from 'src/stock/domain/entities/stock.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'movement',
})
export class MovementEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  amount: number;

  @Column({
    type: 'varchar',
    length: 1,
    nullable: false,
    enum: ['S', 'B'],
  })
  type: string;

  @ManyToOne(() => StockEntity, (stock) => stock.movements)
  @JoinColumn({
    name: 'stock_id',
  })
  stock: StockEntity;
}
