import { AdNode } from '../types';

export const mockData: AdNode[] = [
  {
    id: 'p1',
    name: 'WINBD',
    level: 'project',
    metrics: { name: 'WINBD', budget: '$13000.00', spend: '$4450.00', registrations: 525, cpa: '$8.47', ctr: '2.8%', cpc: '$0.70', cpm: '$19.60', ftdCount: 400, ftdCost: '$11.12', projectKpi: '$10.00' },
    children: [
      {
        id: 'c1',
        name: 'Frank-F-BD-WINBD-08-V',
        level: 'campaign',
        metrics: { name: 'Frank-F-BD-WINBD-08-V', budget: '$5000.00', spend: '$1250.00', registrations: 125, cpa: '$10.00', ctr: '2.5%', cpc: '$0.50', cpm: '$12.50', ftdCount: 100, ftdCost: '$12.50', projectKpi: '$10.00' },
        children: [
          {
            id: 'g1',
            name: 'Frank-F-BD-WINBD-08-V',
            level: 'adGroup',
            metrics: { name: 'Frank-F-BD-WINBD-08-V', budget: '$2500.00', spend: '$600.00', registrations: 60, cpa: '$10.00', ctr: '2.4%', cpc: '$0.52', cpm: '$12.48', ftdCount: 45, ftdCost: '$13.33', projectKpi: '$10.00' },
            children: [
              {
                id: 'a1',
                name: 'Ad-Image-01-Win',
                level: 'ad',
                remark: '周末表现较好，建议保留。',
                imageUrl: 'https://i.ibb.co/nM5jYBsM/20260121-151104.png',
                metrics: {
                  name: 'Ad-Image-01-Win',
                  budget: '$500.00',
                  spend: '$120.50',
                  registrations: 45,
                  cpa: '$2.67',
                  ctr: '1.24%',
                  cpc: '$0.45',
                  cpm: '$5.60',
                  ftdCount: 15,
                  ftdCost: '$8.03',
                  projectKpi: '$10.00'
                }
              },
              {
                id: 'a2',
                name: 'Ad-Video-02-BD',
                level: 'ad',
                imageUrl: 'https://i.ibb.co/LXsZV0bs/20260121-151058.png',
                metrics: {
                  name: 'Ad-Video-02-BD',
                  budget: '$800.00',
                  spend: '$340.20',
                  registrations: 112,
                  cpa: '$3.03',
                  ctr: '2.10%',
                  cpc: '$0.38',
                  cpm: '$8.20',
                  ftdCount: 25,
                  ftdCost: '$13.60',
                  projectKpi: '$10.00'
                }
              },
              {
                id: 'a3',
                name: 'Ad-Carousel-03-V',
                level: 'ad',
                imageUrl: 'https://i.ibb.co/bj9YKnJQ/20260121-151049.png',
                metrics: {
                  name: 'Ad-Carousel-03-V',
                  budget: '$300.00',
                  spend: '$50.00',
                  registrations: 12,
                  cpa: '$4.16',
                  ctr: '0.85%',
                  cpc: '$0.65',
                  cpm: '$4.50',
                  ftdCount: 5,
                  ftdCost: '$10.00',
                  projectKpi: '$10.00'
                }
              }
            ]
          }
        ]
      },
      {
        id: 'c2',
        name: 'Alice-A-US-IOS-09-X',
        level: 'campaign',
        metrics: { name: 'Alice-A-US-IOS-09-X', budget: '$8000.00', spend: '$3200.00', registrations: 400, cpa: '$8.00', ctr: '3.1%', cpc: '$0.80', cpm: '$24.80', ftdCount: 300, ftdCost: '$10.66', projectKpi: '$10.00' },
        children: [
          {
            id: 'g2',
            name: 'Alice-A-US-IOS-09-X',
            level: 'adGroup',
            metrics: { name: 'Alice-A-US-IOS-09-X', budget: '$8000.00', spend: '$3200.00', registrations: 400, cpa: '$8.00', ctr: '3.1%', cpc: '$0.80', cpm: '$24.80', ftdCount: 300, ftdCost: '$10.66', projectKpi: '$10.00' },
            children: [
              {
                id: 'a4',
                name: 'Ad-Banner-01',
                level: 'ad',
                imageUrl: 'https://i.ibb.co/xtFKhrzb/20260121-151038.png',
                metrics: {
                  name: 'Ad-Banner-01',
                  budget: '$1000.00',
                  spend: '$450.00',
                  registrations: 80,
                  cpa: '$5.62',
                  ctr: '1.50%',
                  cpc: '$0.80',
                  cpm: '$12.00',
                  ftdCount: 60,
                  ftdCost: '$7.50',
                  projectKpi: '$10.00'
                }
              },
              {
                id: 'a5',
                name: 'Ad-Video-05',
                level: 'ad',
                imageUrl: 'https://i.ibb.co/xtkWp3J9/20260121-151029.jpg',
                metrics: {
                  name: 'Ad-Video-05',
                  budget: '$500.00',
                  spend: '$200.00',
                  registrations: 35,
                  cpa: '$5.71',
                  ctr: '1.80%',
                  cpc: '$0.75',
                  cpm: '$13.50',
                  ftdCount: 20,
                  ftdCost: '$10.00',
                  projectKpi: '$10.00'
                }
              },
              {
                id: 'a6',
                name: 'Ad-Image-06',
                level: 'ad',
                imageUrl: 'https://i.ibb.co/jkCxm0vb/20260121-151024.jpg',
                metrics: {
                  name: 'Ad-Image-06',
                  budget: '$600.00',
                  spend: '$300.00',
                  registrations: 50,
                  cpa: '$6.00',
                  ctr: '2.00%',
                  cpc: '$0.70',
                  cpm: '$14.00',
                  ftdCount: 20,
                  ftdCost: '$15.00',
                  projectKpi: '$10.00'
                }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'p2',
    name: 'EARN',
    level: 'project',
    metrics: { name: 'EARN', budget: '$2000.00', spend: '$500.00', registrations: 50, cpa: '$10.00', ctr: '1.5%', cpc: '$0.50', cpm: '$10.00', ftdCount: 30, ftdCost: '$16.66', projectKpi: '$15.00' },
    children: [
      {
        id: 'c3',
        name: 'Bob-B-UK-AND-10-Y',
        level: 'campaign',
        metrics: { name: 'Bob-B-UK-AND-10-Y', budget: '$2000.00', spend: '$500.00', registrations: 50, cpa: '$10.00', ctr: '1.5%', cpc: '$0.50', cpm: '$10.00', ftdCount: 30, ftdCost: '$16.66', projectKpi: '$15.00' },
        children: [
          {
            id: 'g3',
            name: 'Bob-B-UK-AND-10-Y',
            level: 'adGroup',
            metrics: { name: 'Bob-B-UK-AND-10-Y', budget: '$2000.00', spend: '$500.00', registrations: 50, cpa: '$10.00', ctr: '1.5%', cpc: '$0.50', cpm: '$10.00', ftdCount: 30, ftdCost: '$16.66', projectKpi: '$15.00' },
            children: [
              {
                id: 'a7',
                name: 'Ad-Video-07',
                level: 'ad',
                imageUrl: 'https://picsum.photos/seed/ad7/400/300',
                metrics: {
                  name: 'Ad-Video-07',
                  budget: '$2000.00',
                  spend: '$500.00',
                  registrations: 50,
                  cpa: '$10.00',
                  ctr: '1.5%',
                  cpc: '$0.50',
                  cpm: '$10.00',
                  ftdCount: 30,
                  ftdCost: '$16.66',
                  projectKpi: '$15.00'
                }
              }
            ]
          }
        ]
      }
    ]
  }
];
