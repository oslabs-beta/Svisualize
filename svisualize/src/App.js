import App from "./App.svelte";

//assign demo.svelte's content to app
//we do this to turn svelte components into js
const app = new App({
  target: document.body,
});

export default app;
