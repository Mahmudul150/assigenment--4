import { prisma } from "../../lib/prisma";
import { TCategory } from "./category.inerface";

const createCategory = async(payload:TCategory)=>{
    const {name , description} = payload
    const existingCategory = await prisma.category.findUnique({
    where: { name }
  });

  if (existingCategory) {
    throw new Error("Category name already exists");
  }

 
  const data = await prisma.category.create({
    data: {
      name,
      description
    }
  });

  return data;
}


const getAllCategories = async ()=>{
    const allCategories = await prisma.category.findMany({
    orderBy: {
      name: 'asc' 
    }
  });
  return allCategories
}

export const categoryService = {
    createCategory,
    getAllCategories
}