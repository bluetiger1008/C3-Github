'use strict';

export default class PortalController {
  
  /*@ngInject*/
  constructor($http, $scope, $state, $uibModal, Upload, Auth, modelFactory, modelTypeFactory, mainService) {
    this.$http = $http;
    this.Auth = Auth;
    this.$state = $state;
    this.modelFactory = modelFactory;
    this.modelTypeFactory = modelTypeFactory;
    this.Upload = Upload;
    this.$uibModal = $uibModal;
    this.mainService = mainService;
  }

  $onInit() {
    var self = this;
    this.currentUser = this.Auth.getCurrentUserSync();
    this.showVideoImg = true;

    this.modelYear = '2017';
    this.modelYears = ['2016', '2017'];
    this.modelTypes = [];
    this.modelType = '';  
    
    this.makeTypes = ['Acura','Alfa Romeo','Aston Martin','Audi','Bentley Motors','BMW','Buick','Cadillac','Chevrolet','Chrysler','Dodge','Ferrari','Fiat','Ford','Geely',
    'GMC','Honda','Hyundai','Infiniti','Isuzu','Jaguar','Jeep','Kia','Lamborghini','Lancia','Land Rover','Lexus','Lincoln','Lotus','Maserati',
    'Mazda','Mercedes-Benz','MINI','Mitsubishi','Nissan','Peugeot','Porsche','Renault','Rolls-Royce','Smart','Subaru','Suzuki',
    'Tesla Motors','Toyota','Volkswagen','Volvo'];
    this.makeType = 'Select Brand';

    this.strAddModel = 'Add a new model';
    this.modelTypes.push(this.strAddModel);

    this.modelTypeFactory.getModelTypes()
      .then(function success(res) {
        for (var i=0; i<res.data.length; i++) {
          self.modelTypes.push(res.data[i].name);
        }
      }, function error(res) {
        console.log('error');
        // body...
      });    

    this.carModels = [{
      id: 1,
      name: '',
      description: '',
      image: '',
      video: '',
      imgLoaded: '',
      showVideoImg: true
    }];

    this.enable_submit = false;
  }

  onAddRow() {
    this.carModels.push({
      id: this.carModels.length + 1,
      name: '',
      description: '',
      image: '',
      video: '',
      imgLoaded: '',
      showVideoImg: true
    });
  }

  onVideoLinkClick(id) {
    this.carModels[id-1].showVideoImg = false;
  }

  onAfterEditLink(id) {
    this.carModels[id-1].showVideoImg = true;
  }

  changeStatus() {
    this.enableSubmit();
    var self = this;
    if(this.modelType == 'Add a new model'){
      var modal = this.$uibModal.open({
        animation: true,
        template: require('../modals/addModelModal/addModelModal.html'),
        controller: function addNewModel() {
          this.closeModal = function(){
            modal.close();
          }
          this.onAddModel = function() {
            console.log('adding model');
            if(this.modelName){
              var modelName = this.modelName;

              self.modelTypeFactory.addModelType({name: this.modelName})
                .then(function success(res){
                  console.log('added modeltype');
                  self.modelTypes.push(modelName);
                  self.modelType = modelName;
                }, function error() {
                  console.log('adding modeltype error');
                });
            }
            else
              console.log('error');
            modal.close();
          }
        },
        controllerAs: 'vm',
        size: 'medium-st-custom'
      });
      this.mainService.set(modal);
    }
  }

  enableSubmit() {
    if(this.modelType != 'Load Model Names' && this.makeType != 'Select Brand' && this.verified == true)
      this.enable_submit = true;
    else
      this.enable_submit = false;
  }

  onSubmit() {
    var self = this;
    
    for(var i=0; i<this.carModels.length; i++) {
      var carModel = {
        owner: this.currentUser,
        modelYear: this.modelYear,
        makeType: this.makeType,
        modelType: this.modelType,
        data: this.carModels[i]
      };      

      this.modelFactory.addModel(carModel)
        .then(function success(res){
          console.log('success');
        }, function error(res) {
          console.log('error');
        })
    }

    this.$state.go('thanks');
  }

  onImageUpload(file, modelId) {
    var self = this;
    console.log(modelId);
    self.carModels[modelId-1].imgLoaded = true;

    if(file){
      this.Upload.upload({
            url: 'api/models/image',
            data: {img: file}
        }).then(resp => {
            console.log('Success ' , resp);
            self.carModels[modelId-1].image = resp.data;
            self.carModels[modelId-1].imgLoaded = false;
        }, resp =>{
            console.log('Error status: ' + resp.status);
        }, evt => {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.img.name);
        });
        // console.log(this.photo);

    }
  }
}