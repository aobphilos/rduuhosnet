(function () {
  'use strict';

  angular
    .module('rdu.ui')
    .filter('defaultDash', ['_', defaultDash])

  function defaultDash(_) {

    return FilterFn;

    function FilterFn(input) {
      return _.defaultTo(input, " - ");
    }
  }

} ());