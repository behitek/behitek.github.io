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
    href: "mailto:hieunv.dev@gmail.com",
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
  onBrokenLinks: "throw",
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
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl: "https://github.com/DigiPie/kaya-folio/tree/main/website/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
  stylesheets: [
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X",
      crossorigin: "anonymous",
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
  ],
};
