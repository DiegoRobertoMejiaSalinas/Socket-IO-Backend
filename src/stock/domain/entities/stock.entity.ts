import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'stock',
})
export class StockEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;
}
