(function () {

  angular.module("demo").factory("RecordSvc", recordSvc);

  recordSvc.$inject = ["RecRes"];

  function recordSvc(RecRes) {
    var self = this,
        RecordSvc = {};

    self.records = [];
    self.filteredData = [];


    RecordSvc.getRecords = function (refresh, cb) {
      var defer = {};
      if(self.records.length === 0 || refresh) {
       
        defer = RecRes.query();
        
        defer.$promise.then(function (data) {
          self.records = data
          cb(self.records);
        }).catch(function (error) {
          console.log(error);
        });

      } else {
        cb(self.records);
      }

    };

    RecordSvc.updateRecord = function (record, cb) {
      var defer = {},
          id = record._id.$oid;

      delete(record._id);

      defer = RecRes.update({recordId: id}, record);
      defer.$promise.then(function (data) {
        cb(data); 
      }).catch(function (error) {
        console.log(error);
      });
    };

    RecordSvc.deleteRecord = function (record, cb) {
      var defer = {},
          id = record._id.$oid;

      defer = RecRes.remove({recordId: id});
      defer.$promise.then(function (data) {
        cb(data); 
      }).catch(function (error) {
        console.log(error);
      });
    };

    RecordSvc.createRecord = function (newRecord, cb) {
      var defer = {};

      defer = RecRes.save(newRecord);
      defer.$promise.then(function (data) {
        cb(data); 
      }).catch(function (error) {
        console.log(error);
      });
    };

    return RecordSvc;
  }

})();
