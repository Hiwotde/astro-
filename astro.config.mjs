import { defineConfig } from 'astro/config';
import node from "@astrojs/node";



// https://astro.build/config
export default defineConfig({
 output:'server',
 adapter:node(),
});


import express from 'express';
import { handler as ssrHandler } from './dist/server/entry.mjs';

const app = express();
app.use(express.static('dist/client/'))
app.use(ssrHandler);

app.listen(8080);
