import { Router } from 'aurelia-router';
import { Service } from './service';
import { inject, bindable, computedFrom, BindingEngine } from 'aurelia-framework';
const costCalculationRetailLoader = require('../../../loader/cost-calculation-retail-loader');
const defaultSizeBreakdownsColumns = [
  { header: "Store Code", value: "Code" },
  { header: "Store", value: "Name" },
  { header: "Total", value: "Total" }
]
const info = {
  page: 1,
  size: Number.MAX_SAFE_INTEGER
}

@inject(Router, Service, BindingEngine)
export class DataForm {
  @bindable title;
  @bindable readOnly = false;
  @bindable data = {};
  @bindable error = {};
  disabled = true;

  length2 = {
    label: {
      align: "left",
      length: 2
    }
  }
  length4 = {
    label: {
      align: "left",
      length: 4
    }
  }

  articleColors = [];
  stores = [];
  storesFetched = false;
  CCR_M_Fabric = [];
  CCR_M_Accessories = [];
  CCR_M_Rate = [];
  CCR_M_FabricInfo = {
    columns: [
      { header: "Fabric", value: "Category" },
      { header: "Name", value: "Material" },
      { header: "Description", value: "Description" },
      { header: "Quantity", value: "Quantity" },
      { header: "Remark", value: "Information" }
    ]
  }
  CCR_M_AccessoriesInfo = {
    columns: [
      { header: "Accessories  ", value: "Category" },
      { header: "Name", value: "Material" },
      { header: "Description", value: "Description" },
      { header: "Quantity", value: "Quantity" },
      { header: "Remark", value: "Information" }
    ]
  }
  CCR_M_RateInfo = {
    columns: [
      { header: "Ongkos", value: "Category" },
      { header: "Name", value: "Material" },
      { header: "Description", value: "Description" },
      { header: "Quantity", value: "Quantity" },
      { header: "Remark", value: "Information" }
    ]
  }

  RO_Retail_SizeBreakdownsInfo = {
    columns: defaultSizeBreakdownsColumns.slice(),
    options: { readOnly: this.readOnly }
  };

  @computedFrom("data.Id")
  get isEdit() {
    return (this.data.Id || '').toString() != '';
  }

  get costCalculationRetailLoader() {
    return costCalculationRetailLoader;
  }

  constructor(router, service, bindingEngine) {
    this.router = router;
    this.service = service;
    this.bindingEngine = bindingEngine;
  }

  @bindable imageUpload;
  imageUploadChanged(newValue) {
    let imageInput = document.getElementById('imageInput');
    let reader = new FileReader();
    reader.onload = event => {
      let base64Image = event.target.result;
      this.imagesSrc.push(base64Image);
      this.imagesSrcChanged(this.imagesSrc);
    }
    reader.readAsDataURL(imageInput.files[imageInput.files.length - 1]);
  }

  @bindable imagesSrc = [];
  imagesSrcChanged(newValue) {
    this.data.ImagesFile = [];
    newValue.forEach(imageSrc => {
      this.data.ImagesFile.push(imageSrc);
    })
  }

  removeImage(index) {
    this.imagesSrc.splice(index, 1);
    this.imagesSrcChanged(this.imagesSrc);
  }

  async bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;
    if (this.data.CostCalculationRetail) {
      this.costCalculationRetail = this.data.CostCalculationRetail;
      this.refreshSizeBreakdownsTable();
    }
    this.subscription = {
      RO_Retail_SizeBreakdown: {
        Total: {},
        SizeQuantity: {}
      }
    };

    this.articleColors = !this.readOnly ? await this.service.getArticleColors() : [];
    this.articleColors.forEach(color => {
      color.toString = function () {
        return color.name;
      }
    });

    if (this.data.Color) {
      this.data.Color.toString = function () {
        return this.name;
      }
      if (this.articleColors.length > 0) {
        let findColor = this.articleColors.find(color => {
          return color._id === this.data.Color._id;
        })
        this.data.Color = findColor ? findColor : this.articleColors[0];
      }
    }

