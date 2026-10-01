#!/usr/bin/env bash
# ==============================================================================
# Desi Tadka — Image Optimization & WebP Conversion Pipeline
# Resizes raw JPG/PNG/WEBP food photos to 600x400 px, quality 80, < 80 KB.
# ==============================================================================

set -euo pipefail

# Resolve script directory and paths
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
RAW_DIR="${PROJECT_ROOT}/app/images/raw"
OUTPUT_DIR="${PROJECT_ROOT}/app/images/dishes"
MAX_SIZE_KB=80

# Colors for terminal output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}================================================================${NC}"
echo -e "${BLUE}      Desi Tadka Image Optimization Pipeline (600x400 WebP)    ${NC}"
echo -e "${BLUE}================================================================${NC}"

# Ensure output directory exists
mkdir -p "$OUTPUT_DIR"
mkdir -p "$RAW_DIR"

# Detect conversion tools (cwebp or ImageMagick)
HAS_CWEBP=false
HAS_MAGICK=false

if command -v cwebp &> /dev/null; then
    HAS_CWEBP=true
    echo -e "${GREEN}✓ Found cwebp tool${NC}"
fi

if command -v magick &> /dev/null; then
    HAS_MAGICK=true
    MAGICK_CMD="magick"
    echo -e "${GREEN}✓ Found ImageMagick (magick)${NC}"
elif command -v convert &> /dev/null; then
    HAS_MAGICK=true
    MAGICK_CMD="convert"
    echo -e "${GREEN}✓ Found ImageMagick (convert)${NC}"
fi

if [ "$HAS_CWEBP" = false ] && [ "$HAS_MAGICK" = false ]; then
    echo -e "${RED}Error: Neither 'cwebp' nor 'ImageMagick' is installed.${NC}"
    echo -e "Please install either:"
    echo -e "  Ubuntu/Debian: sudo apt-get install -y webp imagemagick"
    echo -e "  macOS:         brew install webp imagemagick"
    echo -e "  Windows:       winget install Google.WebP or winget install ImageMagick.ImageMagick"
    exit 1
fi

COUNT=0
TOTAL_SAVED=0

shopt -s nullglob
RAW_FILES=("$RAW_DIR"/*.jpg "$RAW_DIR"/*.jpeg "$RAW_DIR"/*.png "$RAW_DIR"/*.webp "$RAW_DIR"/*.JPG "$RAW_DIR"/*.PNG)

if [ ${#RAW_FILES[@]} -eq 0 ]; then
    echo -e "${YELLOW}Notice: No raw images found in ${RAW_DIR}.${NC}"
    echo -e "Please place raw JPG/PNG photos in '${RAW_DIR}' with names like 'butter-chicken.jpg'."
    echo -e "Refer to 'app/images/README.md' for the complete filename list."
    exit 0
fi

echo -e "Processing ${#RAW_FILES[@]} raw image(s)...\n"

for input_file in "${RAW_FILES[@]}"; do
    filename=$(basename -- "$input_file")
    slug="${filename%.*}"
    # Normalize slug to lowercase
    slug=$(echo "$slug" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')
    output_file="${OUTPUT_DIR}/${slug}.webp"

    echo -ne "Optimizing ${filename} -> ${slug}.webp ... "

    if [ "$HAS_MAGICK" = true ]; then
        # ImageMagick: Resize and crop to 600x400 exact aspect ratio, quality 80
        "$MAGICK_CMD" "$input_file" \
            -resize 600x400^ \
            -gravity center \
            -extent 600x400 \
            -quality 80 \
            -define webp:method=6 \
            "$output_file"
    elif [ "$HAS_CWEBP" = true ]; then
        # cwebp with resize
        cwebp -q 80 -resize 600 400 "$input_file" -o "$output_file" -quiet
    fi

    # Check file size
    if [ -f "$output_file" ]; then
        # Size in KB
        if [[ "$OSTYPE" == "darwin"* ]]; then
            size_bytes=$(stat -f%z "$output_file")
        else
            size_bytes=$(stat -c%s "$output_file" 2>/dev/null || wc -c < "$output_file")
        fi
        size_kb=$(( (size_bytes + 1023) / 1024 ))

        if [ "$size_kb" -le "$MAX_SIZE_KB" ]; then
            echo -e "${GREEN}DONE (${size_kb} KB)${NC}"
        else
            echo -e "${YELLOW}DONE (${size_kb} KB - consider higher compression)${NC}"
        fi
        COUNT=$((COUNT + 1))
    else
        echo -e "${RED}FAILED${NC}"
    fi
done

echo -e "\n${GREEN}Successfully optimized ${COUNT} images into ${OUTPUT_DIR}.${NC}"
