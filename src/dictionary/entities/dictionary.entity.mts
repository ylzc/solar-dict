import { Column, Entity, PrimaryColumn, Index } from 'typeorm';

@Entity('dictionary')
export class Dictionary {
    @PrimaryColumn({ type: 'varchar', length: 130 })
    id: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    name: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    @Index({})
    type: string;
}
