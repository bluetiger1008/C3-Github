'use strict';

export default class MainController {
  
  /*@ngInject*/
  constructor(modelFactory, modelTypeFactory, $state, Auth) {
    // Use the User $resource to fetch all users
    this.$state = $state;
  	this.modelFactory = modelFactory;
    this.modelTypeFactory = modelTypeFactory;
    this.Auth = Auth;
    
  }

  $onInit() {
    var self = this;

    this.currentUser = this.Auth.getCurrentUserSync();
    console.log(this.currentUser);
    
  	this.modelYears = ['2016', '2017'];
    this.modelYear = '2017';
    this.modelTypes = [];
    this.modelType = ''; 

    this.showVideoImg = true;
    this.makeTypes = ['All', 'Acura','Alfa Romeo','Aston Martin','Audi','Bentley Motors','BMW','Buick','Cadillac','Chevrolet','Chrysler','Dodge','Ferrari','Fiat','Ford','Geely',
    'GMC','Honda','Hyundai','Infiniti','Isuzu','Jaguar','Jeep','Kia','Lamborghini','Lancia','Land Rover','Lexus','Lincoln','Lotus','Maserati',
    'Mazda','Mercedes-Benz','MINI','Mitsubishi','Nissan','Peugeot','Porsche','Renault','Rolls-Royce','Smart','Subaru','Suzuki',
    'Tesla Motors','Toyota','Volkswagen','Volvo'];
    this.makeType = 'All';

    this.strAllModel = 'All';
    this.modelTypes.push(this.strAllModel);

    this.modelTypeFactory.getModelTypes()
      .then(function success(res) {
        for (var i=0; i<res.data.length; i++) {
          self.modelTypes.push(res.data[i].name);
        }
      }, function error(res) {
        console.log('error');
        // body...
      });    
    this.modelType = 'All';

  	this.modelFactory.filterModels(this.modelYear, this.makeType, this.modelType)
      .then(function success(res){
        console.log('success', res);
        self.carModels = res.data;
      }, function error() {
        console.log('error');
      });
  }

  onSearchChange() {
    var self = this;

    this.modelFactory.filterModels(this.modelYear, this.makeType, this.modelType)
      .then(function success(res){
        console.log('success', res);
        self.carModels = res.data;
      }, function error() {
        console.log('error');
      });
  }
}