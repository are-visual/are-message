import { defineConfig } from 'dumi'

const ENV = process.env.NODE_ENV
const prefix = '/are-message/docs-dist/'
const isProduction = ENV === 'production'

export default defineConfig({
  title: 'are-message',
  favicon: isProduction
    ? `${prefix}/images/favicon.ico`
    : '/images/favicon.ico',
  logo: isProduction
    ? `${prefix}/images/are-visual.svg`
    : '/images/are-visual.svg',
  publicPath: isProduction ? prefix : '/',
  outputPath: 'docs-dist',
  hash: true,
  history: { type: 'hash' },
  styles: [
    `
      body {
        font-family: -apple-system,BlinkMacSystemFont,"Helvetica Neue","Helvetica","Arial","PingFang SC","Hiragino Sans GB","Heiti SC","Microsoft YaHei","WenQuanYi Micro Hei",sans-serif !important;
      }
      .are-message {
        z-index: 1000;
      }
    `,
  ],
})
