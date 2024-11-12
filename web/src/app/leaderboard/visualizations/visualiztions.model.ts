export const visualizations = ['Bar', 'Pie', 'Table'] as const;
export type Visualization = (typeof visualizations)[number];
