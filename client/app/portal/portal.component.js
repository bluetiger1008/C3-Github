import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './portal.routes';

export class PortalController {
  $http;
  socket;
  awesomeThings = [];
  newThing = '';

  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });
  }

  $onInit() {
    this.modelYears = ['2016', '2017'];

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
      video: ''
    }];
  }

  onAddRow() {
    this.carModels.push({
      id: this.carModels.length + 1,
      name: '',
      description: '',
      image: '',
      video: ''
    });
  }
}

export default angular.module('icaApp.portal', [uiRouter])
  .config(routing)
  .component('portal', {
    template: require('./portal.html'),
    controller: PortalController
  })
  .name;
