import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { projectId, dataset } from './src/sanity/config';
import { schemas } from './src/sanity/schemas';

export default defineConfig({
  projectId,
  dataset,
  title: 'Xcursion Studio',
  basePath: '/studio',
  plugins: [structureTool()],
  schema: { types: schemas },
});
