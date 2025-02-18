import { defineConfig } from 'vitepress'
import obsidian from 'markdown-it-obsidian'
import fs from 'fs'
import path from 'path'

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
      md.use(obsidian({
        baseUrl,
      }))
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

      // vitepress base setting seems to be only for .md files
      // for other file types (like .png), we need to set the base path manually
      const basePath = /\.md$/.test(file) ? '/' : baseUrl
      return {
        text: file.replace(/\.md$/, ''),
        link: `${basePath}${filePath.replace(/\.md$/, '')}`
      }
    })
}