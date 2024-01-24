module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3080', // Ändere die Zieladresse auf localhost:3080
        changeOrigin: true,
        pathRewrite: {
          '^/api': '', // Ändere den Pfad, wenn nötig
        },
      },
    },
  },
};
