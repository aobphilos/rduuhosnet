(function () {
  'use strict';

  angular
    .module('rdu.ui')
    .filter('lineBreak', ['$sce', '_', lineBreak])

  function lineBreak($sce, _) {

    return FilterFn;

    function FilterFn(input) {
      return $sce.trustAsHtml(_.replace(input, /\r\n/g,  "<br />"));
    }
  }

} ());