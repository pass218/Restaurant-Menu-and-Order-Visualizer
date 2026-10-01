import json
import os
from PIL import Image, ImageDraw, ImageFont

def generate_dishes():
    menu_path = os.path.join(os.path.dirname(__file__), '..', 'app', 'menu.json')
    with open(menu_path, 'r', encoding='utf-8') as f:
        dishes = json.load(f)

    dishes_dir = os.path.join(os.path.dirname(__file__), '..', 'app', 'images', 'dishes')
    raw_dir = os.path.join(os.path.dirname(__file__), '..', 'app', 'images', 'raw')
    os.makedirs(dishes_dir, exist_ok=True)
    os.makedirs(raw_dir, exist_ok=True)

    palettes = [
        ((128, 0, 32), (230, 81, 0)),
        ((74, 14, 23), (180, 50, 20)),
        ((153, 27, 27), (217, 119, 6)),
        ((120, 53, 15), (202, 138, 4)),
        ((67, 20, 7), (194, 65, 12))
    ]

    for i, dish in enumerate(dishes):
        img_name = os.path.basename(dish['image'])
        out_path = os.path.join(dishes_dir, img_name)
        img = Image.new('RGB', (600, 400), color=(128, 0, 32))
        draw = ImageDraw.Draw(img)
        c1, c2 = palettes[i % len(palettes)]

        for y in range(400):
            factor = y / 400.0
            r = int(c1[0] + (c2[0] - c1[0]) * factor)
            g = int(c1[1] + (c2[1] - c1[1]) * factor)
            b = int(c1[2] + (c2[2] - c1[2]) * factor)
            draw.line([(0, y), (600, y)], fill=(r, g, b))

        # Circular decorative glow
        draw.ellipse([(180, 50), (420, 290)], outline=(255, 183, 77), width=2)
        draw.rectangle([(20, 20), (580, 380)], outline=(255, 183, 77), width=2)
        draw.rectangle([(26, 26), (574, 374)], outline=(255, 213, 79), width=1)

        # Labels
        draw.text((300, 160), dish['name'], fill=(255, 253, 247), anchor='mm')
        draw.text((300, 195), f"{dish['category']}  |  INR {dish['price']}", fill=(255, 204, 128), anchor='mm')
        draw.text((300, 225), f"Desi Tadka  |  {dish['spice']} Spice", fill=(255, 224, 178), anchor='mm')

        img.save(out_path, 'WEBP', quality=80)
        file_size_kb = os.path.getsize(out_path) / 1024
        print(f"Generated {img_name}: {file_size_kb:.1f} KB")

    print(f"Successfully generated {len(dishes)} WebP images in app/images/dishes/")

if __name__ == '__main__':
    generate_dishes()
