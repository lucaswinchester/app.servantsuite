#!/bin/bash

# Create necessary directories
mkdir -p apps/web/src/{app,components,context,lib,styles,types} apps/web/public

# Move source files
echo "Moving source files to new structure..."

# Move components
mv src/components/* apps/web/src/components/

# Move other top-level directories
for dir in app context lib styles; do
  if [ -d "src/$dir" ]; then
    mv "src/$dir"/* "apps/web/src/$dir/" 2>/dev/null || true
  fi
done

# Move public files
if [ -d "public" ]; then
  mv public/* apps/web/public/ 2>/dev/null || true
fi

# Move configuration files
mv next.config.* postcss.config.* tailwind.config.* apps/web/ 2>/dev/null || true

# Create a basic next-env.d.ts if it doesn't exist
if [ ! -f "apps/web/next-env.d.ts" ]; then
  cat > apps/web/next-env.d.ts << 'EOL'
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.
EOL
fi

echo "Monorepo structure created successfully!"
echo "Next steps:"
echo "1. Run 'npm install' to install dependencies"
echo "2. Run 'npm run dev:web' to start the development server"
