import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OwnerGreenhouse } from 'src/database/models/owners_greenhouses.model';
import { Greenhouse } from 'src/database/models/greenhouses.model';
import { Sequelize, Op } from 'sequelize';
import { User } from 'src/database/models/users.model';
import { MeasurementUnit } from 'src/database/models/measurement_units';
@Injectable()
export class OwnerGreenhousesService {
  constructor(
    @InjectModel(OwnerGreenhouse)
    private readonly ownerGreenhouse: typeof OwnerGreenhouse
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
  async getGreenhousesByEmail(
    email: string,
    page?: number,
    perPage?: number,
    field?: string,
    order?: string
  ): Promise<{ data: any[]; total: number }> {
    try {
      const userId = await this.getUserIdByEmail(email);
      const sort = [];
      if (field && order) {
        sort.push([field, order]);
      } else {
        sort.push(['id', 'ASC']);
      }
      const total = await this.ownerGreenhouse.count({
        where: {
          user_id: userId,
        },
      });
      const data = await this.ownerGreenhouse.findAll({
        where: {
          user_id: userId,
        },
        attributes: [
          'id',
          [Sequelize.col('greenhouses.name'), 'greenhouse_name'],
          [Sequelize.col('greenhouses.size'), 'greenhouse_size'],
          [Sequelize.col('greenhouses.measurement_units.value'), 'measurement'],
          [Sequelize.col('greenhouses.description'), 'greenhouse_description'],
          [Sequelize.col('greenhouses.location'), 'greenhouse_location'],
          'created_at',
          'updated_at',
        ],
        include: [
          {
            model: Greenhouse,
            attributes: [],
            include: [
              {
                model: MeasurementUnit,
                attributes: [],
              },
            ],
          },
        ],
        order: sort,
        offset: (page - 1) * perPage,
        limit: perPage,
        subQuery: false,
      });
      return { data, total };
    } catch (error) {
      throw error;
    }
  }
  async searchGreenhouses(
    email: string,
    query?: any,
    greenhouseName?: any,
    greenhouseSize?: any,
    greenhouseSizeMeasurement?: any,
    greenhouseDescription?: any,
    greenhouseLocation?: any,
    created_at?: any,
    page?: number,
    perPage?: number,
    field?: any,
    order?: any
  ): Promise<{ data: any[]; total: number }> {
    console.log(created_at);
    try {
      const userId = await this.getUserIdByEmail(email);
      const sort = [];
      if (field && order) {
        sort.push([field, order]);
      } else {
        sort.push(['id', 'ASC']);
      }
      const total = await this.ownerGreenhouse.count({
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
          Sequelize.literal(`"greenhouses"."size" = :numQuery`),
        ];
      } else if (query !== '' && query !== undefined) {
        whereClause[Op.or] = [
          Sequelize.literal(`"greenhouses"."name" ILIKE :textQuery`),
          Sequelize.literal(
            `"greenhouses->measurement_units"."value" ILIKE :textQuery`
          ),
          Sequelize.literal(`"greenhouses"."description" ILIKE :textQuery`),
          Sequelize.literal(`"greenhouses"."location" ILIKE :textQuery`),
        ];
      }
      if (greenhouseName !== '' && greenhouseName !== undefined) {
        console.log('greenhouse_name is pushed');
        whereClause[Op.and].push(
          Sequelize.literal(`"greenhouses"."name" ILIKE :textGreenhouseName`)
        );
      }
      if (greenhouseSize !== '' && greenhouseSize !== undefined) {
        console.log('greenhouse_size is pushed');
        whereClause[Op.and].push(
          Sequelize.literal(`"greenhouses"."size" = :numSize`)
        );
      }
      if (
        greenhouseSizeMeasurement !== '' &&
        greenhouseSizeMeasurement !== undefined
      ) {
        console.log('greenhouseSizeMeasurement is pushed');
        whereClause[Op.and].push(
          Sequelize.literal(
            `"greenhouses->measurement_units"."value" ILIKE :textSizeMeasurement`
          )
        );
      }
      if (greenhouseDescription !== '' && greenhouseDescription !== undefined) {
        console.log('greenhouseDescription is pushed');
        whereClause[Op.and].push(
          Sequelize.literal(
            `"greenhouses"."description" ILIKE :textDescription`
          )
        );
      }
      if (greenhouseLocation !== '' && greenhouseLocation !== undefined) {
        console.log('greenhouseLocation is pushed');
        whereClause[Op.and].push(
          Sequelize.literal(`"greenhouses"."location" ILIKE :textLocation`)
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
      const data = await this.ownerGreenhouse.findAll({
        where: whereClause,
        attributes: [
          'id',
          [Sequelize.col('greenhouses.name'), 'greenhouse_name'],
          [Sequelize.col('greenhouses.size'), 'greenhouse_size'],
          [Sequelize.col('greenhouses.measurement_units.value'), 'measurement'],
          [Sequelize.col('greenhouses.description'), 'greenhouse_description'],
          [Sequelize.col('greenhouses.location'), 'greenhouse_location'],
          'created_at',
        ],
        include: [
          {
            model: Greenhouse,
            as: 'greenhouses',
            attributes: [],
            include: [
              {
                model: MeasurementUnit,
                attributes: ['value'],
              },
            ],
          },
        ],
        replacements: {
          textQuery: `%${query}%`,
          textGreenhouseName: `%${greenhouseName}%`,
          textSizeMeasurement: `%${greenhouseSizeMeasurement}%`,
          textDescription: `%${greenhouseDescription}%`,
          textLocation: `%${greenhouseLocation}%`,
          numQuery: query,
          numSize: greenhouseSize,
        },
        order: sort,
        offset: (page - 1) * perPage,
        limit: perPage,
        subQuery: false,
      });
      return { data, total };
    } catch (error) {
      throw error;
    }
  }

  async createGreenhouse(
    email: string,
    greenhouseData: any
  ): Promise<OwnerGreenhouse> {
    try {
      const userId = await this.getUserIdByEmail(email);
      const existingOwnerGreenhouse = await OwnerGreenhouse.findOne({
        where: {
          user_id: userId,
        },
        include: [
          {
            model: Greenhouse,
            where: {
              name: greenhouseData.name,
            },
          },
        ],
      });

      if (existingOwnerGreenhouse) {
        throw new Error('You already have a greenhouse with the same name.');
      }

      const createdGreenhouse = await Greenhouse.create({
        name: greenhouseData.name,
        size: greenhouseData.size,
        measurement_id: greenhouseData.measurement,
        description: greenhouseData.description,
        location: greenhouseData.location,
      });

      const ownerCreatedGreenhouse = await this.ownerGreenhouse.create({
        user_id: userId,
        greenhouse_id: createdGreenhouse.id,
        created_at: greenhouseData.created_at,
      });

      return ownerCreatedGreenhouse;
    } catch (error) {
      throw error;
    }
  }
  async getGreenhouseById(id: string): Promise<any | null> {
    try {
      const ParsedId = parseInt(id, 10);

      const greenhouse = await this.ownerGreenhouse.findOne({
        where: {
          id: ParsedId,
        },
        attributes: [
          'id',
          [Sequelize.col('greenhouses.name'), 'greenhouse_name'],
          [Sequelize.col('greenhouses.size'), 'greenhouse_size'],
          [Sequelize.col('greenhouses.measurement_units.id'), 'measurement'],
          [Sequelize.col('greenhouses.description'), 'greenhouse_description'],
          [Sequelize.col('greenhouses.location'), 'greenhouse_location'],
          'created_at',
        ],
        include: [
          {
            model: Greenhouse,
            attributes: [],
            include: [
              {
                model: MeasurementUnit,
                attributes: [],
              },
            ],
          },
        ],
      });
      return greenhouse || null;
    } catch (error) {
      throw error;
    }
  }

  async updateGreenhouseById(
    id: string,
    greenhouseData: any,
    email: string
  ): Promise<any> {
    try {
      const ParsedId = parseInt(id, 10);
      const userId = await this.getUserIdByEmail(email);
      const repeatingGreenhouse = await this.ownerGreenhouse.findOne({
        where: {
          user_id: userId,
          id: {
            [Op.not]: ParsedId,
          },
        },
        include: [
          {
            model: Greenhouse,
            where: {
              name: greenhouseData.name,
            },
          },
        ],
      });
      if (repeatingGreenhouse) {
        throw new Error('You already have a greenhouse with the same name.');
      }

      const existingGreenhouse = await this.ownerGreenhouse.findOne({
        where: {
          id: ParsedId,
        },
      });

      if (!existingGreenhouse) {
        return null;
      }

      await existingGreenhouse.update({
        updated_at: new Date(),
      });

      const associatedGreenhouse = await Greenhouse.findByPk(
        existingGreenhouse.greenhouse_id
      );

      if (associatedGreenhouse) {
        await associatedGreenhouse.update({
          name: greenhouseData.name,
          size: greenhouseData.size,
          measurement_id: greenhouseData.measurement,
          location: greenhouseData.location,
          description: greenhouseData.description,
        });
      }

      return existingGreenhouse;
    } catch (error) {
      throw error;
    }
  }

  async deleteGreenhouseById(id: string): Promise<boolean> {
    try {
      const ParsedId = parseInt(id, 10);
      const existingGreenhouse = await this.ownerGreenhouse.findOne({
        where: {
          id: ParsedId,
        },
      });

      if (!existingGreenhouse) {
        return false;
      }
      const associatedGreenhouse = await Greenhouse.findByPk(
        existingGreenhouse.greenhouse_id
      );

      if (associatedGreenhouse) {
        await associatedGreenhouse.destroy();
      }
      await existingGreenhouse.destroy();
      return true;
    } catch (error) {
      throw error;
    }
  }
}
