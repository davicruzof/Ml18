plugins: [
    [
        'module-resolver',
        {
            root: ['./src'],
            extensions: ['.ts', '.tsx', '.jsx', '.js', '.json'],
            alias: {
                "@utils": "src/utils",
                "@services": "src/services",
                "@pages": "src/pages",
                "@components": "src/components",
                "@assets": "src/assets"
            }
        }
    ]
]