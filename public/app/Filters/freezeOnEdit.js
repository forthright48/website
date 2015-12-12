(function(){
    angular.module("app").filter ( "freezeOnEdit", freezeOnEdit );

    function freezeOnEdit () {
        var prevData;
        return function(  input, editMode ) {
            
            if ( editMode === 0 ) {
                prevData = input;
                return input;
            }
            else {
                return prevData;
            }
        }
    }
})();
