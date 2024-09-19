import { hashSync } from 'bcryptjs'
import { User } from '../models/users.model'

const seedUsers = async () => {
  // Random Users
  const users: Array<any> = [
    {
      firstName: 'Niyonkuru',
      secondName: 'Bertin',
      gender:'male',
      dob: new Date('2001-07-24'),
      email: 'niyonkurubbertin@gmail.com',
      role:'admin',
      password: hashSync('String@123')
    },
    {
        firstName: 'Niyonkuru',
        secondName: 'Bertin',
        gender:'male',
        dob: new Date('2001-07-24'),
        email: 'nniyonkurubertin@gmail.com',
        role:'seller',
        password: hashSync('String@123')
    },
    {
        firstName: 'Niyonkuru',
        secondName: '',
        gender:'male',
        dob: new Date('2001-07-24'),
        email: 'niyonkurubertin50@gmail.com',
        role:'seller',
        password: hashSync('String@123')
    },
   
  ];
  try {
    for (const userData of users) {
      const user = await User.create(userData);
    }
  } catch (error) {
    console.error('Error seeding users:', error);
  }
}

export default seedUsers