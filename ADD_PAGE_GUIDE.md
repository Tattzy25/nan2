# Adding New Pages to the Nano-Main Project

## Overview

This guide documents the exact steps to add new pages to the Nano-Main AI image generation app. Each page gets its own completely isolated component library and localStorage for generation history.

## Current Pages

- **Main**: `/` - Original TaTTTy page (`"nb2_generations"`)
- **Him & Her**: `/him-and-her` - Couple photos & tattoos (`"him-and-her-generations"`)
- **WTF**: `/wtf` - Crazy wild creations (`"wtf-generations"`)

## Step-by-Step Instructions

### Prerequisites
- Windows command prompt or PowerShell
- Already have at least one existing page (copy from any existing page components)

### 1. Choose a Page Name
Decide on your page name (e.g., `crazy-art`, `anime-style`, `professional`)
- Use lowercase with hyphens: `crazy-art`
- Make it descriptive of the page's purpose

### 2. Copy the Components Directory
Copy from any existing page's components (latest one recommended for newest code):

```powershell
xcopy "nano-main\components\him-and-her" "nano-main\components\{page-name}" /E /I /H /Y
# OR from WTF if that's the latest:
xcopy "nano-main\components\wtf" "nano-main\components\{page-name}" /E /I /H /Y
```

**Replace `{page-name}` with your chosen name.**

### 3. Update the Component Name
In the new `nano-main\components\{page-name}\index.tsx`:

```powershell
# Change this line:
export function HimAndHerCombiner() {
# To:
export function {ComponentName}Combiner() {
```

**Replace `{ComponentName}` with your component name** (e.g., `CrazyArtCombiner`)

Also update the export:
```powershell
# Change this line:
export default HimAndHerCombiner
# To:
export default {ComponentName}Combiner
```

### 4. Update the localStorage Key
In `nano-main\components\{page-name}\hooks\use-persistent-history.tsx`:

```powershell
# Change this line:
const STORAGE_KEY = "him-and-her-generations"
# To:
const STORAGE_KEY = "{page-name}-generations"
```

### 5. Create the Page Directory
```powershell
mkdir "nano-main\app\{page-name}"
```

### 6. Copy and Update the Page File
```powershell
copy "nano-main\app\him-and-her\page.tsx" "nano-main\app\{page-name}\page.tsx"
# OR use WTF page if that's latest
copy "nano-main\app\wtf\page.tsx" "nano-main\app\{page-name}\page.tsx"
```

### 7. Update the Page File
In `nano-main\app\{page-name}\page.tsx`, update the import and metadata:

```typescript
# At the top:
import { {ComponentName}Combiner } from "@/components/{page-name}"

# Update metadata:
export const metadata: Metadata = {
  title: "TaTTTy - {Title Description}",
  description: "{Page-specific description} AI image generation tool. Create stunning images from text, edit existing images with AI, and explore multiple aspect ratios. Powered by Google Gemini 2.5 Flash Image.",
}

# In the return statement:
<WtfCombiner />  # Change to:
<{ComponentName}Combiner />
```

## Complete Example: Adding "Anime Art" Page

### Commands:
```powershell
# 1. Copy components
xcopy "nano-main\components\wtf" "nano-main\components\anime-art" /E /I /H /Y

# 2. Create app directory
mkdir "nano-main\app\anime-art"

# 3. Copy page file
copy "nano-main\app\wtf\page.tsx" "nano-main\app\anime-art\page.tsx"
```

### Manual Updates:

1. **In `nano-main/components/anime-art/index.tsx`:**
   - `export function WtfCombiner() {` → `export function AnimeArtCombiner() {`
   - `export default WtfCombiner` → `export default AnimeArtCombiner`

2. **In `nano-main/components/anime-art/hooks/use-persistent-history.tsx`:**
   - `const STORAGE_KEY = "wtf-generations"` → `const STORAGE_KEY = "anime-art-generations"`

3. **In `nano-main/app/anime-art/page.tsx`:**
   - Import: `import { AnimeArtCombiner } from "@/components/anime-art"`
   - Title: `"TaTTTy - Anime Art AI Image Generator"`
   - Description: `"Anime Art AI image generation tool for creating anime-style images..."`

## Result
- New page at: `/{page-name}` (e.g., `/anime-art`)
- Isolated generation history: `"anime-art-generations"`
- Same exact functionality as other pages
- Completely separate localStorage and state

## Verification
After setup, the page should:
- ✅ Load at the correct URL
- ✅ Have its own unique localStorage key
- ✅ Show custom title/description
- ✅ Generate images independently
- ✅ Maintain its own generation history

## Notes
- Each page is completely isolated - no shared state
- All 16+ component files are copied and renamed
- Same production-quality features across all pages
- Easy to scale to unlimited pages following this pattern
