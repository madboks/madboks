import { type Vegetables, type PrismaClient } from '@prisma/client'

const VEGETABLES = [
  {
    name: 'Apple',
    id: '7d325fec-9a59-4312-ae2b-fd3555f2ae8f',
    guideline: 0.2
  },
  {
    name: 'Apricot',
    id: '7a32dbcf-7a5f-4a6d-ab79-bd996ee95d0c',
    guideline: 0.035
  },
  {
    name: 'Artichoke',
    id: '891cf6de-b7de-4978-9073-6e907a973bf4',
    guideline: 0.35
  },
  {
    name: 'Asparagus',
    id: '086dff45-cd4b-461b-be1b-47c8c5a23596',
    guideline: 0
  },
  {
    name: 'Avocado',
    id: 'ca701fb4-3c96-4950-bb6c-2016d7a25a54',
    guideline: 0.17
  },
  {
    name: 'Bamboo Shoots',
    id: '68feabfe-e6bf-4ca0-947b-77fe0d504450',
    guideline: 0
  },
  {
    name: 'Banana',
    id: '6da72e9d-a1a5-42c5-b757-19e086aa1b06',
    guideline: 0.12
  },
  {
    name: 'Basil',
    id: '8b32a5d6-2a9e-4b32-a386-315abb5a405a',
    guideline: 0
  },
  {
    name: 'Bay leaves',
    id: 'e5b7f889-5d33-495d-8904-738527eb9911',
    guideline: 0
  },
  {
    name: 'Bean Sprouts',
    id: '39f3b3d2-a931-4e6e-8c64-174907e31b4f',
    guideline: 0
  },
  {
    name: 'Beans',
    id: 'f13fecd8-7c92-4e53-9175-92fa0668ca19',
    guideline: 0
  },
  {
    name: 'Beets',
    id: '65259546-0712-4e7b-a030-afbf36a6395f',
    guideline: 0.3
  },
  {
    name: 'Blackberries',
    id: '8451656c-dddb-4764-891e-cdd4a842a5a8',
    guideline: 0
  },
  {
    name: 'Blueberries',
    id: 'a69afa7c-e3b5-40c9-a4e3-ce451616bc4b',
    guideline: 0
  },
  {
    name: 'Bread',
    id: 'ee59b6ce-e8ef-4d99-97d7-499b70e09e90',
    guideline: 0
  },
  {
    name: 'Broccoli',
    id: '9286db21-8f74-42ef-b27b-b772afe5b333',
    guideline: 0.5
  },
  {
    name: 'Brussel Sprouts',
    id: '59138365-1ccb-4630-9b3b-67c1e133ade0',
    guideline: 0.014
  },
  {
    name: 'Cabbage, Red',
    id: '5981e737-daed-421f-8e57-14c31e0f32d4',
    guideline: 0.9
  },
  {
    name: 'Cabbage, Red, Pointy',
    id: '1e73a062-1823-4430-bfae-cba7f5c4184a',
    guideline: 0.75
  },
  {
    name: 'Cabbage, White',
    id: 'cabd77f7-8f0d-420a-800e-827dbca00aa5',
    guideline: 0.9
  },
  {
    name: 'Cabbage, White, Pointy',
    id: '27c58e1e-3e87-4aec-9894-0e103e49b85e',
    guideline: 0.75
  },
  {
    name: 'Cantaloupe',
    id: 'b2d79322-ce1a-4cbf-b9dd-5d19a23daaae',
    guideline: 0.6
  },
  {
    name: 'Carrots',
    id: '16223f71-c4aa-4edf-ab28-60c7d1a07764',
    guideline: 0.06
  },
  {
    name: 'Cauliflower',
    id: '6e3e3d5c-3480-442b-b000-e42634c99eaa',
    guideline: 0.6
  },
  {
    name: 'Celery',
    id: '88925e48-fb0a-4228-be7f-ae65d55ffc20',
    guideline: 0.45
  },
  {
    name: 'Celery root',
    id: 'a096d5fe-5ff9-40f1-9965-ba4ebeb3c62f',
    guideline: 0.5
  },
  {
    name: 'Cherries',
    id: '956a0936-8094-4719-ad7b-1e391794850d',
    guideline: 0
  },
  {
    name: 'Chili pepper',
    id: 'bf2fbc00-44f6-4060-af72-e1fe6c062f72',
    guideline: 0.02
  },
  {
    name: 'Chives',
    id: 'c3eeec05-ae06-4396-85d7-8c5bf3468623',
    guideline: 0
  },
  {
    name: 'Coconuts',
    id: '38c7f301-d483-4e8d-9dfd-128beb133b61',
    guideline: 0.6
  },
  {
    name: 'Coriander',
    id: 'eab0c20b-e8bb-4750-ae3c-aa6c7ea4be28',
    guideline: 0
  },
  {
    name: 'Corn',
    id: '14a61a28-e559-409d-8ad2-3436747a2da7',
    guideline: 0.3
  },
  {
    name: 'Cranberries',
    id: '517b77af-031a-4850-a534-f4120b893269',
    guideline: 0
  },
  {
    name: 'Cucumber',
    id: '62fbf29b-68da-428d-814c-e879b4cd3953',
    guideline: 0.33
  },
  {
    name: 'Dates',
    id: 'ae7c0a6c-2595-459d-ad49-277b1829c5f9',
    guideline: 0
  },
  {
    name: 'Dill',
    id: '7a8fc831-b901-4245-af90-d16f7361afef',
    guideline: 0
  },
  {
    name: 'Dried Plums',
    id: 'c4de8223-0dcc-46c0-9037-df9a1c10295c',
    guideline: 0
  },
  {
    name: 'Eggplant/Aubergine',
    id: 'cc4807ad-0de5-41d7-a8c7-c4d66a10561d',
    guideline: 0.3
  },
  {
    name: 'Endive',
    id: 'b8155332-758f-49e8-b64a-5f39f846f638',
    guideline: 0.25
  },
  {
    name: 'Fennel',
    id: '2b8e578c-e2db-43ef-a9e9-0bc59c401370',
    guideline: 0.25
  },
  {
    name: 'Figs',
    id: '4c32c775-9167-4c6a-a3ef-24f1d9de93c7',
    guideline: 0.05
  },
  {
    name: 'Fruit, other',
    id: 'e1ff6ed0-e917-447f-9e06-8ee72294f175',
    guideline: 0
  },
  {
    name: 'Garlic',
    id: 'e1d5a354-1af0-45ca-9daf-f97db75eb824',
    guideline: 0.03
  },
  {
    name: 'Ginger',
    id: '990408b8-dd0a-44ec-885a-a8a203857b12',
    guideline: 0
  },
  {
    name: 'Gooseberries',
    id: '1be9d390-b853-4241-8296-1cfd8648667c',
    guideline: 0
  },
  {
    name: 'Grapefruit',
    id: 'c9f2632c-c225-4fa1-97cf-1a7f427423e7',
    guideline: 0.25
  },
  {
    name: 'Grapes',
    id: '1f4c9dc5-e6de-4088-b11b-68307fdfe3e9',
    guideline: 0
  },
  {
    name: 'Green Beans',
    id: '3a77e1a2-64b3-4ca1-bcd0-bf6d50088998',
    guideline: 0
  },
  {
    name: 'Guava',
    id: '4c7bdadb-8af1-4100-8a12-e9c1f012af95',
    guideline: 0.2
  },
  {
    name: 'Herbs, other',
    id: '8994b12c-3994-42bd-b078-48551468a5a1',
    guideline: 0
  },
  {
    name: 'Honeydew Melon',
    id: '9dbdb9e3-29c0-49b3-a8ae-2c9a39ae3dd6',
    guideline: 1.5
  },
  {
    name: 'Iceberg Lettuce',
    id: '8dcc715f-aa6c-4d57-b8e6-538bfa86cebb',
    guideline: 0.7
  },
  {
    name: 'Jerusalem Artichoke',
    id: 'cb10367f-7238-49a7-84d5-08a46ea35f7b',
    guideline: 0
  },
  {
    name: 'Kaki/Persimmon',
    id: '51acf6ad-2b8a-4945-b3c6-0bc55ccf6ed2',
    guideline: 0.25
  },
  {
    name: 'Kale',
    id: 'ca26666f-1d08-4012-8683-30518f3635d4',
    guideline: 0.2
  },
  {
    name: 'Kiwifruit',
    id: '4d0bf99b-b863-4c62-99c3-29f17f12294f',
    guideline: 0.05
  },
  {
    name: 'Kohlrabi',
    id: '6a81ece4-9595-4c6d-94fb-4b22888fba1b',
    guideline: 0
  },
  {
    name: 'Leeks',
    id: '25b35cab-6461-4ea9-89e1-7d344e2e8267',
    guideline: 0.15
  },
  {
    name: 'Lemon balm',
    id: '378e2ac5-88e1-41f5-88e6-453d81315241',
    guideline: 0
  },
  {
    name: 'Lemongrass',
    id: '5a382e81-b536-4172-b466-8e5641b5a395',
    guideline: 0
  },
  {
    name: 'Lemons',
    id: 'f344b5c6-754f-4a10-8851-bdb83a501eb0',
    guideline: 0.15
  },
  {
    name: 'Lettuce',
    id: '35e57f48-2b00-4855-bb81-79cbec55bdd4',
    guideline: 0.5
  },
  {
    name: 'Limes',
    id: '14f2fe4a-d116-4b25-8e02-e523dd1a0894',
    guideline: 0.075
  },
  {
    name: 'Lychee',
    id: '0d4997ff-9dc6-4661-b5b1-8c3cac38b2ee',
    guideline: 0
  },
  {
    name: 'Mandarin',
    id: '1160ac3d-7a38-48fa-a068-b5f7117bee1e',
    guideline: 0.125
  },
  {
    name: 'Mango',
    id: '62071336-ea2d-422a-a657-abfb47137afb',
    guideline: 0.3
  },
  {
    name: 'Marjoram',
    id: '8e00e9d9-f62d-4b6c-9f2c-7f4407547ff7',
    guideline: 0
  },
  {
    name: 'Mint',
    id: 'd803349c-df68-4efe-83be-756a0a72ae5d',
    guideline: 0
  },
  {
    name: 'Mushrooms',
    id: '413c8803-5a93-4ae5-830b-b14ef09b176d',
    guideline: 0
  },
  {
    name: 'Nectarines',
    id: '4247913b-324d-40e5-8d03-78013f22a6b8',
    guideline: 0.15
  },
  {
    name: 'Onion',
    id: '6ff336b1-290e-419d-91c1-1b2432415a96',
    guideline: 0.15
  },
  {
    name: 'Oranges',
    id: 'bd4ba8bd-41ed-4f59-8fb7-9b7769485e0d',
    guideline: 0.13
  },
  {
    name: 'Oregano',
    id: 'f8bc06f0-d621-4fc5-adb7-3e6ba64154f2',
    guideline: 0
  },
  {
    name: 'Pak Choy',
    id: '05f63979-ffe8-49be-96b8-cc24dc00f8eb',
    guideline: 0.2
  },
  {
    name: 'Papayas',
    id: '1c906109-c89d-4d11-8ff5-3f157639fe9a',
    guideline: 0.45
  },
  {
    name: 'Parsley',
    id: '85782a26-8721-4c13-9134-aa3e993b3788',
    guideline: 0
  },
  {
    name: 'Parsnip',
    id: '8fa2c45b-6bd4-4e58-8194-c70bfef2ec9f',
    guideline: 0.11
  },
  {
    name: 'Passion Fruit',
    id: 'f5f92cad-0deb-4619-935d-4890251e94a0',
    guideline: 0.05
  },
  {
    name: 'Pastry',
    id: '038bd90c-d01f-4681-bb16-afbcd27d894b',
    guideline: 0
  },
  {
    name: 'Peaches',
    id: '64e4a7ed-25ea-4552-8eed-6f5c9126f0e3',
    guideline: 0.15
  },
  {
    name: 'Pears',
    id: '8a073df4-5b9b-4859-8433-75574a33d9e0',
    guideline: 0.12
  },
  {
    name: 'Peas',
    id: '497fa9c4-aeb3-4f6e-9a2e-f6610a874d90',
    guideline: 0
  },
  {
    name: 'Peppers',
    id: '287945c4-b10e-4773-a6be-a4744caad6eb',
    guideline: 0.17
  },
  {
    name: 'Physalis',
    id: '21ac29b8-cf6f-4093-9763-3358ce3cdb1c',
    guideline: 0
  },
  {
    name: 'Pineapple',
    id: 'be4dcf43-c468-40e3-a6de-6928bb35c16e',
    guideline: 1.5
  },
  {
    name: 'Plums',
    id: '5c18190a-7f58-4deb-a74e-b32240228da5',
    guideline: 0.065
  },
  {
    name: 'Pomegranate',
    id: '6b9765d2-c375-4a1b-8803-576a6d1ae31c',
    guideline: 0.25
  },
  {
    name: 'Pomelo',
    id: 'a173a689-4eb4-4f0c-a8af-ac789c98c560',
    guideline: 0.5
  },
  {
    name: 'Potatoes',
    id: 'c50a63f6-4fc5-43ac-a825-442233f48cbd',
    guideline: 0.2
  },
  {
    name: 'Prunes',
    id: '406d000f-f358-41df-96c9-56f9be17c5c9',
    guideline: 0
  },
  {
    name: 'Pumpkin',
    id: 'f4b45e7d-1249-4721-804d-0d57c02ba0ae',
    guideline: 1.25
  },
  {
    name: 'Quince',
    id: '9011799f-0824-463c-8129-c85b7eab550e',
    guideline: 0.3
  },
  {
    name: 'Radicchio',
    id: '45d06e63-5e6b-4031-a841-e04ba304ff33',
    guideline: 0.3
  },
  {
    name: 'Radishes',
    id: '952741f9-bb12-4b2a-91e6-1a886e7147cd',
    guideline: 0.025
  },
  {
    name: 'Raisins',
    id: 'dd940aa1-7842-4085-acc7-2fe93e5de084',
    guideline: 0
  },
  {
    name: 'Raspberries',
    id: '7fa8882f-42b9-40ad-992a-c7c2616839ea',
    guideline: 0
  },
  {
    name: 'Rhubarb',
    id: 'd304f0a0-87db-443f-9c44-0754a314d48b',
    guideline: 0.1
  },
  {
    name: 'Romaine Lettuce',
    id: 'ae62c0a2-8d9b-4acc-844b-f6c75a5c6493',
    guideline: 0.25
  },
  {
    name: 'Romanesco',
    id: '726ce14d-3d1e-47b0-8748-88acb7bf8a23',
    guideline: 0.75
  },
  {
    name: 'Rosemary',
    id: 'de857b59-27c6-4d5a-948b-aa73eb689a62',
    guideline: 0
  },
  {
    name: 'Rutabaga',
    id: 'e6774dee-2560-4740-bec4-a3938f84c7fd',
    guideline: 0.3
  },
  {
    name: 'Sage',
    id: 'fdcf18e8-0170-4bbc-8224-a25a40f82cc1',
    guideline: 0
  },
  {
    name: 'Salad mix',
    id: 'add06b5a-e4f3-47a4-ab1c-65564913ead3',
    guideline: 0
  },
  {
    name: 'Shallots',
    id: '5f10666c-04b0-4bb9-867a-e7b8960336f8',
    guideline: 0.05
  },
  {
    name: 'Spinach',
    id: '03fd394d-6712-4f16-8980-e59a49ef74ae',
    guideline: 0
  },
  {
    name: 'Spring Onion',
    id: '19aa337b-3b6f-4e3e-8146-06a5b95c784d',
    guideline: 0.25
  },
  {
    name: 'Spring onion',
    id: '8f92c9be-903d-4071-8629-15443d78fb25',
    guideline: 0
  },
  {
    name: 'Sprouts',
    id: '06f23532-fb63-4a37-a8ed-c3ab66f20acc',
    guideline: 0
  },
  {
    name: 'Squash',
    id: '449d8a16-bb92-4a3c-909f-9987ce4c6376',
    guideline: 0.2
  },
  {
    name: 'Strawberries',
    id: '787c0401-4056-4960-bbfe-50a034fd8a6a',
    guideline: 0
  },
  {
    name: 'String Beans',
    id: 'fe80cb1e-19ad-4339-8e14-26ab95e5916e',
    guideline: 0
  },
  {
    name: 'Sweet Potato',
    id: '379bdb4a-9f72-4190-bae4-a0feed350087',
    guideline: 0.4
  },
  {
    name: 'Tangerines',
    id: '3204dc8b-ddae-4d5c-85b9-cd84460990aa',
    guideline: 0.13
  },
  {
    name: 'Tarragon',
    id: '1b480de6-50a8-409c-a5f0-de2adcfc9f5d',
    guideline: 0
  },
  {
    name: 'Thyme',
    id: '04faed7d-04c3-45d8-b355-6f398c0620b4',
    guideline: 0
  },
  {
    name: 'Tomato',
    id: '28d25162-a7f4-4e0b-8804-1afb7fc64e92',
    guideline: 0.17
  },
  {
    name: 'Turmeric',
    id: '059bbdb5-ddd6-4170-b149-520fd7a0373a',
    guideline: 0
  },
  {
    name: 'Turnip',
    id: 'f3f1dbe3-9111-4fc3-b66b-eb737c0f3979',
    guideline: 0
  },
  {
    name: 'Vegetable, other',
    id: 'cc7abbf8-789f-4c16-87a4-7d9a3a369c50',
    guideline: 0
  },
  {
    name: 'Watercress',
    id: 'b8ed3ece-c736-40f1-b4e4-aa2818227df2',
    guideline: 0
  },
  {
    name: 'Watermelon',
    id: 'a0dc0c6f-689d-4639-9e62-b9d0cc0f3e08',
    guideline: 2.5
  },
  {
    name: 'Yams',
    id: '86f9e4e9-9d0b-4d41-a9cd-1470ffb1d7a6',
    guideline: 0
  },
  {
    name: 'Yellow Squash',
    id: 'e40afb88-2b0f-4447-959c-b9cb49b5fedc',
    guideline: 0
  },
  {
    name: 'Yuca/Cassava',
    id: 'c38589af-ba63-4413-a3d0-5180643bbbda',
    guideline: 0
  },
  {
    name: 'Zucchini/Squash',
    id: '28e35eec-53e7-4f4e-8fa2-560db09465ce',
    guideline: 0.2
  }
]
export async function vegetablesSeeds (db: PrismaClient): Promise<Vegetables[]> {
  return await Promise.all(
    VEGETABLES.map(async vegetable => await db.vegetables.create({ data: vegetable }))
  )
}
