module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  //引入提示框
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]
}
