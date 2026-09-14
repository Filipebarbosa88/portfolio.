# Filipe Barbosa — portfólio

Nova apresentação em React, TypeScript e Vite. Interface em tons de azul acinzentado, apresentação pessoal, três páginas de projeto e 15 screenshots originais.

## Executar

Use Node.js 22.12 ou superior.

```bash
npm ci
npm run dev
```

## Gerar a versão de produção

```bash
npm run build
npm run preview
```

O build verifica os tipos, gera os arquivos estáticos e pré-renderiza as páginas. A pasta `dist` contém a página inicial, cada case e a página 404. O conteúdo dos cases está presente no HTML antes da execução do JavaScript.

## Conteúdo

- `src/content/projects.ts`: textos, tecnologias e links dos três projetos.
- `src/content/screenshots.ts`: imagens, textos alternativos, legendas e enquadramento.
- `src/content/profile.ts`: contato e links profissionais.
- `src/App.tsx`: páginas, navegação, galeria e contato.
- `src/styles.css`: identidade visual, responsividade, impressão e movimento reduzido.
- `public/images`: prints originais selecionados, preservados sem modificações.

As barras do navegador e do Windows são recortadas apenas na apresentação por CSS. As imagens não foram redesenhadas. A galeria permite ampliação, navegação por setas, fechamento com Escape e retorno de foco ao botão de origem.

## Dados que faltam para a publicação pública

- Informar os repositórios públicos dos cases, se houver. Não há URLs de repositório inventadas.
- Confirmar a stack do Sidnei Consórcios: os prints mostram a interface, mas não identificam as tecnologias. A seção técnica desse case não atribui um framework sem evidência.
- Definir o domínio definitivo em `siteUrl`.
- Na publicação pública, substituir `noindex, nofollow` no HTML por `index, follow` e liberar o rastreamento em `public/robots.txt`.

Campos de perfil não preenchidos ficam ocultos. O site não contém formulários que simulam envio. O contato por e-mail abre o aplicativo de e-mail do visitante.

## Links dos projetos

Os endereços foram transcritos das barras do navegador nos screenshots. O site Sidnei Consórcios também foi consultado publicamente. Os sistemas ALIMENTA e Groove têm tela de acesso; nenhuma credencial de demonstração é publicada.

- ALIMENTA: https://sistemalimenta.netlify.app
- Portal Groove Harmonia: https://groove-harmonia-app.web.app
- Sidnei Consórcios: https://sidneiconsorcios.com

## Seleção das imagens

Foram escolhidas cinco telas do ALIMENTA, seis do Portal Groove Harmonia e quatro de Sidnei Consórcios. Duplicatas e telas contendo contatos ou listagens nominativas de terceiros não foram incluídas. Os números visíveis nos prints representam o momento da captura, não métricas de resultado do projeto.

## Hospedagem

O projeto está preparado como site estático. A versão inicial de revisão é privada. Um domínio próprio e a disponibilização pública são etapas posteriores.

Em outra hospedagem, publique `dist`. Configure diretórios com `index.html` e `404.html` como documento de erro; cada rota de case possui seu próprio HTML. Nunca publique `node_modules`, arquivos de ambiente ou credenciais de administração.

## Verificação desta entrega

- TypeScript e build de produção concluídos.
- Rotas pré-renderizadas e referências locais de imagens verificadas.
- Layout responsivo implementado para celular, tablet e desktop.
- Teste visual em navegador ainda não realizado.
