import { Request, Response } from 'express';

export const getAllUser = async (req: Request, res: Response) => {
  try {
    return res.send('Working');
    const a = 10;
  } catch (error) {
    console.log(error);
  }
};

// [
//     "https://mazharulislam.online/?fbclid=IwY2xjawGljSZleHRuA2FlbQIxMAABHTpuSeFptF0OlyMjSG5qAqeKpaTeS6Bz2c6tj8eeJw_4NF1vQ8I0UD9bsw_aem_BAuGNuSXv0_5aDHpU17QRA#services"
//   ]
