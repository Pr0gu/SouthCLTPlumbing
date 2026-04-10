export const SITE = {
  name: 'South Charlotte Plumbing',
  domain: 'southcharlotteplumbing.com',
  url: 'https://southcharlotteplumbing.com',
  phone: '980-405-4186',
  phoneHref: 'tel:+19804054186',
  email: 'hello@southcharlotteplumbing.com',
  hours: {
    weekday: 'Mon-Fri 7AM-8PM',
    saturday: 'Sat 8AM-6PM',
    sunday: 'Sun Emergency 24/7',
  },
} as const;

export const SERVICE_AREAS = [
  { name: 'Myers Park', primary: true },
  { name: 'SouthPark', primary: true },
  { name: 'Ballantyne', primary: true },
  { name: 'Foxcroft', primary: true },
  { name: 'Eastover', primary: false },
  { name: 'Quail Hollow', primary: false },
  { name: 'Montibello', primary: false },
  { name: 'Mountainbrook', primary: false },
  { name: 'Weddington', primary: false },
  { name: 'Marvin', primary: false },
  { name: 'Piper Glen', primary: false },
  { name: 'Providence Plantation', primary: false },
  { name: 'Olde Providence', primary: false },
  { name: 'Barclay Downs', primary: false },
  { name: 'Hembstead', primary: false },
  { name: 'Pineville', primary: false },
  { name: 'Matthews', primary: false },
  { name: 'Providence', primary: false },
] as const;
