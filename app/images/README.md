# Desi Tadka — Dish Image Asset Catalog & Specifications

This directory contains the image assets for the **Desi Tadka: Restaurant Menu & Order Visualizer** web application.

---

## 1. Directory Structure

```text
app/images/
├── placeholder.svg             # Default vector fallback banner (600x400)
├── README.md                   # This catalog and workflow documentation
├── raw/                        # High-resolution original photos (JPG/PNG) — .gitignored!
└── dishes/                     # Production-optimized WebP files (600x400 px, < 80 KB)
    ├── paneer-tikka.webp
    ├── veg-samosa.webp
    ├── chicken-65.webp
    ├── hara-bhara-kebab.webp
    ├── fish-amritsari.webp
    ├── butter-chicken.webp
    ├── palak-paneer.webp
    ├── dal-makhani.webp
    ├── chole-masala.webp
    ├── hyderabadi-chicken-biryani.webp
    ├── veg-biryani.webp
    ├── mutton-rogan-josh.webp
    ├── chettinad-chicken.webp
    ├── butter-naan.webp
    ├── garlic-naan.webp
    ├── tandoori-roti.webp
    ├── jeera-rice.webp
    ├── masala-dosa.webp
    ├── gulab-jamun.webp
    ├── rasmalai.webp
    ├── gajar-halwa.webp
    ├── kulfi.webp
    ├── masala-chai.webp
    ├── sweet-lassi.webp
    ├── mango-lassi.webp
    ├── filter-coffee.webp
    └── jaljeera.webp
```

---

## 2. Technical Specifications

| Parameter | Production Standard |
| :--- | :--- |
| **File Format** | Google WebP (`.webp`) |
| **Dimensions** | Fixed **600 × 400 pixels** (Aspect Ratio 3:2) |
| **Target Size** | **Under 80 KB** per image (typical 30–65 KB) |
| **HTML Loading** | `loading="lazy"` and `decoding="async"` |
| **CSS Rendering** | `object-fit: cover; aspect-ratio: 3 / 2;` (prevents CLS layout shift) |
| **Fallback** | Inline JS `onerror` switches to rich saffron-tinted emoji avatar |

---

## 3. Dish Image Mapping Table

| Dish Name | Category | Required WebP Filename | Expected Alt Text |
| :--- | :--- | :--- | :--- |
| Paneer Tikka | Starters | `paneer-tikka.webp` | Skewered cottage cheese cubes charred in a clay tandoor with capsicum and onions |
| Veg Samosa | Starters | `veg-samosa.webp` | Two golden crispy pastry cones filled with spiced potatoes and peas |
| Chicken 65 | Starters | `chicken-65.webp` | Fiery red deep-fried chicken bites garnished with fried curry leaves and split green chilies |
| Hara Bhara Kebab | Starters | `hara-bhara-kebab.webp` | Pan-seared spinach and green pea patties crowned with half a cashew nut |
| Fish Amritsari | Starters | `fish-amritsari.webp` | Golden batter-fried river sole fish fillets dusted with chaat masala |
| Butter Chicken | Mains | `butter-chicken.webp` | Rich orange creamy tomato gravy with charred tandoori chicken pieces and butter swirl |
| Palak Paneer | Mains | `palak-paneer.webp` | Vibrant emerald green spinach gravy with soft cottage cheese cubes |
| Dal Makhani | Mains | `dal-makhani.webp` | Slow-cooked black lentils in creamy tomato gravy with a dollop of white butter |
| Chole Masala | Mains | `chole-masala.webp` | Dark spiced chickpea curry garnished with ginger juliennes and fresh coriander |
| Hyderabadi Chicken Biryani | Mains | `hyderabadi-chicken-biryani.webp` | Fragrant layered basmati rice with marinated chicken pieces, caramelized onions, and saffron |
| Veg Dum Biryani | Mains | `veg-biryani.webp` | Basmati rice cooked in a sealed pot with assorted vegetables, paneer, and whole spices |
| Mutton Rogan Josh | Mains | `mutton-rogan-josh.webp` | Deep red Kashmiri mutton curry with bone-in tender meat in fragrant thin gravy |
| Chettinad Chicken | Mains | `chettinad-chicken.webp` | Dark rustic South Indian chicken curry loaded with freshly roasted peppercorns and curry leaves |
| Butter Naan | Breads & Rice | `butter-naan.webp` | Tear-drop shaped tandoor-baked flatbread glazed with melted yellow butter |
| Garlic Naan | Breads & Rice | `garlic-naan.webp` | Pillowy tandoor naan topped with minced roasted garlic, butter, and green coriander |
| Tandoori Roti | Breads & Rice | `tandoori-roti.webp` | Whole wheat circular flatbread with charred spots from the clay oven |
| Jeera Rice | Breads & Rice | `jeera-rice.webp` | Long-grain white basmati rice tossed with cracked cumin seeds and coriander |
| Masala Dosa | Breads & Rice | `masala-dosa.webp` | Crispy golden crepe rolled over spiced mashed potato filling served with coconut chutney and sambar |
| Gulab Jamun | Desserts | `gulab-jamun.webp` | Warm golden-brown milk dumplings immersed in fragrant sugar syrup with pistachio garnish |
| Rasmalai | Desserts | `rasmalai.webp` | Spongy white cottage cheese patties floating in chilled saffron-pistachio thickened milk |
| Gajar Halwa | Desserts | `gajar-halwa.webp` | Warm vibrant orange grated carrot pudding garnished with roasted cashews and raisins |
| Royal Malai Kulfi | Desserts | `kulfi.webp` | Traditional dense Indian ice cream stick on a terracotta plate topped with chopped almonds and saffron threads |
| Masala Chai | Drinks | `masala-chai.webp` | Steaming hot Indian tea served in a traditional clay kulhad |
| Sweet Punjabi Lassi | Drinks | `sweet-lassi.webp` | Frothy churned sweet yoghurt in a tall glass topped with a layer of thick cream |
| Mango Lassi | Drinks | `mango-lassi.webp` | Creamy golden-yellow mango yoghurt smoothie with crushed pistachio topping |
| South Indian Filter Coffee | Drinks | `filter-coffee.webp` | Foamy aromatic South Indian filter coffee in a brass dabarah and tumbler set |
| Chilled Jaljeera | Drinks | `jaljeera.webp` | Iced tangy green cumin cooler served with floating crisp boondi and mint sprig |

---

## 4. Free Stock Photo Sources

When gathering high-resolution authentic photos, use royalty-free licenses:
- **Unsplash**: [unsplash.com/s/photos/indian-food](https://unsplash.com/s/photos/indian-food)
- **Pexels**: [pexels.com/search/indian%20cuisine/](https://pexels.com/search/indian%20cuisine/)
- **Freepik**: [freepik.com/search?format=search&query=indian+dishes](https://www.freepik.com/)
- **Wikimedia Commons**: High-quality public domain Indian culinary captures.

Save the downloaded raw files in `app/images/raw/` matching the dish slug (e.g. `butter-chicken.jpg`).

---

## 5. Automated Optimization Workflow

Run the automated image conversion script to resize to 600×400 and encode to WebP:

```bash
chmod +x scripts/optimize-images.sh
./scripts/optimize-images.sh
```
