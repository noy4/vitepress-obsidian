import { defineConfig } from 'vitepress'
import obsidian from 'markdown-it-obsidian'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Vitepress Obsidian",
  description: "A VitePress Site",
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
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
