import { defineConfig } from 'vitepress'
import obsidian from 'markdown-it-obsidian'
import wikilinks from '@gardeners/markdown-it-wikilinks'
// import wikilinks from 'markdown-it-wikilinks'
import fs from 'fs'
import path from 'path'
import { BiDirectionalLinks } from '@nolebase/markdown-it-bi-directional-links'

const baseUrl = '/vitepress-obsidian/'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Vitepress Obsidian",
  description: "A VitePress Site",
  base: baseUrl,
  lastUpdated: true,
  markdown: {
    breaks: true,
    config(md) {
      md.use(BiDirectionalLinks())
      // md.use(wikilinks({
      //   // relativeBaseURL: baseUrl,
      //   // makeAllLinksAbsolute: true,
      //   imagePattern: /!\[\[([^]+?)\]\]/,
      //   assetPrefix: "/assets/",
      // }))
      // md.use(obsidian())
      // md.use(obsidian({
      //   baseURL: baseUrl,
      //   relativeBaseURL: `.${baseUrl}`,
      // }))
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' },
          {
            text: 'notes',
            collapsed: false,
            items: getSidebarItems('notes')
          },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})

function getSidebarItems(dir: string) {
  return fs.readdirSync(dir)
    .filter(file => !file.startsWith('.'))
    .map(file => {
      const filePath = path.join(dir, file)
      if (fs.statSync(filePath).isDirectory()) {
        return {
          text: file,
          collapsed: true,
          items: getSidebarItems(filePath)
        }
      }
      else if (/\.md$/.test(file)) {
        return {
          text: file.replace(/\.md$/, ''),
          link: `/${filePath.replace(/\.md$/, '')}`
        }
      }
    })
}