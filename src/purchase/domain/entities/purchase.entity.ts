import { StockEntity } from 'src/stock/domain/entities/stock.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({
  name: 'purchase',
})
export class PurchaseEntity {
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  amount: string;

  @Column({
    type: 'varchar',
    length: 1,
    nullable: false,
    enum: ['S', 'B'],
  })
  type: string;

  @ManyToOne(() => StockEntity, (stock) => stock.purchases)
  stock: StockEntity;
}