    this.data.ImagesFile = this.data.ImagesFile ? this.data.ImagesFile : [];
    this.data.ImagesName = this.data.ImagesName ? this.data.ImagesName : [];
    this.imagesSrc = this.data.ImagesFile.slice();
  }

  @bindable costCalculationRetail;
  async costCalculationRetailChanged(newValue) {
    this.RO_Retail_SizeBreakdownsInfo.columns = defaultSizeBreakdownsColumns.slice();
    if (newValue && newValue.Id) {
      if (!this.isEdit) {
        this.clearForm();
        this.data.CostCalculationRetail = await this.service.getCostCalculationRetailById(newValue.Id);
      }

      if (this.data.CostCalculationRetail.CostCalculationRetail_Materials.length !== 0) {
        this.CCR_M_Fabric = this.data.CostCalculationRetail.CostCalculationRetail_Materials.filter(item => item.Category.Name.toUpperCase() === "FAB");
        this.CCR_M_Accessories = this.data.CostCalculationRetail.CostCalculationRetail_Materials.filter(item => item.Category.Name.toUpperCase() === "ACC");
        this.CCR_M_Rate = this.data.CostCalculationRetail.CostCalculationRetail_Materials.filter(item => item.Category.Name.toUpperCase() === "ONG");
      }

      if (this.data.CostCalculationRetail.SizeRange && this.data.CostCalculationRetail.SizeRange.RelatedSizes)
        this.refreshSizeBreakdownsTable();

      if (this.data.RO_Retail_SizeBreakdowns.length === 0) {
        if (!this.storesFetched && !this.readOnly) {
          this.stores = await this.service.fetchStores(info);
          this.storesFetched = true;
        }
        this.data.RO_Retail_SizeBreakdowns = this.getSizeBreakdownsData();
      }
      else {
        if (this.readOnly) {
          this.data.RO_Retail_SizeBreakdowns = this.data.RO_Retail_SizeBreakdowns.filter(value => value.Total > 0);
        }
      }

      this.addSubscription();
    }
    else {
      this.clearForm();
    }
  }

  clearForm() {
    this.data.RO_Retail_SizeBreakdowns = [];
    this.CCR_M_Fabric = [];
    this.CCR_M_Accessories = [];
    this.CCR_M_Rate = [];
    Object.keys(this.subscription.RO_Retail_SizeBreakdown.Total).forEach(index => {
      this.subscription.RO_Retail_SizeBreakdown.Total[index].dispose();
    })
    Object.keys(this.subscription.RO_Retail_SizeBreakdown.SizeQuantity).forEach(indexProp => {
      Object.keys(this.subscription.RO_Retail_SizeBreakdown.SizeQuantity[indexProp]).forEach(sizeProp => {
        this.subscription.RO_Retail_SizeBreakdown.SizeQuantity[indexProp][sizeProp].dispose();
      })
    })
  }

  refreshSizeBreakdownsTable() {
    var sizes = [];
    var sorter = require('apparel-sorter');
    this.sizeBreakdowns = this.data.RO_Retail_SizeBreakdowns.length === 0 ?
      this.data.CostCalculationRetail.SizeRange.RelatedSizes.map(rs => {
        return { header: rs.Size.Name, value: rs.Size.Name.split(' ').join('_') }
      }) :
      Object.keys(this.data.RO_Retail_SizeBreakdowns[0].SizeQuantity).map(sb => {
        return { header: sb.split('_').join(' '), value: sb }
      })

    this.sizeBreakdowns.forEach(size => {
      sizes.push(size.header);
    })

    let startingIndex = 2;
    sizes = sorter.sort(sizes);
    sizes = sizes.map(item => {
      var size = {};
      size.header = item;
      size.value = item;

      return size;
    })
    this.sizeBreakdowns = sizes;

    this.sizeBreakdowns.forEach(size => {
      this.RO_Retail_SizeBreakdownsInfo.columns.splice(startingIndex, 0, size);
      startingIndex++;
    });
  }

  getSizeBreakdownsData() {
    return this.stores.map(store => {
      let insertedStore = {
        Store: {
          _id: store._id,
          code: store.code,
          name: store.name
        },
        SizeQuantity: {},
        Total: 0
      }
      this.sizeBreakdowns.forEach(sizeProp => {
        insertedStore.SizeQuantity[sizeProp.value] = 0;
      })
      return insertedStore;
    })
  }

  addSubscription() {
    this.data.RO_Retail_SizeBreakdowns.forEach((value, index) => {
      this.subscription.RO_Retail_SizeBreakdown.Total[index] = this.bindingEngine.propertyObserver(value, 'Total').subscribe(this.totalModified);
      this.subscription.RO_Retail_SizeBreakdown.SizeQuantity[index] = {};
      Object.keys(value.SizeQuantity).forEach(prop => {
        this.subscription.RO_Retail_SizeBreakdown.SizeQuantity[index][prop] = this.bindingEngine.propertyObserver(value.SizeQuantity, prop).subscribe(this.sizeQuantityModified);
      })
    })
  }

  totalModified = () => {
    this.data.Total = 0;
    this.data.RO_Retail_SizeBreakdowns.forEach(value => {
      this.data.Total += value.Total;
    })
  }

  sizeQuantityModified = () => {
    this.data.SizeQuantityTotal = {};
    this.sizeBreakdowns.forEach(sizeProp => {
      this.data.SizeQuantityTotal[sizeProp.value] = 0;
    })
    this.data.RO_Retail_SizeBreakdowns.forEach(value => {
      this.sizeBreakdowns.forEach(sizeProp => {
        this.data.SizeQuantityTotal[sizeProp.value] += value.SizeQuantity[sizeProp.value];
      })
    })
  }

  get filterCostCalculationRetail() {
    return { "RO_RetailId": null }
  }

  @computedFrom('data.CostCalculationRetail')
  get hasCostCalculationRetail() {
    return this.data.CostCalculationRetail && this.data.CostCalculationRetail.Article && this.data.CostCalculationRetail.Style && this.data.CostCalculationRetail.Counter;
  }

  @computedFrom("CCR_M_Fabric")
  get hasCCR_M_Fabric() {
    return this.CCR_M_Fabric.length !== 0;
  }

  @computedFrom("CCR_M_Accessories")
  get hasCCR_M_Accessories() {
    return this.CCR_M_Accessories.length !== 0;
  }

  @computedFrom("CCR_M_Rate")
  get hasCCR_M_Rate() {
    return this.CCR_M_Rate.length !== 0;
  }

  @computedFrom("data.CostCalculationRetail.SizeRange.RelatedSizes.length")
  get hasSizeBreakdowns() {
    return this.data.CostCalculationRetail && this.data.CostCalculationRetail.SizeRange && this.data.CostCalculationRetail.SizeRange.RelatedSizes && this.data.CostCalculationRetail.SizeRange.RelatedSizes.length !== 0;
  }
}
