module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    parserOptions: {
        parser: 'babel-eslint'
    },
    rules: {
        // allow async-await
        'generator-star-spacing': 'off',
        // allow debugger during development
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        // js语句结尾必须使用分号
        semi: ['off', 'always'],
        // 三等号
        eqeqeq: 0,
        // 强制在注释中 // 或 /* 使用一致的空格
        'spaced-comment': 0,
        // 关键字后面使用一致的空格
        'keyword-spacing': 0,
        // 强制在 function的左括号之前使用一致的空格
        'space-before-function-paren': 0,
        // 引号类型
        quotes: [0, "single"],
        // 禁止出现未使用过的变量
        'no-unused-vars': 0,
        // 要求或禁止末尾逗号
        'comma-dangle': 0,
        // 严格的检查缩进问题
        indent: 0,
        //引入模块没有放入顶部
        "import/first": 0,
        //前面缺少空格，Missing space before
        "arrow-spacing": 0,
        //后面没有空位，There should be no space after this paren
        "space-in-parens": 0,
        //已定义但是没有使用，'scope' is defined but never used
        "vue/no-unused-vars": 0

    }
}
