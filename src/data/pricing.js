[
  {
    'id': 'car-rental',
    'name': 'Car Rental',
    'type': 'dropdown',
    'values': [
      { 'id': 'full', 'name': 'Full-Size', 'price': 100 },
      { 'id': 'suv', 'name': 'SUV', 'price': 200 },
      { 'id': 'luxury', 'name': 'Luxury', 'price': 300 },
    ],
  },
  {
    'id': 'accommodation',
    'name': 'Accommodation',
    'type': 'icons',
    'required': true,
    'defaultValue': 'hotel',
    'values': [
      { 'id': 'hotel', 'icon': 'h-square', 'name': 'Hotel room', 'price': 0 },
      { 'id': 'suite', 'icon': 'building', 'name': 'Suite', 'price': 500 },
      { 'id': 'house', 'icon': 'home', 'name': 'House', 'price': 1000 },
    ],
  },
  {
    'id': 'features',
    'name': 'Features',
    'type': 'checkboxes',
    'values': [
      { 'id': 'all-inclusive', 'name': 'All inclusive', 'price': 200 },
      { 'id': 'kitchen', 'name': 'Private kitchen', 'price': 500 },
      { 'id': 'pool', 'name': 'Private pool', 'price': 1000 },
      { 'id': 'security', 'name': 'Security escort', 'price': 2000 },
    ],
  },
  {
    'id': 'adults',
    'name': 'Adult guests',
    'type': 'number',
    'defaultValue': 1,
    'price': '100%',
    'limits': {
      'min': 1,
      'max': 9,
    },
  },
  {
    'id': 'children',
    'name': 'Children (aged 3-17)',
    'type': 'number',
    'defaultValue': 0,
    'price': '50%',
    'limits': {
      'min': 0,
      'max': 6,
    },
  },
];
