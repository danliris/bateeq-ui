import { inject, bindable, BindingEngine } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service, BindingEngine, Element)
export class DataForm {
    @bindable data = {};
    @bindable error = {};

    constructor(router, service, bindingEngine, element) {
        this.router = router;
        this.service = service;
        this.element = element;
        this.bindingEngine = bindingEngine;
        this.service.getModuleConfig()
            .then(config => {
                var getStorages = [];
                var indexSource = 0;

                if (config.source.type == "selection") {
                    for (var sourceId of config.source.value) {
                        getStorages.push(this.service.getStorageById(sourceId.toString()));
                        indexSource++;
                    }
                }
                else {
                    getStorages.push(this.service.getStorageById(config.source.value.toString()));
                    indexSource++;
                }

                var getStoragesDestination = [];
                if (config.destination.type == "selection") {
                    for (var destinationId of config.destination.value) {
                        getStorages.push(this.service.getStorageById(destinationId.toString()));
                    }
                }
                else {
                    getStorages.push(this.service.getStorageById(config.destination.value.toString()));
                }

                Promise.all(getStorages)
                    .then(storages => {
                        this.sources = storages.splice(0, storages.length - indexSource);
                        this.destinations = storages.splice(0);
                        this.data.sourceId = this.sources[0]._id;
                        this.data.source = this.sources[0];
                        this.data.destinationId = this.destinations[0]._id;
                        this.data.destination = this.destinations[0];

                        for (var item of this.data.items)
                            item.selection = {
                                name: item.articleVariant.name,
                            }
                    })
            })
            .catch(e => {
                console.log(e)
                this.loadFailed = true;
            })
    }
    attached() {
        this.bindingEngine.propertyObserver(this.data, "sourceId").subscribe((newValue, oldValue) => {
            for(var source of this.sources) {
                if(source._id == this.data.sourceId) {
                    this.data.source = source; 
                }
            }
        });
        
        this.bindingEngine.propertyObserver(this.data, "destinationId").subscribe((newValue, oldValue) => {
            for(var destination of this.destinations) {
                if(destination._id == this.data.destinationId) {
                    this.data.destination = destination; 
                }
            }
        });
    }

    detached() {
    }


}