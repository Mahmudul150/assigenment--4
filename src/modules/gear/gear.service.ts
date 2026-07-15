import { GearItemWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";
import { IGearItem, IGearQuery, TUpdateGear } from "./gear.interface";







const getAllGear = async (query: IGearQuery) => {
  const limit = query.limit ? Number(query.limit) : 10;
  const page = query.page ? Number(query.page) : 1;
  const skip = (page - 1) * limit;

  const sortBy = query.sortBy || "createdAt";
  const sortOrder = query.sortOrder || "desc";

  const andConditions:GearItemWhereInput[] = [];

  // Search
  if (query.searchTerm) {
    andConditions.push({
      OR: [
        {
          name: {
            contains: query.searchTerm,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: query.searchTerm,
            mode: "insensitive",
          },
        },
        {
          brand: {
            contains: query.searchTerm,
            mode: "insensitive",
          },
        },
      ],
    });
  }

  // Name Filter
  if (query.name) {
    andConditions.push({
      name: {
        contains: query.name,
        mode: "insensitive",
      },
    });
  }

  // Brand Filter
  if (query.brand) {
    andConditions.push({
      brand: {
        contains: query.brand,
        mode: "insensitive",
      },
    });
  }

  // Category Filter
  if (query.categoryId) {
    andConditions.push({
      categoryId: query.categoryId,
    });
  }

  // Condition Filter
  if (query.condition) {
    andConditions.push({
      condition: query.condition,
    });
  }

  // Availability Filter
  if (query.isAvailable) {
    andConditions.push({
      isAvailable: query.isAvailable === "true",
    });
  }

  const gears = await prisma.gearItem.findMany({
    where: {
      AND: andConditions,
    },
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    include: {
      category: true,
      provider: {
        omit: {
          password: true,
        },
      },
    },
  });

  const total = await prisma.gearItem.count({
    where: {
      AND: andConditions,
    },
  });

  return {
    data: gears,
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    },
  };
};


const getSingelGear = async(gearId:string)=>{
  const singleGear=  await prisma.gearItem.findFirstOrThrow({
        where:{
            id:gearId
        },
        include:{
            category:{
                select:{
                    id:true,
                    name:true,
                    description:true
                }
            },
            provider:{
                select:{
                    id:true,
                    name:true,
                    email:true
                }
            }
        }
    })

    return singleGear
}


const getGearWithCategory = async(categoryId:string)=>{
    const GearWithCategory = await prisma.gearItem.findMany({
        where:{
            categoryId:categoryId
        },
        include:{
            category:true,
            provider:{
                select:{
                    id:true,
                    name:true,
                    email:true,
                    status:true
                }
            },

        }
    })

    if (!GearWithCategory) {
        throw new Error("Category id is not found");
        
    }

    return GearWithCategory
}





export const gearService = {
    
    getAllGear,
    getSingelGear,
    getGearWithCategory,
    
    
}