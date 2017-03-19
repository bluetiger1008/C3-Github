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
    // handle formats
    this.today();
    
    this.inlineOptions = {
      customClass: this.getDayClass,
      minDate: new Date(),
      showWeeks: true
    };

    this.dateOptions = {
      dateDisabled: this.disabled,
      formatYear: 'yy',
      maxDate: new Date(2020, 5, 22),
      minDate: new Date(),
      startingDay: 1
    };

    this.toggleMin();

    this.format = 'dd-MMMM-yyyy';

    this.popup2 = {
      opened: false
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    this.events = [
      {
        date: tomorrow,
        status: 'full'
      },
      {
        date: afterTomorrow,
        status: 'partially'
      }
    ];

    this.makeTypes = ['Acura','Alfa Romeo','Aston Martin','Audi','Bentley Motors','BMW','Buick','Cadillac','Chevrolet','Chrysler','Dodge','Ferrari','Fiat','Ford','Geely',
    'GMC','Honda','Hyundai','Infiniti','Isuzu','Jaguar','Jeep','Kia','Lamborghini','Lancia','Land Rover','Lexus','Lincoln','Lotus','Maserati',
    'Mazda','Mercedes-Benz','MINI','Mitsubishi','Nissan','Peugeot','Porsche','Renault','Rolls-Royce','Smart','Subaru','Suzuki',
    'Tesla Motors','Toyota','Volkswagen','Volvo'];

    this.modelTypes = ['BRZ','Crosstrek','Forester','Impreza','Legacy','Outback','WRX'];
  }

  today() {
    this.dt = new Date();
  }
  
  clear() {
    this.dt = null;
  }
  // Disable weekend selection
  disabled(data) {
    var date = data.date,
      mode = data.mode;
    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
  }

  toggleMin() {
    this.inlineOptions.minDate = this.inlineOptions.minDate ? null : new Date();
    this.dateOptions.minDate = this.inlineOptions.minDate;
  }

  open2() {
    this.popup2.opened = true;
  }

  setDate(year, month, day) {
    this.dt = new Date(year, month, day);
  }

  getDayClass(data) {
    var date = data.date,
      mode = data.mode;
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  }
}

export default angular.module('icaApp.portal', [uiRouter])
  .config(routing)
  .component('portal', {
    template: require('./portal.html'),
    controller: PortalController
  })
  .name;
