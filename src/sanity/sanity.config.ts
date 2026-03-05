import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { projectId, dataset } from './config';
import { schemas } from './schemas';

export default defineConfig({
  projectId,
  dataset,
  title: 'Xcursion Studio',
  basePath: '/studio',
  plugins: [structureTool()],
  schema: { types: schemas },
});
