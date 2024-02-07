import Demo from "./demo.svelte";

//assign demo.svelte's content to app
//we do this to turn svelte components into js
const app = new Demo({
  target: document.body,
});

export default app;
