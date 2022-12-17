import { ApiProperty } from "@nestjs/swagger";
import {
  Entity,
  Tree,
  Column,
  PrimaryGeneratedColumn,
  TreeChildren,
  TreeParent,
  TreeLevelColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm"

@Entity()
@Tree("closure-table")
export class Category {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedDate: Date;

  @ApiProperty()
  @Column('text')
  description: string;

  @ApiProperty()
  @TreeChildren({ cascade: ['soft-remove', 'remove', 'recover'] })
  children: Category[];

  @ApiProperty()
  @TreeParent({ onDelete: 'CASCADE' })
  parent: Category | null;



}
