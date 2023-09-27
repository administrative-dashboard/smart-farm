import { Injectable, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OwnerField } from 'src/database/models/owners_fields.model';
import { Model } from 'sequelize-typescript';
import { Field } from 'src/database/models/fields.model';
import { Sequelize, Op } from 'sequelize';
import { now } from 'sequelize/types/utils';
import { User } from 'src/database/models/users.model';
import { MeasurementUnit } from 'src/database/models/measurement_units';
@Injectable()
export class OwnerFieldsService {
  constructor(
    @InjectModel(OwnerField)
    private readonly ownerField: typeof OwnerField
  ) {}
  async getUserIdByEmail(email: string): Promise<number | null> {
    try {
      const user = await User.findOne({
        attributes: ['id'],
        where: {
          email: email,
        },
      });
      if (user) {
        return user.id;
      } else {
        return null; // Return null if the user with the specified email does not exist
      }
    } catch (error) {
      console.error('Error retrieving user ID by email:', error);
      throw error;
    }
  }
  async getFieldsByEmail(
    email: string,
    page?: number,
    perPage?: number,
    field?: string,
    order?: string
  ): Promise<{ data: any[], total: number }> {
    try {
      const userId = await this.getUserIdByEmail(email);
      const sort = [];
      if (field && order) {
        sort.push([field, order]);
      } else {
        sort.push(['id', 'ASC']);
      }
      const total = await this.ownerField.count({
        where: {
          user_id: userId,
        },
      });
      const data = await this.ownerField.findAll({
        where: {
          user_id: userId,
        },
        attributes: [
          'id',
          [Sequelize.col('fields.name'), 'field_name'],
          [Sequelize.col('fields.size'), 'field_size'],
          [Sequelize.col('fields.measurement_units.value'), 'measurement'],
          [Sequelize.col('fields.description'), 'field_description'],
          [Sequelize.col('fields.location'), 'field_location'],
          'created_at',
          'updated_at',
        ],
        include: [
          {
            model: Field,
            attributes: [],
            include: [
            {
              model: MeasurementUnit,
              attributes: [],
            },
        ]
          },
        ],
        order: sort,
        offset: ((page - 1) * perPage),
        limit: perPage,
        subQuery: false,
      });
      return { data, total };
    } catch (error) {
      throw error;
    }
  }
  async searchFields(
    email: string,
    query?: any,
    fieldName?: any,
    fieldSize?: any,
    fieldSizeMeasurement?: any,
    fieldDescription?: any,
    fieldLocation?: any,
    created_at?: any,
    page?:number,
    perPage?:number,
    field?:any,
    order?:any,
  ): Promise<{ data: any[], total: number }>{
    console.log(created_at);
    try {
      const userId = await this.getUserIdByEmail(email);
      const sort = [];
      if (field && order) {
        sort.push([field, order]);
      } else {
        sort.push(['id', 'ASC']);
      }
      const total = await this.ownerField.count({
        where: {
          user_id: userId,
        },
      });
      const whereClause: any = {
        [Op.and]: [
          {
            user_id: userId,
          },
        ],
      };
      if (!isNaN(query) && query !== '') {
        whereClause[Op.or] = [
          Sequelize.literal(`"fields"."size" = :numQuery`),
        ];
      } else if (query !== '' && query !== undefined) {
        whereClause[Op.or] = [
          Sequelize.literal(`"fields"."name" ILIKE :textQuery`),
          Sequelize.literal(`"fields->measurement_units"."value" ILIKE :textQuery`), 
          Sequelize.literal(`"fields"."description" ILIKE :textQuery`),
          Sequelize.literal(`"fields"."location" ILIKE :textQuery`),
        ];
      }
      if (fieldName !== '' && fieldName !== undefined) {
        console.log('field_name is pushed');
        whereClause[Op.and].push(
          Sequelize.literal(`"fields"."name" ILIKE :textFieldName`)
        );
      }
      if (fieldSize !== '' && fieldSize !== undefined) {
        console.log('field_size is pushed');
        whereClause[Op.and].push(
          Sequelize.literal(`"fields"."size" = :numSize`)
        );
      }
      if (fieldSizeMeasurement !== '' && fieldSizeMeasurement !== undefined) {
        console.log('fieldSizeMeasurement is pushed');
        whereClause[Op.and].push(
          Sequelize.literal(`"fields->measurement_units"."value" ILIKE :textSizeMeasurement`),
        );
      }
      if (fieldDescription !== '' && fieldDescription !== undefined) {
        console.log('fieldDescription is pushed');
        whereClause[Op.and].push(
          Sequelize.literal(`"fields"."description" ILIKE :textDescription`)
        );
      }
      if (fieldLocation !== '' && fieldLocation !== undefined) {
        console.log('fieldLocation is pushed');
        whereClause[Op.and].push(
          Sequelize.literal(`"fields"."location" ILIKE :textLocation`)
        );
      }
      if (created_at !== '' && created_at !== undefined) {
        console.log('created_at is pushed');
        const date = new Date(created_at);
        date.setHours(0, 0, 0, 0);
        const endDate = new Date(date);
        endDate.setHours(23, 59, 59, 999);
        whereClause[Op.and].push({
          created_at: {
            [Op.between]: [date, endDate],
          },
        });
      }
      const data = await this.ownerField.findAll({
        where: whereClause,
        attributes: [
          'id',
          [Sequelize.col('fields.name'), 'field_name'],
          [Sequelize.col('fields.size'), 'field_size'],
          [Sequelize.col('fields.measurement_units.value'), 'measurement'],
          [Sequelize.col('fields.description'), 'field_description'],
          [Sequelize.col('fields.location'), 'field_location'],
          'created_at',
      
        ],
        include: [
          {
            model: Field,
            as: 'fields',
            attributes: [],
            include: [
              {
                model: MeasurementUnit,
                attributes: ['value'],
              },
            ]
          },
        ],
        replacements: {
          textQuery: `%${query}%`,
          textFieldName: `%${fieldName}%`,
          textSizeMeasurement:`%${fieldSizeMeasurement}%`,
          textDescription: `%${fieldDescription}%`,
          textLocation:`%${fieldLocation}%`,
          numQuery: query,
          numSize: fieldSize,
         
        },
        order:sort,
        offset:((page-1)*perPage),
        limit : perPage,
        subQuery:false,
      });
      return  {data, total};
    } catch (error) {
      throw error;
    }
  }

