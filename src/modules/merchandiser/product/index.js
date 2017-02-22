export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Products' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Product' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Product' },
            { route: 'upload', moduleId: './upload', name: 'upload', nav: false, title: 'Upload: Product' },
            { route: 'upload-image', moduleId: './upload-image', name: 'upload-image', nav: false, title: 'UploadImage: Product' }
        ]);
    }
}