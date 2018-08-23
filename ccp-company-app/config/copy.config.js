module.exports = {
    copyFroalaEditorCss: {
        src: '{{ROOT}}/node_modules/froala-editor/css/froala_editor.pkgd.min.css',
        dest: '{{WWW}}/assets/css/'
    },
    copyFontAwesome: {
        src: '{{ROOT}}/node_modules/font-awesome/css/font-awesome.min.css',
        dest: '{{WWW}}/assets/css/'
    },
    copyFontsAwesomeFonts: {
        src: 'node_modules/font-awesome/fonts/*',
        dest: '{{WWW}}/fonts/'
    },
    copyAssets: {    //<-------- this should be last.
        src: ['{{SRC}}/assets/**/*'],
        dest: '{{WWW}}/assets'
    }
}