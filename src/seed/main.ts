// TODO
import { DataSource } from 'typeorm';
import { Size } from '../modules/sizes/entities/size.entity';
import { FlowerType } from '../modules/flower-types/entities/flower-type.entity';

const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'todo',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
});

async function seed() {
  await AppDataSource.initialize();

  await initSizes();
  await initFlowerTypes();

  await AppDataSource.destroy();
}

seed();

async function initSizes() {
  const repo = AppDataSource.getRepository(Size);

  await repo.save([
    {
      title: 'Стандарт',
      image:
        'https://uflor.ru/upload/uf/99d/7r1i43d0ct21y03e81bfkl3u6bhali1j.svg',
    },
    {
      title: 'Стандарт +',
      image:
        'https://uflor.ru/upload/uf/b7f/592vaa3hmhmdx42havleol3a484d46ps.svg',
    },
    {
      title: 'Большой',
      image:
        'https://uflor.ru/upload/uf/04a/bzz1i3vkvec0pwelj6p0m9wloz1n2rt3.svg',
    },
    {
      title: 'Огромный',
      image:
        'https://uflor.ru/upload/uf/442/p0uxdb675op0xnac0jdv9mf0zcgzimik.svg',
    },
  ]);
}

async function initFlowerTypes() {
  const repo = AppDataSource.getRepository(FlowerType);

  await repo.save([
    { title: 'Розы' },
    { title: 'Гипсофила' },
    { title: 'Ранункулюс' },
    { title: 'Роза кустовая' },
    { title: 'Ирис' },
    { title: 'Сирень' },
    { title: 'Роза пионовидная' },
    { title: 'Лилии' },
    { title: 'Тюльпаны' },
    { title: 'Альстромерия' },
    { title: 'Лизиантусы' },
    { title: 'Тюльпаны пионовидные' },
    { title: 'Анемоны' },
    { title: 'Ландыши' },
    { title: 'Фрезия' },
    { title: 'Гиацинт' },
    { title: 'Мимозы' },
    { title: 'Хризантемы' },
    { title: 'Герберы' },
    { title: 'Орхидея' },
    { title: 'Эустома' },
    { title: 'Гвоздики' },
    { title: 'Подсолнух' },
    { title: 'Гортензия' },
    { title: 'Ромашки' },
  ]);
}
