module.exports = {
    plugins: [
        ['effector-logger/babel-plugin', {skipEffectorPlugin: true, inspector: true}],
        ['effector/babel-plugin', {reactSsr: true,}],
    ],
}
