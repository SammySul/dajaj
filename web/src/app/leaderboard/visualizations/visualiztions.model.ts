export const visualizations = ['Bar', 'Pie', 'Table'] as const;
export type Visualization = (typeof visualizations)[number];

export const pieTypes = ['doughnut', 'pie'] as const;
export type PieType = (typeof pieTypes)[number];
