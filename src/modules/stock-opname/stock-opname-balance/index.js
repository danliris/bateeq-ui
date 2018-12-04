export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'check-balance'], moduleId: './check-balance', name: 'check-balance', nav: false, title: 'Check-Balance: Stock Opname Balance' }
        ]);

        this.router = router;
    }
}