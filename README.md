This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Hydrological Modeling and Data Integration Workflow

This project integrates real hydrological modeling results using the HEC-HMS software and Google Colab for advanced analysis and data processing. Here is the workflow:

1. **Model Changes in HEC-HMS:**
   - The hydrological model was set up and modified in [HEC-HMS](https://www.hec.usace.army.mil/software/hec-hms/), a widely used tool for simulating the precipitation-runoff processes of dendritic watershed systems.
   - Model parameters and configurations were updated to reflect the latest catchment and rainfall data for the study area.

2. **Running Results in Google Colab:**
   - The HEC-HMS model was executed, and the results (such as hydrographs, time series, and summary tables) were exported.
   - These results were then uploaded and processed in [Google Colab](https://colab.research.google.com/), allowing for flexible, cloud-based data manipulation and conversion.
   - In Colab, the raw HEC-HMS outputs were converted into formats suitable for further analysis and visualization (e.g., CSV, JSON).

3. **Integration into This Platform:**
   - The processed and converted data from Colab was imported into this Next.js platform.
   - The platform now displays and visualizes the hydrological results in a user-friendly, readable format, making it accessible for further interpretation and decision-making.

**This workflow ensures that the hydrological modeling is transparent, reproducible, and that the results are easily accessible and understandable within this web application.**

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
