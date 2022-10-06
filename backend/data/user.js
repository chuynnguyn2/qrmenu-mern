import bcrypt from 'bcryptjs'

const users = {
  name: 'Chuyen',
  phone: '0705417087',
  password: bcrypt.hashSync('123456', 10),
  image: '/images/airpods.jpg',
  type: 'small',
  isActive: true
}

export default users
