import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import { resolve } from 'path';
import fg from 'fast-glob';
import copy from 'rollup-plugin-copy';

const folder = {
    src: 'src/', // source files
    src_assets: 'src/assets/', // source assets files
    dist: 'dist/', // build files
    dist_assets: 'dist/assets/' // build assets files
};

export default defineConfig({
    base: '',
    clearScreen: true,
    root: resolve(__dirname, folder.src),
    publicDir: 'dist',
    server: {
        port: 8080,
        hot: true,
        open: true,
    },
    plugins: [
        handlebars({
            partialDirectory: resolve(__dirname, folder.src+"partials"),
        }),
    ],
    build: {
        outDir: '../dist', // Consistent output directory path
        emptyOutDir: false,
        rollupOptions: {
            input: {
                style: folder.src_assets + 'scss/style.scss',
                ...getHtmlFiles(),
            },
            output: {
                assetFileNames: (assetInfo) => {
                    const extension = assetInfo.name.split('.').pop().toLowerCase();
                    switch (extension) {
                        case 'css':
                            return `assets/css/[name].css`;
                        case 'png':
                        case 'jpg':
                        case 'jpeg':
                        case 'svg':
                        case 'gif':
                        case 'tiff':
                        case 'bmp':
                        case 'ico':
                            return `assets/images/${assetInfo.name}`;
                        default:
                            return `assets/misc/${assetInfo.name}`;
                    }
                },
                entryFileNames: `assets/js/[name].js`,
            },
            plugins: [
                copy({
                    targets: [
                        { src: folder.src_assets + 'images', dest: folder.dist_assets },
                        { src: folder.src_assets + 'js', dest: folder.dist_assets },
                    ],
                }),
                {
                    name: 'copy-plugin-files',
                    apply: 'build',
                    enforce: 'post',
                    transform(code, id) {
                        if (/node_modules\/(.*)\/(.*)/.test(id)) {
                            const [_, pluginName, directory] = id.match(/node_modules\/(.*)\/(.*)/);
                            const allowedPlugins = ['fg-emoji-picker'];
                            if (allowedPlugins.includes(pluginName)) {
                                const destDir = resolve(__dirname, `libs/${pluginName}/${directory}`);
                                return {
                                    code: '',
                                    id: resolve(destDir, id.split('/').pop()),
                                };
                            }
                        }
                        return;
                    },
                },
            ],
        },
    },
});

async function getHtmlFiles() {
    const entries = {};
    const htmlFiles = await fg('src/**/*.html');
    htmlFiles.forEach((file) => {
        const name = file.replace('src/', '').replace('.html', '');
        entries[name] = file;
    });
    return entries;
}
