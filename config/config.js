export default {
    singular: true,
    plugins: [
        ['umi-plugin-react', {
            antd: true,
            dva: true,
            locale: {
                enable: true,
            },
        }],
    ],
    routes: [{
        path: '/',
        component: '../layout',
        routes: [
            { path: '/puzzlecards', component: './puzzlecards' },
            { path: '/list', component: './list/index' },
            { path: '/process', component: './process/index' },
            {
                path: '/',
                component: 'Helloworld',
            },
            {
                path: '/helloworld',
                component: 'Helloworld'
            },
            {
                path: '/dashboard',
                routes: [
                    { path: '/dashboard/analysis', component: 'Dashboard/Analysis' },
                    { path: '/dashboard/monitor', component: 'Dashboard/Monitor' },
                    { path: '/dashboard/workplace', component: 'Dashboard/Workplace' },

                ]
            },
        ]
    }],
    proxy:{

        '/api':{
            target:'http://localhost:8085',
            changeOrigin: true,
            "pathRewrite": {
                "/api": "/"
            }
        },
    }
};