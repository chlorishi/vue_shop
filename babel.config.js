module.exports = {
    presets: [
        '@vue/cli-plugin-babel/preset'
    ],
    plugins: [
            [
                'component',
                {
                    libraryName: 'element-ui',
                    styleLibraryName: 'theme-chalk'
                }
            ],
            //配置路由懒加载插件
            "@babel/plugin-syntax-dynamic-import"
        ]
        // eslint-disable-next-line eol-last
}