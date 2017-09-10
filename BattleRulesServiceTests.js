'use strict';

describe('Transformers App Tests', function() {

  describe('Battle Rules Service', function() {
    var $scope, BattleRulesService;

    beforeEach(module('TransformersApp'));

    beforeEach(inject(function(_BattleRulesService_) {
      BattleRulesService = _BattleRulesService_;
    }));
    
    describe('Resolve Face Off ', function() {
      
      var autobot, decepticon, winner;
      
      it('should throw OptimusPredakingBattleException if any optimus battles any predaking', function() {
   
        autobot = { name : 'Predaking', team : 'D', strength : 8, intelligence : 9, speed : 2, endurance : 6, rank : 7, courage : 5, firePower : 6, skill : 10, overallRating : 31 }; 
        decepticon = { name : 'Predaking', team : 'A', strength : 6, intelligence : 6, speed : 7, endurance : 9, rank : 5, courage : 2, firePower : 9, skill : 7, overallRating : 37 };     
        
        var excep;
        try{
          winner = BattleRulesService.resolveFaceOff(autobot, decepticon);
        } catch (err){
          excep = err;
        }
        expect(excep.type).toEqual("OptimusPredakingBattleException");
      });
      
      it('should return decepticon object as winner for overallRating', function() {
   
        decepticon = { name : 'Soundwave', team : 'D', strength : 8, intelligence : 9, speed : 2, endurance : 6, rank : 7, courage : 5, firePower : 6, skill : 10, overallRating : 31 }; 
        autobot = { name : 'Bluestreak', team : 'A', strength : 6, intelligence : 6, speed : 7, endurance : 9, rank : 5, courage : 2, firePower : 9, skill : 7, overallRating : 37 };     

        winner = BattleRulesService.resolveFaceOff(autobot, decepticon);
        
        expect(winner).toEqual(decepticon);
      });
      
      it('should return autobot object as winner for overallRating', function() {
   
        autobot = { name : 'Soundwave', team : 'A', strength : 8, intelligence : 9, speed : 2, endurance : 6, rank : 7, courage : 5, firePower : 6, skill : 10, overallRating : 31 }; 
        decepticon = { name : 'Bluestreak', team : 'D', strength : 6, intelligence : 6, speed : 7, endurance : 9, rank : 5, courage : 2, firePower : 9, skill : 7, overallRating : 37 };     

        winner = BattleRulesService.resolveFaceOff(autobot, decepticon);
        
        expect(winner).toEqual(autobot);
      });
      
      it('should return autobot leader object as winner', function() {
   
        autobot = { name : 'Predaking', team : 'A', strength : 8, intelligence : 9, speed : 2, endurance : 6, rank : 7, courage : 5, firePower : 6, skill : 10, overallRating : 31 }; 
        decepticon = { name : 'Bluestreak', team : 'D', strength : 6, intelligence : 6, speed : 7, endurance : 9, rank : 5, courage : 2, firePower : 9, skill : 7, overallRating : 37 };     

        winner = BattleRulesService.resolveFaceOff(autobot, decepticon);
        
        expect(winner).toEqual(autobot);
      });
      
       it('should return decepticon leader object as winner', function() {
   
        autobot = { name : 'Soundwave', team : 'A', strength : 8, intelligence : 9, speed : 2, endurance : 6, rank : 7, courage : 5, firePower : 6, skill : 10, overallRating : 31 }; 
        decepticon = { name : 'Predaking', team : 'D', strength : 6, intelligence : 6, speed : 7, endurance : 9, rank : 5, courage : 2, firePower : 9, skill : 7, overallRating : 37 };     

        winner = BattleRulesService.resolveFaceOff(autobot, decepticon);
        
        expect(winner).toEqual(decepticon);
      });
      
      it('should return decepticon object as winner if autobotRunsAway ', function() {
   
        decepticon = { name : 'Soundwave', team : 'D', strength : 8, intelligence : 9, speed : 2, endurance : 6, rank : 7, courage : 6, firePower : 6, skill : 10, overallRating : 31 }; 
        autobot = { name : 'Bluestreak', team : 'A', strength : 1, intelligence : 6, speed : 7, endurance : 9, rank : 5, courage : 1, firePower : 9, skill : 7, overallRating : 37 };     

        winner = BattleRulesService.resolveFaceOff(autobot, decepticon);
        
        expect(winner).toEqual(decepticon);
      });
      
      it('should return autobot object as winner if decepticonRunsAway ', function() {
   
        decepticon = { name : 'Soundwave', team : 'D', strength : 1, intelligence : 9, speed : 2, endurance : 6, rank : 7, courage : 1, firePower : 6, skill : 10, overallRating : 31 }; 
        autobot = { name : 'Bluestreak', team : 'A', strength : 8, intelligence : 6, speed : 7, endurance : 9, rank : 5, courage : 6, firePower : 9, skill : 7, overallRating : 37 };     

        winner = BattleRulesService.resolveFaceOff(autobot, decepticon);
        
        expect(winner).toEqual(autobot);
      });
      
      it('should return decepticon object as winner if skill is greater than 3', function() {
   
        decepticon = { name : 'Soundwave', team : 'D', strength : 8, intelligence : 9, speed : 2, endurance : 6, rank : 7, courage : 6, firePower : 6, skill : 10, overallRating : 31 }; 
        autobot = { name : 'Bluestreak', team : 'A', strength : 1, intelligence : 6, speed : 7, endurance : 9, rank : 5, courage : 1, firePower : 9, skill : 4, overallRating : 37 };     

        winner = BattleRulesService.resolveFaceOff(autobot, decepticon);
        
        expect(winner).toEqual(decepticon);
      });
      
      it('should return autobot object as winner if skill is greater than 3', function() {
   
        decepticon = { name : 'Soundwave', team : 'D', strength : 5, intelligence : 9, speed : 2, endurance : 6, rank : 7, courage : 6, firePower : 6, skill : 6, overallRating : 31 }; 
        autobot = { name : 'Bluestreak', team : 'A', strength : 5, intelligence : 6, speed : 7, endurance : 9, rank : 5, courage : 6, firePower : 9, skill : 10, overallRating : 37 };     

        winner = BattleRulesService.resolveFaceOff(autobot, decepticon);
        
        expect(winner).toEqual(autobot);
      });
      
      it('should throw BattleTiedException if the battle ends in a tie with equal overallRating', function() {
   
        decepticon = { name : 'Soundwave', team : 'D', strength : 8, intelligence : 9, speed : 2, endurance : 6, rank : 7, courage : 5, firePower : 6, skill : 10, overallRating : 31 }; 
        autobot = { name : 'Soundwave', team : 'A', strength : 8, intelligence : 9, speed : 2, endurance : 6, rank : 7, courage : 5, firePower : 6, skill : 10, overallRating : 31 };     
        
        var excep;
        try{
          winner = BattleRulesService.resolveFaceOff(autobot, decepticon);
        } catch (err){
          excep = err;
        }
        expect(excep.type).toEqual("BattleTiedException");
      });
      

    });
    
  });
});