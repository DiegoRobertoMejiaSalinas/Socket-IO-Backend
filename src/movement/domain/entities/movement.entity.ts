import { StockEntity } from 'src/stock/domain/entities/stock.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp with time zone',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp with time zone',
  })
  updatedAt: Date;
}
