import * as svelte from 'svelte/compiler';
export async function generateComponentStructure(entryFile) {
  const fileResponse = await fetch(entryFile);

  if (!fileResponse.ok) {
    throw new Error(`Failed to fetch file: ${entryFile}`);
  }

  const fileContents = await fileResponse.text();
  console.log(`File contents of ${entryFile}:`, fileContents);

  try {
    const parsed = svelte.parse(fileContents);

    if (parsed.instance && parsed.instance.content) {
      // ... (rest of the code)
    }
  } catch (error) {
    console.error(`Error parsing Svelte file ${entryFile}: ${error.message}`);
  }

  // If there's no <script> tag, or if parsing fails, return an empty structure
  return {
    name: entryFile,
    children: [],
  };
}
