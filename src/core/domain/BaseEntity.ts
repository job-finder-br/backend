import {
  PrimaryColumn,
  UpdateDateColumn,
  CreateDateColumn,
  Column,
  DeleteDateColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

abstract class BaseEntity {
  @PrimaryColumn('uuid')
  readonly id?: string;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  readonly created_at?: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  readonly updated_at?: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  readonly deleted_at?: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }

    if (!this.updated_at) {
      this.updated_at = new Date();
    }

    if (!this.created_at) {
      this.created_at = new Date();
    }
  }
}

export { BaseEntity };
