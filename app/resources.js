(function () {
  
  angular.module("demo").factory("RecRes", recRes);

  recRes.$inject = ["$resource"];

  function recRes($resource) {
 
    return $resource("/api/records/:recordId", {recordId: '@record_id'},{
      update: {
        method: 'PUT'
      }
    });
  
  }

})();
