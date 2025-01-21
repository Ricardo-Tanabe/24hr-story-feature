# 24hr Story Feature
Será criado um recurso similar ao "Story" encontrado nas plataformas de mídia social como Instagram e Whatsapp. O objetivo é permitir um usuário postar "short", conteúdo efêmero que desaparece após 24 horas. Considerando que esse é um projeto Frontend, vai funcionar apenas no lado do cliente.

Link para o [Projeto 24hr Story Feature](https://roadmap.sh/projects/stories-feature)

## Requisitos
 - No topo deve haver um botão de adicionar Story's e espaço para adicionar os demais elementos.
 - Clicando no botão de adicionar é permitido realizar upload de uma imagem que vai ser convertido para base64 e armazenada em local storage.
 - As imagens serão apresentadas em uma lista de stories.
 - A imagem vai ser removida após 24 horas. 
 - O usuário deve opcionalmente ser capazes de delizar pelas stories.

## Restrições
 - Pode usar qualquer framework frontend em sua construção.
 - Livre para usar qualquer biblioteca ou ferramenta.
 - O projeto deve ser feito apenas no client-side.
 - O projeto deve ser responsivo.
 - As dimensões das imagens não devem ultrapassar 1080px x 1920px

## Ferramentas utilizadas no desenvolvimento

- HTML
- [Tailwind CSS](https://tailwindcss.com/): Framework
- [Typescript](https://www.typescriptlang.org/)
- [React](https://react.dev/)
    - Framework: [Nextjs](https://nextjs.org/)
    - Servidor: [Descrito abaixo](#getting-started)
- [VS Code Studio](https://code.visualstudio.com/)

___

## Next.js default README.md

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

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
