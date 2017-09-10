'use strict';

describe('Transformers App Tests', function() {

  describe('Transformer Decorator Factory', function() {
    var $scope, TransformerDecoratorFactory;
    var testInput = "Soundwave, D, 8,9,2,6,7,5,6,10";

    beforeEach(module('TransformersApp'));

    beforeEach(inject(function(_TransformerDecoratorFactory_) {
      TransformerDecoratorFactory = _TransformerDecoratorFactory_;
    }));

    describe('Decorate Transformer', function() {
      
      it('should receive a string and return an object', function() {
        var result = TransformerDecoratorFactory.decorateTransformer(testInput);
        
        expect(result).toEqual(jasmine.any(Object));
      });
      
      it('should trim the string for the name', function(){
        var result = TransformerDecoratorFactory.decorateTransformer("testName    , D, 8,9,2,6,7,5,6,10");
        
        expect(result.name).toEqual("testName");
      });
      
      it('should trim the string for the team', function(){
        var result = TransformerDecoratorFactory.decorateTransformer(testInput);
        
        expect(result.team.length).toEqual(1);
      });
      
      it('should define overallRating as the sum of strenght, intelligence, speed, endurance and firepower', function(){
        var result = TransformerDecoratorFactory.decorateTransformer(testInput);
        var overallRatingResult = result.strength + result.intelligence + result.speed + result.endurance + result.firePower;
        
        expect(result.overallRating).toEqual(overallRatingResult);
      });
      
      it('should throw an exception if the string is not complete for a given transformer', function(){
        try{
          var result = TransformerDecoratorFactory.decorateTransformer("testName, D");
        }catch (e){
          expect(e).toBeDefined();
          expect(e.type).toEqual("InvalidTransformerException");
        }
      });
      
      it('should throw an exception if one of the number attributes is not a number', function(){
        try{
          var result = TransformerDecoratorFactory.decorateTransformer("testName, D, 8,9,2, AF,7,5,F,10");
        }catch (e){
          expect(e).toBeDefined();
          expect(e.type).toEqual("InvalidTransformerException");
        }
      });
    });
  });
});