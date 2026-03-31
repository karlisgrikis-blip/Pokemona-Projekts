# PokéDex — React + TypeScript
## 📁 Projekta struktūra

```
src/
├── features/
│   ├── catalog/           # Pokémonu saraksts
│   │   ├── api.ts         # Axios pieprasījumi
│   │   ├── types.ts       # TypeScript interfeisi
│   │   ├── useCatalog.ts  # Biznesa loģika (hook)
│   │   ├── CatalogPage.tsx
│   │   ├── FilterBar.tsx
│   │   └── PokemonCard.tsx
│   └── pokemon-detail/    # Detaļu skats
│       ├── api.ts
│       ├── types.ts
│       ├── DetailModal.tsx
│       └── StatBar.tsx
├── types/
│   └── index.ts           # Globālie TypeScript tipi
├── App.tsx                # Globālais stāvoklis
├── main.tsx
└── index.css
```

## ⚙️ Uzstādīšana

```bash
npm install
npm run dev
```

Atver [http://localhost:5173](http://localhost:5173)

## 🏗️ Build

```bash
npm run build
```

## ✨ Funkcionalitāte

- 📋 **Katalogs** — 120+ Pokémoni ar attēliem
- 🔍 **Meklēšana** — pēc nosaukuma vai numura
- 🏷️ **Filtrēšana** — pēc tipa (18 tipi)
- ↕️ **Kārtošana** — pēc ID vai nosaukuma
- 📊 **Statistika** — HP, ATK, DEF, SPD u.c. ar vizuāliem stieņiem
- ✨ **Shiny** — iespēja apskatīt shiny versiju
- 📱 **Responsīvs** — darbojas uz mobilajām ierīcēm un galddatoriem

## 🌐 API

[PokéAPI](https://pokeapi.co/) — bezmaksas, bez API atslēgas
