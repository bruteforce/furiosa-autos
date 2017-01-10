/**
 * Created by deepak on 06/01/17.
 */
var sort_constants = require('../constants/sort_constants');
module.exports = {
     flattenArray: function(arrays){
         if(arrays != null && arrays.length>1)
          return Array.prototype.concat.apply([], arrays);
         return arrays;
    },

    sortArray: function(array, sortBy){
        switch (sortBy){
            case sort_constants.alphabeticalSort.Ascending.sortValue:
                    return array.sort();
                break;
            case sort_constants.alphabeticalSort.Descending.sortValue:
                    return array.sort().reverse();
                break;
            default:
                return array;
        }
    },

    filterArrayOfObjectsOnKey: function(array, sortKey, sortValue){
        if(sortValue !== undefined && sortValue ==='all')
            return array;

        return array.filter(function (el) {
            return el[sortKey] == sortValue;
        });
    },

    filterArrayOfObjects: function(array, keyword){
        return array.filter(function (el) {
            for(var key in el)
            {
                if(el[key].toLowerCase().indexOf(keyword.toLowerCase())!== -1)
                return true;
            }
            return false;
        });
    },
}