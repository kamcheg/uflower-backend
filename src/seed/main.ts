// TODO
import { DataSource } from 'typeorm';
import { Size } from '../modules/sizes/entities/size.entity';
import { FlowerType } from '../modules/flower-types/entities/flower-type.entity';
import { Flower } from '../modules/flowers/entities/flower.entity';

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

const conditions = {
  sizes: false,
  flowerTypes: false,
  flowers: false,
};

async function seed() {
  await AppDataSource.initialize();

  if (conditions.sizes) {
    await initSizes();
  }
  if (conditions.flowerTypes) {
    await initFlowerTypes();
  }
  if (conditions.flowers) {
    await initFlowers();
  }

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

async function initFlowers() {
  const repo = AppDataSource.getRepository(Flower);

  await repo.save([
    {
      name: 'Мимоза итальяно',
      price: 5600,
      description:
        'Цветочная композиция «Мимоза итальяно» — идеальный подарок для любого повода.',
      images: [
        'https://uflor.ru/api-v2/thumbnail/?src=/upload/iblock/b40/6grrxyw9w36bc7ari2m3fuyry9thw7e3.jpeg&w=312&h=312',
      ],
      isActive: true,
      width: 312,
      height: 312,
      brand: {
        id: 1,
      },
      size: {
        id: 14,
      },
    },
    {
      name: 'Махровые тюльпаны Дабл Блю S',
      price: 5800,
      description:
        'Цветочная композиция «Махровые тюльпаны Дабл Блю S» — идеальный подарок для любого повода.',
      images: [
        'https://uflor.ru/api-v2/thumbnail/?src=/upload/iblock/35b/mna8s67ae23f7lyoca4lv0bxw1x33y03.jpg&w=312&h=312',
      ],
      isActive: true,
      width: 312,
      height: 312,
      brand: {
        id: 1,
      },
      size: {
        id: 14,
      },
    },
    {
      name: 'Микси',
      price: 7900,
      description:
        'Цветочная композиция «Микси» — идеальный подарок для любого повода.',
      images: [
        'https://uflor.ru/api-v2/thumbnail/?src=/upload/iblock/f78/9tmt9ep3bjxrrenni8go2cr91gh8j448.jpeg&w=312&h=312',
      ],
      isActive: true,
      width: 312,
      height: 312,
      brand: {
        id: 1,
      },
      size: {
        id: 13,
      },
    },
    {
      name: 'Загадай желание',
      price: 8900,
      description:
        'Цветочная композиция «Загадай желание» — идеальный подарок для любого повода.',
      images: [
        'https://uflor.ru/api-v2/thumbnail/?src=/upload/iblock/e28/vcrotv8r24pq0rile42mg8ylh0pt2rf2.jpeg&w=312&h=312',
      ],
      isActive: true,
      width: 312,
      height: 312,
      brand: {
        id: 1,
      },
      size: {
        id: 13,
      },
    },
    {
      name: 'Весеннее дуновение',
      price: 10500,
      description:
        'Цветочная композиция «Весеннее дуновение» — идеальный подарок для любого повода.',
      images: [
        'https://uflor.ru/api-v2/thumbnail/?src=/upload/iblock/077/jnbjqk6l1ld0ck3e1zukb2hepzbzh7l6.jpg&w=312&h=312',
      ],
      isActive: true,
      width: 312,
      height: 312,
      brand: {
        id: 1,
      },
      size: {
        id: 15,
      },
    },
    {
      name: 'Гиацинты с генистой S',
      price: 6500,
      description:
        'Цветочная композиция «Гиацинты с генистой S» — идеальный подарок для любого повода.',
      images: [
        'https://uflor.ru/api-v2/thumbnail/?src=/upload/iblock/444/zgvtm4joltj0bwlh0juykmpuk0kshwrl.jpg&w=312&h=312',
      ],
      isActive: true,
      width: 312,
      height: 312,
      brand: {
        id: 1,
      },
      size: {
        id: 14,
      },
    },
    {
      name: 'Махровые тюльпаны Коламбус с генистой S',
      price: 7600,
      description:
        'Цветочная композиция «Махровые тюльпаны Коламбус с генистой S» — идеальный подарок для любого повода.',
      images: [
        'https://uflor.ru/api-v2/thumbnail/?src=/upload/iblock/24b/y5bg52pbopjml83481cggnch2jp489cf.jpg&w=312&h=312',
      ],
      isActive: true,
      width: 312,
      height: 312,
      brand: {
        id: 1,
      },
      size: {
        id: 14,
      },
    },
    {
      name: 'Летняя свежесть',
      price: 12900,
      description:
        'Цветочная композиция «Летняя свежесть» — идеальный подарок для любого повода.',
      images: [
        'https://uflor.ru/api-v2/thumbnail/?src=/upload/iblock/da6/3e5pjw6nc53rd5yiev119xfzlb5e9y51.jpg&w=312&h=312',
      ],
      isActive: true,
      width: 312,
      height: 312,
      brand: {
        id: 1,
      },
      size: {
        id: 14,
      },
    },
    {
      name: 'Чувствуешь весну',
      price: 7600,
      description:
        'Цветочная композиция «Чувствуешь весну» — идеальный подарок для любого повода.',
      images: [
        'https://uflor.ru/api-v2/thumbnail/?src=/upload/iblock/7ea/pdhws6u0z5efaqfmtngiy3a597l1lykn.jpg&w=312&h=312',
      ],
      isActive: true,
      width: 312,
      height: 312,
      brand: {
        id: 1,
      },
      size: {
        id: 13,
      },
    },
    {
      name: 'Махровые тюльпаны Коламбус S',
      price: 6600,
      description:
        'Цветочная композиция «Махровые тюльпаны Коламбус S» — идеальный подарок для любого повода.',
      images: [
        'https://uflor.ru/api-v2/thumbnail/?src=/upload/iblock/732/dw6b9u4atmjs7cvdhizem22761y164e6.jpg&w=312&h=312',
      ],
      isActive: true,
      width: 312,
      height: 312,
      brand: {
        id: 1,
      },
      size: {
        id: 14,
      },
    },
    {
      name: 'Солнечное 8 марта',
      price: 13500,
      description:
        'Цветочная композиция «Солнечное 8 марта» — идеальный подарок для любого повода.',
      images: [
        'https://uflor.ru/api-v2/thumbnail/?src=/upload/iblock/236/62g02y9otz196n7aq6g5lwa8x31e75vv.jpeg&w=312&h=312',
      ],
      isActive: true,
      width: 312,
      height: 312,
      brand: {
        id: 1,
      },
      size: {
        id: 15,
      },
    },
    {
      name: 'Махровые тюльпаны Коламбус с мимозой M',
      price: 10100,
      description:
        'Цветочная композиция «Махровые тюльпаны Коламбус с мимозой M» — идеальный подарок для любого повода.',
      images: [
        'https://uflor.ru/api-v2/thumbnail/?src=/upload/iblock/79e/md26grmlw9p23ejx8mq5dspfaa7q6mw8.jpg&w=312&h=312',
      ],
      isActive: true,
      width: 312,
      height: 312,
      brand: {
        id: 1,
      },
      size: {
        id: 1,
      },
    },
    {
      name: 'Нежнейшие лютики',
      price: 11300,
      description:
        'Цветочная композиция «Нежнейшие лютики» — идеальный подарок для любого повода.',
      images: [
        'https://uflor.ru/api-v2/thumbnail/?src=/upload/iblock/860/08iucck92vbzkufhm1v2yq2ud45tudyf.jpg&w=312&h=312',
      ],
      isActive: true,
      width: 312,
      height: 312,
      brand: {
        id: 1,
      },
      size: {
        id: 13,
      },
    },
    {
      name: 'Махровые тюльпаны Дабл Блю',
      price: 16600,
      description:
        'Цветочная композиция «Махровые тюльпаны Дабл Блю» — идеальный подарок для любого повода.',
      images: [
        'https://uflor.ru/api-v2/thumbnail/?src=/upload/iblock/32f/vz1s7yx9ndy1mppl582i0abmwa7gk386.jpg&w=312&h=312',
      ],
      isActive: true,
      width: 312,
      height: 312,
      brand: {
        id: 1,
      },
      size: {
        id: 13,
      },
    },
    {
      name: 'Пинкс',
      price: 6700,
      description:
        'Цветочная композиция «Пинкс» — идеальный подарок для любого повода.',
      images: [
        'https://uflor.ru/api-v2/thumbnail/?src=/upload/iblock/82b/a2qxt7sv40nboguop0t76a12q55v3gl4.jpeg&w=312&h=312',
      ],
      isActive: true,
      width: 312,
      height: 312,
      brand: {
        id: 1,
      },
      size: {
        id: 13,
      },
    },
    {
      name: 'Нежное чувство',
      price: 7900,
      description:
        'Цветочная композиция «Нежное чувство» — идеальный подарок для любого повода.',
      images: [
        'https://uflor.ru/api-v2/thumbnail/?src=/upload/iblock/301/qzcmwq7x1ylhmb0ox88gjbqnd8t1m68b.jpeg&w=312&h=312',
      ],
      isActive: true,
      width: 312,
      height: 312,
      brand: {
        id: 1,
      },
      size: {
        id: 1,
      },
    },
    {
      name: 'Букет из 15 тюльпанов с генистой',
      price: 7600,
      description:
        'Цветочная композиция «Букет из 15 тюльпанов с генистой» — идеальный подарок для любого повода.',
      images: [
        'https://uflor.ru/api-v2/thumbnail/?src=/upload/iblock/cb6/er6lay57de2dw12ai6ulwikkm2f94mo6.jpg&w=312&h=312',
      ],
      isActive: true,
      width: 312,
      height: 312,
      brand: {
        id: 1,
      },
      size: {
        id: 14,
      },
    },
    {
      name: 'Тюльпаны Дабл Блю c мимозой S',
      price: 7600,
      description:
        'Цветочная композиция «Тюльпаны Дабл Блю c мимозой S» — идеальный подарок для любого повода.',
      images: [
        'https://uflor.ru/api-v2/thumbnail/?src=/upload/iblock/437/jp2exk8jzyl7exp7nq9ti5j2jytop2za.jpg&w=312&h=312',
      ],
      isActive: true,
      width: 312,
      height: 312,
      brand: {
        id: 1,
      },
      size: {
        id: 1,
      },
    },
    {
      name: 'Хрустальный замок',
      price: 15100,
      description:
        'Цветочная композиция «Хрустальный замок» — идеальный подарок для любого повода.',
      images: [
        'https://uflor.ru/api-v2/thumbnail/?src=/upload/iblock/982/qabsc0g60hqb76j5q6nx65z2i3bomkvw.jpg&w=312&h=312',
      ],
      isActive: true,
      width: 312,
      height: 312,
      brand: {
        id: 1,
      },
      size: {
        id: 14,
      },
    },
    {
      name: 'Сиреневые гиацинты M',
      price: 7600,
      description:
        'Цветочная композиция «Сиреневые гиацинты M» — идеальный подарок для любого повода.',
      images: [
        'https://uflor.ru/api-v2/thumbnail/?src=/upload/iblock/cc7/r76x6veabdm8y4eo77xdbcnn4yuiq467.jpg&w=312&h=312',
      ],
      isActive: true,
      width: 312,
      height: 312,
      brand: {
        id: 1,
      },
      size: {
        id: 15,
      },
    },
    {
      name: 'Альстра севен',
      price: 5900,
      description:
        'Цветочная композиция «Альстра севен» — идеальный подарок для любого повода.',
      images: [
        'https://uflor.ru/api-v2/thumbnail/?src=/upload/iblock/0c5/pp09m3psh4k4c89sk5l77dea8pxuk4d5.jpeg&w=312&h=312',
      ],
      isActive: true,
      width: 312,
      height: 312,
      brand: {
        id: 1,
      },
      size: {
        id: 14,
      },
    },
    {
      name: 'Гиацинты с мимозой микс',
      price: 20100,
      description:
        'Цветочная композиция «Гиацинты с мимозой микс» — идеальный подарок для любого повода.',
      images: [
        'https://uflor.ru/api-v2/thumbnail/?src=/upload/iblock/bd3/5aymtalwzy6wsd1sea79g0b132et1pb4.jpg&w=312&h=312',
      ],
      isActive: true,
      width: 312,
      height: 312,
      brand: {
        id: 1,
      },
      size: {
        id: 13,
      },
    },
    {
      name: 'Нежное дуновение',
      price: 9900,
      description:
        'Цветочная композиция «Нежное дуновение» — идеальный подарок для любого повода.',
      images: [
        'https://uflor.ru/api-v2/thumbnail/?src=/upload/iblock/231/9u7t5ioddt79iml9zvltpq8qiydle5hq.jpg&w=312&h=312',
      ],
      isActive: true,
      width: 312,
      height: 312,
      brand: {
        id: 1,
      },
      size: {
        id: 14,
      },
    },
    {
      name: 'Тюльпаны Дабл Блю с генистой S',
      price: 7600,
      description:
        'Цветочная композиция «Тюльпаны Дабл Блю с генистой S» — идеальный подарок для любого повода.',
      images: [
        'https://uflor.ru/api-v2/thumbnail/?src=/upload/iblock/040/x812z49zce0dl1pstxscsagtvcx787j2.jpg&w=312&h=312',
      ],
      isActive: true,
      width: 312,
      height: 312,
      brand: {
        id: 1,
      },
      size: {
        id: 14,
      },
    },
    {
      name: 'Великая княжна',
      price: 20300,
      description:
        'Цветочная композиция «Великая княжна» — идеальный подарок для любого повода.',
      images: [
        'https://uflor.ru/api-v2/thumbnail/?src=/upload/iblock/4c0/l5ft2a17cefn413vq1qwtpen62qx0w3d.jpeg&w=312&h=312',
      ],
      isActive: true,
      width: 312,
      height: 312,
      brand: {
        id: 1,
      },
      size: {
        id: 1,
      },
    },
    {
      name: 'Микс гиацинтов с мимозой в коробке',
      price: 19200,
      description:
        'Цветочная композиция «Микс гиацинтов с мимозой в коробке» — идеальный подарок для любого повода.',
      images: [
        'https://uflor.ru/api-v2/thumbnail/?src=/upload/iblock/356/26ptsypgbdce8qia72o004blfb0h09f9.jpg&w=312&h=312',
      ],
      isActive: true,
      width: 312,
      height: 312,
      brand: {
        id: 1,
      },
      size: {
        id: 15,
      },
    },
    {
      name: 'Миром правит любовь',
      price: 8700,
      description:
        'Цветочная композиция «Миром правит любовь» — идеальный подарок для любого повода.',
      images: [
        'https://uflor.ru/api-v2/thumbnail/?src=/upload/iblock/92f/8yae0t8zo4c6lkfm78bg33xc7gfjz15u.jpeg&w=312&h=312',
      ],
      isActive: true,
      width: 312,
      height: 312,
      brand: {
        id: 1,
      },
      size: {
        id: 1,
      },
    },
    {
      name: 'Карамельные тюльпаны',
      price: 17300,
      description:
        'Цветочная композиция «Карамельные тюльпаны» — идеальный подарок для любого повода.',
      images: [
        'https://uflor.ru/api-v2/thumbnail/?src=/upload/iblock/918/p5kudkyq2g27hfjrj3ox2a609emwv4cy.jpg&w=312&h=312',
      ],
      isActive: true,
      width: 312,
      height: 312,
      brand: {
        id: 1,
      },
      size: {
        id: 15,
      },
    },
    {
      name: 'Элегантный реверанс',
      price: 15100,
      description:
        'Цветочная композиция «Элегантный реверанс» — идеальный подарок для любого повода.',
      images: [
        'https://uflor.ru/api-v2/thumbnail/?src=/upload/iblock/92a/b5lcuszpa300957p0y1fg3egs0yqi5h3.jpg&w=312&h=312',
      ],
      isActive: true,
      width: 312,
      height: 312,
      brand: {
        id: 1,
      },
      size: {
        id: 13,
      },
    },
    {
      name: 'Нежное дуновение',
      price: 9900,
      description:
        'Цветочная композиция «Нежное дуновение» — идеальный подарок для любого повода.',
      images: [
        'https://uflor.ru/api-v2/thumbnail/?src=/upload/iblock/231/9u7t5ioddt79iml9zvltpq8qiydle5hq.jpg&w=312&h=312',
      ],
      isActive: true,
      width: 312,
      height: 312,
      brand: {
        id: 1,
      },
      size: {
        id: 14,
      },
    },
    {
      name: 'Тюльпаны Дабл Блю с генистой S',
      price: 7600,
      description:
        'Цветочная композиция «Тюльпаны Дабл Блю с генистой S» — идеальный подарок для любого повода.',
      images: [
        'https://uflor.ru/api-v2/thumbnail/?src=/upload/iblock/040/x812z49zce0dl1pstxscsagtvcx787j2.jpg&w=312&h=312',
      ],
      isActive: true,
      width: 312,
      height: 312,
      brand: {
        id: 1,
      },
      size: {
        id: 13,
      },
    },
    {
      name: 'Великая княжна',
      price: 20300,
      description:
        'Цветочная композиция «Великая княжна» — идеальный подарок для любого повода.',
      images: [
        'https://uflor.ru/api-v2/thumbnail/?src=/upload/iblock/4c0/l5ft2a17cefn413vq1qwtpen62qx0w3d.jpeg&w=312&h=312',
      ],
      isActive: true,
      width: 312,
      height: 312,
      brand: {
        id: 1,
      },
      size: {
        id: 13,
      },
    },
    {
      name: 'Микс гиацинтов с мимозой в коробке',
      price: 19200,
      description:
        'Цветочная композиция «Микс гиацинтов с мимозой в коробке» — идеальный подарок для любого повода.',
      images: [
        'https://uflor.ru/api-v2/thumbnail/?src=/upload/iblock/356/26ptsypgbdce8qia72o004blfb0h09f9.jpg&w=312&h=312',
      ],
      isActive: true,
      width: 312,
      height: 312,
      brand: {
        id: 1,
      },
      size: {
        id: 14,
      },
    },
    {
      name: 'Миром правит любовь',
      price: 8700,
      description:
        'Цветочная композиция «Миром правит любовь» — идеальный подарок для любого повода.',
      images: [
        'https://uflor.ru/api-v2/thumbnail/?src=/upload/iblock/92f/8yae0t8zo4c6lkfm78bg33xc7gfjz15u.jpeg&w=312&h=312',
      ],
      isActive: true,
      width: 312,
      height: 312,
      brand: {
        id: 1,
      },
      size: {
        id: 1,
      },
    },
    {
      name: 'Карамельные тюльпаны',
      price: 17300,
      description:
        'Цветочная композиция «Карамельные тюльпаны» — идеальный подарок для любого повода.',
      images: [
        'https://uflor.ru/api-v2/thumbnail/?src=/upload/iblock/918/p5kudkyq2g27hfjrj3ox2a609emwv4cy.jpg&w=312&h=312',
      ],
      isActive: true,
      width: 312,
      height: 312,
      brand: {
        id: 1,
      },
      size: {
        id: 15,
      },
    },
    {
      name: 'Элегантный реверанс',
      price: 15100,
      description:
        'Цветочная композиция «Элегантный реверанс» — идеальный подарок для любого повода.',
      images: [
        'https://uflor.ru/api-v2/thumbnail/?src=/upload/iblock/92a/b5lcuszpa300957p0y1fg3egs0yqi5h3.jpg&w=312&h=312',
      ],
      isActive: true,
      width: 312,
      height: 312,
      brand: {
        id: 1,
      },
      size: {
        id: 1,
      },
    },
    {
      name: 'Нежное дуновение',
      price: 9900,
      description:
        'Цветочная композиция «Нежное дуновение» — идеальный подарок для любого повода.',
      images: [
        'https://uflor.ru/api-v2/thumbnail/?src=/upload/iblock/231/9u7t5ioddt79iml9zvltpq8qiydle5hq.jpg&w=312&h=312',
      ],
      isActive: true,
      width: 312,
      height: 312,
      brand: {
        id: 1,
      },
      size: {
        id: 1,
      },
    },
    {
      name: 'Тюльпаны Дабл Блю с генистой S',
      price: 7600,
      description:
        'Цветочная композиция «Тюльпаны Дабл Блю с генистой S» — идеальный подарок для любого повода.',
      images: [
        'https://uflor.ru/api-v2/thumbnail/?src=/upload/iblock/040/x812z49zce0dl1pstxscsagtvcx787j2.jpg&w=312&h=312',
      ],
      isActive: true,
      width: 312,
      height: 312,
      brand: {
        id: 1,
      },
      size: {
        id: 15,
      },
    },
    {
      name: 'Великая княжна',
      price: 20300,
      description:
        'Цветочная композиция «Великая княжна» — идеальный подарок для любого повода.',
      images: [
        'https://uflor.ru/api-v2/thumbnail/?src=/upload/iblock/4c0/l5ft2a17cefn413vq1qwtpen62qx0w3d.jpeg&w=312&h=312',
      ],
      isActive: true,
      width: 312,
      height: 312,
      brand: {
        id: 1,
      },
      size: {
        id: 13,
      },
    },
    {
      name: 'Микс гиацинтов с мимозой в коробке',
      price: 19200,
      description:
        'Цветочная композиция «Микс гиацинтов с мимозой в коробке» — идеальный подарок для любого повода.',
      images: [
        'https://uflor.ru/api-v2/thumbnail/?src=/upload/iblock/356/26ptsypgbdce8qia72o004blfb0h09f9.jpg&w=312&h=312',
      ],
      isActive: true,
      width: 312,
      height: 312,
      brand: {
        id: 1,
      },
      size: {
        id: 14,
      },
    },
    {
      name: 'Миром правит любовь',
      price: 8700,
      description:
        'Цветочная композиция «Миром правит любовь» — идеальный подарок для любого повода.',
      images: [
        'https://uflor.ru/api-v2/thumbnail/?src=/upload/iblock/92f/8yae0t8zo4c6lkfm78bg33xc7gfjz15u.jpeg&w=312&h=312',
      ],
      isActive: true,
      width: 312,
      height: 312,
      brand: {
        id: 1,
      },
      size: {
        id: 1,
      },
    },
    {
      name: 'Карамельные тюльпаны',
      price: 17300,
      description:
        'Цветочная композиция «Карамельные тюльпаны» — идеальный подарок для любого повода.',
      images: [
        'https://uflor.ru/api-v2/thumbnail/?src=/upload/iblock/918/p5kudkyq2g27hfjrj3ox2a609emwv4cy.jpg&w=312&h=312',
      ],
      isActive: true,
      width: 312,
      height: 312,
      brand: {
        id: 1,
      },
      size: {
        id: 1,
      },
    },
    {
      name: 'Элегантный реверанс',
      price: 15100,
      description:
        'Цветочная композиция «Элегантный реверанс» — идеальный подарок для любого повода.',
      images: [
        'https://uflor.ru/api-v2/thumbnail/?src=/upload/iblock/92a/b5lcuszpa300957p0y1fg3egs0yqi5h3.jpg&w=312&h=312',
      ],
      isActive: true,
      width: 312,
      height: 312,
      brand: {
        id: 1,
      },
      size: {
        id: 15,
      },
    },
    {
      name: 'Нежное дуновение',
      price: 9900,
      description:
        'Цветочная композиция «Нежное дуновение» — идеальный подарок для любого повода.',
      images: [
        'https://uflor.ru/api-v2/thumbnail/?src=/upload/iblock/231/9u7t5ioddt79iml9zvltpq8qiydle5hq.jpg&w=312&h=312',
      ],
      isActive: true,
      width: 312,
      height: 312,
      brand: {
        id: 1,
      },
      size: {
        id: 13,
      },
    },
    {
      name: 'Тюльпаны Дабл Блю с генистой S',
      price: 7600,
      description:
        'Цветочная композиция «Тюльпаны Дабл Блю с генистой S» — идеальный подарок для любого повода.',
      images: [
        'https://uflor.ru/api-v2/thumbnail/?src=/upload/iblock/040/x812z49zce0dl1pstxscsagtvcx787j2.jpg&w=312&h=312',
      ],
      isActive: true,
      width: 312,
      height: 312,
      brand: {
        id: 1,
      },
      size: {
        id: 14,
      },
    },
    {
      name: 'Великая княжна',
      price: 20300,
      description:
        'Цветочная композиция «Великая княжна» — идеальный подарок для любого повода.',
      images: [
        'https://uflor.ru/api-v2/thumbnail/?src=/upload/iblock/4c0/l5ft2a17cefn413vq1qwtpen62qx0w3d.jpeg&w=312&h=312',
      ],
      isActive: true,
      width: 312,
      height: 312,
      brand: {
        id: 1,
      },
      size: {
        id: 1,
      },
    },
    {
      name: 'Микс гиацинтов с мимозой в коробке',
      price: 19200,
      description:
        'Цветочная композиция «Микс гиацинтов с мимозой в коробке» — идеальный подарок для любого повода.',
      images: [
        'https://uflor.ru/api-v2/thumbnail/?src=/upload/iblock/356/26ptsypgbdce8qia72o004blfb0h09f9.jpg&w=312&h=312',
      ],
      isActive: true,
      width: 312,
      height: 312,
      brand: {
        id: 1,
      },
      size: {
        id: 15,
      },
    },
    {
      name: 'Миром правит любовь',
      price: 8700,
      description:
        'Цветочная композиция «Миром правит любовь» — идеальный подарок для любого повода.',
      images: [
        'https://uflor.ru/api-v2/thumbnail/?src=/upload/iblock/92f/8yae0t8zo4c6lkfm78bg33xc7gfjz15u.jpeg&w=312&h=312',
      ],
      isActive: true,
      width: 312,
      height: 312,
      brand: {
        id: 1,
      },
      size: {
        id: 13,
      },
    },
  ]);
}
