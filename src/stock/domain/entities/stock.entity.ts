import { PurchaseEntity } from 'src/purchase/domain/entities/purchase.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity({
  name: 'stock',
})
export class StockEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @OneToMany(() => PurchaseEntity, (purchases) => purchases.stock)
  purchases: PurchaseEntity[];
}
