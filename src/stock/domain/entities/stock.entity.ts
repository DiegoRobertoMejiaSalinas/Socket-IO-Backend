import { MovementEntity } from 'src/movement/domain/entities/movement.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity({
  name: 'stock',
})
export class StockEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @OneToMany(() => MovementEntity, (purchases) => purchases.stock)
  movements: MovementEntity[];
}
