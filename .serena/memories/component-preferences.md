# Component Preferences

## UI Component Library

**Default Component Library**: shadcn/ui

### Guidelines
- Always use shadcn components for UI elements unless explicitly instructed otherwise
- The project has shadcn configured with the `@shadcn` registry
- Available components include: button, dialog, input, select, textarea, toggle-group, separator, skeleton, dropdown-menu, navigation-menu, and many more
- Use `pnpm dlx shadcn@latest add @shadcn/component-name` to add new components when needed

### Project Configuration
- Components are stored in: `components/ui/`
- Configuration file: `components.json`
- Registry: `@shadcn`

This ensures consistency across the codebase and maintains the established design system.