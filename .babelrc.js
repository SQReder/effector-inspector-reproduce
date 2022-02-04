module.exports = {
    plugins: [
        ['effector-logger/babel-plugin', {skipEffectorPlugin: true, inspector: false}],
        ['effector/babel-plugin', {reactSsr: true,}],
    ],
}
