(function () {
  angular.module("demo").controller("MainCtrl", MainCtrl);

  
  MainCtrl.$inject = ["RecordSvc"];


  function MainCtrl(RecordSvc) {
    var self = this,
        selectedRecordIndex = 0;

    self.actualRecords = [];
    self.recordEdited = false;
    self.initRecord = false;
    self.newRecord = {};

    self.getRecords = function () {
      RecordSvc.getRecords(true, function (records) {
        self.actualRecords = records;
      });
    }

    self.showRecord = function (index) {
      self.selectedRecord = angular.copy(self.actualRecords[index]);
      selectedRecordIndex = index;
      self.initRecord = false;
    };

    self.updateRecord = function () {
      var record = angular.copy(self.selectedRecord);
      RecordSvc.updateRecord(record, function (data) {
        self.actualRecords[selectedRecordIndex] = self.selectedRecord;
        self.recordEdited = false;
      });
    };

    self.deleteRecord = function () {
      confirmation = confirm("Do you want to delet record with id: " + self.selectedRecord._id.$oid);
      if(confirmation) {
        RecordSvc.deleteRecord(self.selectedRecord, function () {
          delete(self.selectedRecord);
          self.actualRecords.splice(selectedRecordIndex, 1);
        });
      }
    };

    self.createRecord = function () {
        RecordSvc.createRecord(self.newRecord, function (data) {
          self.selectedRecord = data;
          self.actualRecords.push(data);
          self.initRecord = false;
          self.newRecord = {};
        });
    };
    

    self.getRecords();
  }

})();
