const fish = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  title: `Tropical Fish ${i + 1}`,
  price: `${(i + 1) * 150}.000đ`,
  image: '/images/zoa-1.jpg',
  badge: i % 3 === 0 ? 'new' : undefined,
}));

const corals = Array.from({ length: 10 }, (_, i) => ({
  id: i + 11,
  title: `Coral Premium ${i + 1}`,
  price: `${(i + 1) * 300}.000đ`,
  image: '/images/zoa-2.jpg',
  badge: i % 2 === 0 ? 'hot' : undefined,
}));

export { corals, fish };
