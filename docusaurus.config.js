import autoprefixer from "autoprefixer";
import katex from "rehype-katex";
import math from "remark-math";
import tailwind from "tailwindcss";

const internetProfiles = {
  linkedin: {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/behitek/",
  },
  github: {
    label: "GitHub",
    href: "https://github.com/behitek",
  },
  twitter: {
    label: "Twitter",
    href: "https://twitter.com/behitek_",
  },
  email: {
    label: "Email",
    href: "mailto:hello@behitek.com",
  },
  blog: {
    label: "Blog",
    to: "blog",
  },
  docs: {
    label: "Tutorials",
    to: "docs",
  },
  projects: {
    label: "Projects",
    to: "projects",
  },
  resume: {
    label: "Resume",
    href: "https://behitek.com/pdf/resume.pdf",
  },
  lcoj: {
    label: "Luyện Code (LCOJ)",
    href: "https://luyencode.net",
  },
};

module.exports = {
  title: "Behitek",
  tagline:
    "A drop in the AI ocean",
  url: "https://behitek.com",
  baseUrl: "/",
  onBrokenLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "behitek",
  projectName: "behitek.github.io",
  themeConfig: {
    colorMode: {
      defaultMode: "dark",
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      hideOnScroll: true,
      title: "Behitek",
      logo: {
        alt: "Behitek",
        src: "img/logo.png",
        target: "_self",
      },
      items: [
        {
          to: "docs/",
          activeBasePath: "docs",
          label: "Tutorials",
          position: "right",
        },
        { to: "blog/", label: "Blog", position: "right" },
        { to: "projects/", label: "Projects", position: "right" },
        {
          href: "https://behitek.com/pdf/resume.pdf",
          label: "Resume",
          position: "right",
        },
      ],
    },
    footer: {
      links: [
        {
          title: "Connect",
          items: [
            internetProfiles.linkedin,
            internetProfiles.github,
            internetProfiles.twitter,
            internetProfiles.email,
          ],
        },
        {
          title: "Discover",
          items: [
            internetProfiles.blog,
            internetProfiles.docs,
            internetProfiles.projects,
            internetProfiles.resume,
          ],
        },
        {
          title: "Products",
          items: [
            internetProfiles.lcoj,
          ],
        },
      ],
      // Please adjust the following to your needs
      copyright: `Powered by <a href="https://behitek.com">Docusaurus</a> • Last updated on <a href="https://github.com/behitek/behitek.github.io/commits/main/">${new Date().toLocaleDateString("en-SG")}</a>`,
    },
    algolia: {
      appId: 'WHUI4DPU2B',
      apiKey: '8040908c4adfc070dff77bb85b621ea7',
      indexName: 'behitek',
      // TODO, fix not working if contextualSearch is true
      // https://docusaurus.io/docs/search#using-algolia-docsearch
      contextualSearch: false,
    }
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          disableVersioning: false,
          editCurrentVersion: false,
          remarkPlugins: [math],
          rehypePlugins: [katex],
          // editUrl: "https://github.com/behitek/behitek.github.io/tree/main/",
        },
        blog: {
          showReadingTime: true,
          remarkPlugins: [math],
          rehypePlugins: [katex],
          // Please change this to your repo.
          // editUrl: "https://github.com/behitek/behitek.github.io/tree/main/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],
  plugins: [
    async function tailwindPlugin(context, options) {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
          postcssOptions.plugins.push(tailwind);
          postcssOptions.plugins.push(autoprefixer);
          return postcssOptions;
        },
      };
    },
    [
      '@docusaurus/plugin-google-tag-manager',
      {
        containerId: 'G-Q2VZMYFCJH',
      },
    ],
  ],
};
