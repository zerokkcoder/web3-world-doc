import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'
import Image from 'next/image'

const config: DocsThemeConfig = {
  logo: (
    <>
      <Image style={{ borderRadius: 50 }} src="/logo.jpg" alt="logo" width={36} height={36} />
      <span style={{ marginLeft: '.4em', fontWeight: 800 }}>Zerodot618's Web3 Docs</span>
    </>
  ),
  project: {
    link: 'https://github.com/zerodot618/web3-world-doc',
  },
  docsRepositoryBase: 'https://github.com/zerodot618/web3-world-doc',
  footer: {
    text: <span>&copy; 2022 ZeroDot618. All right reserved.</span>,
  },
}

export default config
