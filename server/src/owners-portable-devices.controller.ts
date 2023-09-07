//owners-portable-devices.conroller.ts
import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('portable_devices')
export class PortableDevicesController {
  @Get()
  getFixedDevices(@Res() res: Response) {
    const portableDevices = [
      {
        "id": "1",
        "name": "Device 2",
        "type": "Type 1",
        "description": "Description 1",
        "quantity": 5,
        "created_at" : "07.09.2023",
        "can be shared?" : "yes",
        "shared quantity" : 3
      },
      {
        "id": "2",
        "name": "Device 2",
        "type": "Type 2",
        "description": "Description 2",
        "quantity": 10
      },
      {
        "id": "3",
        "name": "Device 3",
        "type": "Type 3",
        "description": "Description 3",
        "quantity": 15
      },
      {
        "date": "2023-09-06T19:00:18.739Z",
        "name": "asdas",
        "type": "das",
        "description": "das",
        "quantity": 1,
        "id": "pz9u3FN"
      }
    ];

    // Calculate the total number of items (if available)
    const totalItems = portableDevices.length;

    // Set the Content-Range header
    res.header('Content-Range', `items 0-${totalItems - 1}/${totalItems}`);

    // Send the JSON response
    return res.json(portableDevices);
  }
}
