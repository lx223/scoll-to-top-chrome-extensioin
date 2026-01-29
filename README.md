# Chrome Extension - Scroll to Top
a Chrome extension that scrolls a page to its top

If you have any suggestions or find any problems using the extension, please [submit a bug or a feature request](https://github.com/lx223/scoll-to-top-chrome-extensioin/issues).

### Installation

1. **[Download ZIP](https://github.com/lx223/scoll-to-top-chrome-extensioin/tree/master/build/zip)** and unarchive to wherever you prefer
2. Using **Google Chrome** browser, navigate to **chrome://extensions/** and enable "Developer mode" in the top right corner
3. Click on the <kbd>Load unpacked extension...</kbd> button, browse to the unarchived directory of the downloaded release and confirm

Or

You can download from **[Chrome extention store](https://chrome.google.com/webstore/detail/scroll-to-top/hhoboiondmldfnjfegfahmbdodjpkhab)** and enjoy auto-updating with each new version.

### Development

Build with [Vite](https://vitejs.dev/):

```bash
npm install
npm run build
```

This produces `dist/` (load as unpacked extension from there), and `build/zip/scroll-to-top.zip`. To also create a signed `.crx`, add a `key.pem` in the project root and run `npm run build` again (requires [crx3](https://www.npmjs.com/package/crx3), Node 22+ for .crx).

### License

This work is licensed under a GNU GENERAL PUBLIC LICENSE (v2)
