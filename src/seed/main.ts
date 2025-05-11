// TODO
import { DataSource } from 'typeorm';
import { Size } from '../modules/sizes/entities/size.entity';

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
  const repo = AppDataSource.getRepository(Size);

  await repo.save([
    {
      title: 'Большой',
      image:
        'https://uflor.ru/upload/uf/04a/bzz1i3vkvec0pwelj6p0m9wloz1n2rt3.svg',
    },
  ]);

  await AppDataSource.destroy();
}

seed();
