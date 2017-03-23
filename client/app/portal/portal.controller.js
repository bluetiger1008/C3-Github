'use strict';

export default class PortalController {
  
  /*@ngInject*/
  constructor($http, $scope, Upload, Auth, modelFactory) {
    this.$http = $http;
    this.Auth = Auth;
    this.modelFactory = modelFactory;
    this.Upload = Upload;
  }

  $onInit() {
    this.modelYears = ['2016', '2017'];
    this.showVideoImg = true;
    this.makeTypes = ['Acura','Alfa Romeo','Aston Martin','Audi','Bentley Motors','BMW','Buick','Cadillac','Chevrolet','Chrysler','Dodge','Ferrari','Fiat','Ford','Geely',
    'GMC','Honda','Hyundai','Infiniti','Isuzu','Jaguar','Jeep','Kia','Lamborghini','Lancia','Land Rover','Lexus','Lincoln','Lotus','Maserati',
    'Mazda','Mercedes-Benz','MINI','Mitsubishi','Nissan','Peugeot','Porsche','Renault','Rolls-Royce','Smart','Subaru','Suzuki',
    'Tesla Motors','Toyota','Volkswagen','Volvo'];

    this.modelTypes = ['BRZ','Crosstrek','Forester','Impreza','Legacy','Outback','WRX'];

    this.carModels = [{
      id: 1,
      name: '',
      description: '',
      image: '',
      video: '',
      showVideoImg: true
    }];
  }

  onAddRow() {
    this.carModels.push({
      id: this.carModels.length + 1,
      name: '',
      description: '',
      image: '',
      video: '',
      showVideoImg: true
    });
  }

  onVideoLinkClick(id) {
    this.carModels[id-1].showVideoImg = false;
  }

  onAfterEditLink(id) {
    this.carModels[id-1].showVideoImg = true;
  }

  onSubmit() {
    var carModels = {
      modelYear: this.modelYear,
      makeType: this.makeType,
      modelType: this.modelType,
      data: this.carModels
    };

    this.modelFactory.addModel(carModels)
      .then(function success(res){
        console.log('success');
      }, function error(res){
        console.log('error');
      });
  }

  onImageUpload(file, modelId) {
    if(file){
      this.Upload.upload({
            url: 'api/models/image',
            data: {img: file}
        }).then(resp => {
            console.log('Success ' , resp);
            this.carModels[id-1].image = resp.data;
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