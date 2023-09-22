// create-device.dto.ts

export class CreateDeviceDto {
    readonly name: string;
    readonly type: string;
    readonly quantity: number;
    readonly shared_quantity: number;
    readonly created_at: Date;
  }