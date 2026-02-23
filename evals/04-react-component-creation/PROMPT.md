# Create a Search Filter Component

Create a React component at `app/components/SearchFilter.tsx` that implements a filterable list.

## Requirements

- Accept props: `items: string[]` and `placeholder?: string`
- Render a text input for searching/filtering
- Filter the items list in real-time as the user types (case-insensitive)
- Display the filtered items as an unordered list (`<ul>` with `<li>` elements)
- Show a "No results found" message when no items match
- The input should have `placeholder` attribute set to the `placeholder` prop (default: "Search...")
- Must be a client component (uses state)

Then update `app/page.tsx` to render the SearchFilter component with a sample list of items.