  // async createField(email: string, fieldData: any): Promise<OwnerField> {
  //   try {
  //     const userId = await this.getUserIdByEmail(email);

  //     const ownerFields = await OwnerField.findAll({
  //       where: {
  //         user_id: userId,
  //       },
  //       attributes: [
  //         'id',
  //         [Sequelize.col('fields.name'), 'field_name'],
  //       ],
  //       include: Field, // Include the Field table in the query
  //     });

      

      // console.log(ownerFields);
      // return;


  //   } catch (error) {
  //     console.error(error);
  //     throw new Error("Failed to create a field.");
  //   }
  // }

  async getFieldById(id: string): Promise<any | null> {
    try {
      const ParsedId = parseInt(id, 10);
      /* const portableDevices = await this.getDevicesByUserId(userId); */
      const fields = await this.ownerField.findOne({
        where: {
          id: ParsedId,
        },
        attributes: [
          'id',
          [Sequelize.col('fields.name'), 'field_name'],
          [Sequelize.col('fields.size'), 'field_size'],
          [Sequelize.col('fields.measurement_units.value'), 'measurement'],
          [Sequelize.col('fields.description'), 'field_description'],
          [Sequelize.col('fields.location'), 'field_location'],
          'created_at',
          'updated_at',
        ],
        include: [
          {
            model: Field,
            attributes: [],
          },
        ],
      });

      return fields || null;
    } catch (error) {
      throw error;
    }
  }
}

//   async updateFieldsById(id: string, fieldData: any): Promise<any> {
//     try {
//       const ParsedId = parseInt(id, 10);

//       const existingField =
//         await this.ownerField.findOne({
//           where: {
//             id: ParsedId,
//           },
//         });

//       if (!existingField) {
//         return null;
//       }


//       const associatedField = await Field.findByPk(
//         existingField.field_id
//       );

//         await associatedField.update({
//           name: fieldData.name,
//           size: fieldData.size,
//           measurement_id: fieldData.measurement,
//           location: fieldData.location,
//           description: fieldData.description,
//         });
//       }

//       // Return the updated OwnerPortableDevice
//       return existingPortableDevice;
//     } catch (error) {
//       throw error;
//     }
//   }
// }
//   async deletePortableDeviceById(id: string): Promise<boolean> {
//     try {
//       const ParsedId = parseInt(id, 10);

//       // Find the OwnerPortableDevice record with the given ID
//       const existingPortableDevice =
//         await this.OwnerPortableDeviceModel.findOne({
//           where: {
//             id: ParsedId,
//           },
//         });

//       if (!existingPortableDevice) {
//         return false; // Portable device not found
//       }

//       // Find the associated PortableDevice record
//       const associatedPortableDevice = await PortableDevice.findByPk(
//         existingPortableDevice.portable_device_id
//       );

//       if (associatedPortableDevice) {
//         // Delete the associated PortableDevice record
//         await associatedPortableDevice.destroy();
//       }

//       // Delete the OwnerPortableDevice record
//       await existingPortableDevice.destroy();

//       return true; // Deletion successful
//     } catch (error) {
//       throw error;
//     }
//   }
// }
// 