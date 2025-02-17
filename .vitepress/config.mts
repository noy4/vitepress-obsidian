import { defineConfig } from 'vitepress'
import obsidian from 'markdown-it-obsidian'
import fs from 'fs'
import path from 'path'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Vitepress Obsidian",
  description: "A VitePress Site",
  lastUpdated: true,
  markdown: {
    breaks: true,
    config(md) {
      md.use(obsidian())
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
      return {
        text: file.replace(/\.md$/, ''),
        link: `/${filePath.replace(/\.md$/, '')}`
      }
    })
}